import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Alert,
  ScrollView,
  PixelRatio,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Scaling functions for responsive sizes
const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const fontScale = PixelRatio.getFontScale();

const FloatingBubble = ({ style, delay }) => {
  const anim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 4000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.bubble,
        style,
        {
          opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.8] }),
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -verticalScale(60)] }) },
            { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={['#9333EA', '#DB2777']}
        style={styles.bubbleGradient}
      />
    </Animated.View>
  );
};

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 25,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== 'granted') {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert(
            'Permission Required',
            'Camera access is required to take photos. Please enable it in Settings.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error launching camera:', error);
      Alert.alert('Error', 'Failed to open camera. Please try again.');
    }
  };

  const retakePhoto = async () => {
    try {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== 'granted') {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert(
            'Permission Required',
            'Camera access is required to retake photos. Please enable it in Settings.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error retaking photo:', error);
      Alert.alert('Error', 'Failed to open camera for retake. Please try again.');
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Gallery access is required to select photos. Please enable it in Settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0F172A', '#1E1B4B', '#4C1D95']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.backgroundElements}>
          <FloatingBubble style={styles.bubble1} delay={0} />
          <FloatingBubble style={styles.bubble2} delay={800} />
          <FloatingBubble style={styles.bubble3} delay={1600} />
        </View>

        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.title,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            SnapSeek
          </Animated.Text>
          <Text style={styles.subtitle}>Discover • Analyze • Learn</Text>
        </Animated.View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {selectedImage ? (
            <Animated.View
              style={[
                styles.imageContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <BlurView intensity={90} tint="dark" style={styles.glassCard}>
                <LinearGradient
                  colors={['rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.3)']}
                  style={styles.selectedImageContainer}
                >
                  <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <FontAwesome5 name="image" size={moderateScale(85)} color="#E879F9" />
                  </Animated.View>
                  <Text style={styles.selectedImageText}>Ready to Analyze</Text>
                </LinearGradient>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton]}
                    onPress={() => setSelectedImage(null)}
                  >
                    <LinearGradient
                      colors={['#8B5CF6', '#7C3AED']}
                      style={[styles.buttonGradient, styles.buttonShadow]}
                    >
                      <View style={styles.buttonContent}>
                        <FontAwesome5 name="redo-alt" size={moderateScale(20)} color="#fff" />
                        <Text style={styles.actionButtonText}>New Image</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton]}
                    onPress={retakePhoto}
                  >
                    <LinearGradient
                      colors={['#A855F7', '#9333EA']}
                      style={[styles.buttonGradient, styles.buttonShadow]}
                    >
                      <View style={styles.buttonContent}>
                        <FontAwesome5 name="camera" size={moderateScale(20)} color="#fff" />
                        <Text style={styles.actionButtonText}>Retake Image</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </BlurView>
            </Animated.View>
          ) : (
            <Animated.View
              style={[
                styles.optionsContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={[styles.optionCard, styles.cardShadow]}
                onPress={takePhoto}
              >
                <LinearGradient
                  colors={['#8B5CF6', '#7C3AED']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.optionGradient}
                >
                  <Animated.View style={[styles.iconCircle, { transform: [{ scale: pulseAnim }] }]}>
                    <FontAwesome5 name="camera" size={moderateScale(20)} color="#fff" />
                  </Animated.View>
                  <Text style={styles.optionTitle}>Take a Photo</Text>
                  <Text style={styles.optionSubtitle}>Instant capture & analysis</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <LinearGradient
                  colors={['transparent', '#E879F9', 'transparent']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.dividerGradient}
                />
                <BlurView intensity={60} style={styles.dividerCircle}>
                  <Text style={styles.dividerText}>OR</Text>
                </BlurView>
                <LinearGradient
                  colors={['transparent', '#E879F9', 'transparent']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.dividerGradient}
                />
              </View>

              <TouchableOpacity
                style={[styles.optionCard, styles.cardShadow]}
                onPress={pickImage}
              >
                <LinearGradient
                  colors={['#EC4899', '#DB2777']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.optionGradient}
                >
                  <Animated.View style={[styles.iconCircle, { transform: [{ scale: pulseAnim }] }]}>
                    <FontAwesome5 name="images" size={moderateScale(20)} color="#fff" />
                  </Animated.View>
                  <Text style={styles.optionTitle}>Choose from Gallery</Text>
                  <Text style={styles.optionSubtitle}>Select existing photos</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <LinearGradient
                  colors={['transparent', '#E879F9', 'transparent']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.dividerGradient}
                />
                <BlurView intensity={60} style={styles.dividerCircle}>
                  <Text style={styles.dividerText}>OR</Text>
                </BlurView>
                <LinearGradient
                  colors={['transparent', '#E879F9', 'transparent']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.dividerGradient}
                />
              </View>

              <TouchableOpacity
                style={[styles.optionCard, styles.cardShadow]}
                onPress={pickImage}
              >
                <LinearGradient
                  colors={['#A855F7', '#9333EA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.optionGradient}
                >
                  <Animated.View style={[styles.iconCircle, { transform: [{ scale: pulseAnim }] }]}>
                    <FontAwesome5 name="upload" size={moderateScale(20)} color="#fff" />
                  </Animated.View>
                  <Text style={styles.optionTitle}>Upload</Text>
                  <Text style={styles.optionSubtitle}>Add your image</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  backgroundElements: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    overflow: 'hidden',
  },
  bubbleGradient: {
    flex: 1,
  },
  bubble1: {
    top: '10%',
    left: '15%',
  },
  bubble2: {
    top: '60%',
    right: '20%',
  },
  bubble3: {
    bottom: '15%',
    left: '70%',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: verticalScale(48),
    marginBottom: verticalScale(56),
  },
  title: {
    fontSize: moderateScale(52),
    fontWeight: '900',
    color: '#fff',
    letterSpacing: scale(2),
    textShadowColor: 'rgba(139, 92, 246, 0.8)',
    textShadowOffset: { width: 0, height: scale(4) },
    textShadowRadius: scale(15),
  },
  subtitle: {
    fontSize: moderateScale(20),
    color: 'rgba(255,255,255,0.9)',
    marginTop: verticalScale(12),
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(20),
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  optionCard: {
    width: '90%',
    maxWidth: scale(400),
    height: verticalScale(150),
    borderRadius: moderateScale(28),
    overflow: 'hidden',
    marginVertical: verticalScale(24),
  },
  optionGradient: {
    flex: 1,
    padding: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: moderateScale(50), // Reduced from 65
    height: moderateScale(50), // Reduced from 65
    borderRadius: moderateScale(25), // Adjusted to match new size
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12), // Reduced margin
    borderWidth: scale(2),
    borderColor: 'rgba(255,255,255,0.3)',
  },
  optionTitle: {
    fontSize: moderateScale(18), // Reduced from 24
    fontWeight: '800',
    color: '#fff',
    marginBottom: verticalScale(4), // Reduced margin
  },
  optionSubtitle: {
    fontSize: moderateScale(12), // Reduced from 16
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginVertical: verticalScale(20),
  },
  dividerGradient: {
    flex: 1,
    height: scale(2),
  },
  dividerCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(15),
  },
  dividerText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: moderateScale(25),
    padding: scale(24),
    alignItems: 'center',
    width: '90%',
    maxWidth: scale(400),
    borderWidth: scale(1),
    borderColor: 'rgba(219, 39, 119, 0.2)',
  },
  selectedImageContainer: {
    width: '100%',
    height: scale(260),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(24),
  },
  selectedImageText: {
    color: '#fff',
    fontSize: moderateScale(22),
    marginTop: verticalScale(20),
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  actionButton: {
    flex: 1,
    minWidth: '48%',
    borderRadius: scale(15),
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
  },
  actionButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '600',
    textAlign: 'center',
  },
  cardShadow: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: scale(8) },
    shadowOpacity: 0.4,
    shadowRadius: scale(12),
    elevation: moderateScale(10),
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.3,
    shadowRadius: scale(8),
    elevation: moderateScale(5),
  },
});

export default HomeScreen;