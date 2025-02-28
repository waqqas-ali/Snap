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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

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
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -60] }) },
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
      console.log('Camera permission status:', status);

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

      console.log('Attempting to launch camera...');
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      console.log('Camera result:', result);

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        console.log('Camera action was canceled');
      }
    } catch (error) {
      console.error('Error launching camera:', error);
      Alert.alert('Error', 'Failed to open camera. Please try again.');
    }
  };

  const retakePhoto = async () => {
    try {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      console.log('Camera permission status for retake:', status);

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

      console.log('Attempting to launch camera for retake...');
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      console.log('Retake camera result:', result);

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        console.log('Retake camera action was canceled');
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
                textShadowColor: 'rgba(139, 92, 246, 0.8)',
                textShadowOffset: { width: 0, height: 4 },
                textShadowRadius: 15,
              },
            ]}
          >
            SnapSeek
          </Animated.Text>
          <Text style={styles.subtitle}>Discover • Analyze • Learn</Text>
        </Animated.View>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                    <FontAwesome5 name="image" size={85} color="#E879F9" />
                  </Animated.View>
                  <Text style={styles.selectedImageText}>Ready to Analyze</Text>
                </LinearGradient>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton, { width: '48%' }]}
                    onPress={() => setSelectedImage(null)}
                  >
                    <LinearGradient
                      colors={['#8B5CF6', '#7C3AED']}
                      style={[styles.buttonGradient, styles.buttonShadow]}
                    >
                      <FontAwesome5 name="redo-alt" size={22} color="#fff" />
                      <Text style={styles.actionButtonText}>New Image</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, { width: '48%' }]}
                    onPress={retakePhoto}
                  >
                    <LinearGradient
                      colors={['#A855F7', '#9333EA']}
                      style={[styles.buttonGradient, styles.buttonShadow]}
                    >
                      <FontAwesome5 name="camera" size={22} color="#fff" />
                      <Text style={styles.actionButtonText}>Retake Image</Text>
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
                    <FontAwesome5 name="camera" size={30} color="#fff" />
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
                    <FontAwesome5 name="images" size={30} color="#fff" />
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
                    <FontAwesome5 name="upload" size={30} color="#fff" />
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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  gradient: { flex: 1, padding: 20 },
  backgroundElements: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  bubble: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  bubbleGradient: { flex: 1 },
  bubble1: { top: '10%', left: '15%' },
  bubble2: { top: '60%', right: '20%' },
  bubble3: { bottom: '15%', left: '70%' },
  headerContainer: {
    alignItems: 'center',
    marginTop: height * 0.06,
    marginBottom: height * 0.07,
  },
  title: {
    fontSize: Math.min(52, width * 0.13),
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(219, 39, 119, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 12,
  },
  subtitle: {
    fontSize: Math.min(20, width * 0.05),
    color: 'rgba(255,255,255,0.9)',
    marginTop: height * 0.015,
    fontWeight: '500',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  optionCard: {
    width: Math.min(width * 0.9, 400),
    height: Math.min(height * 0.2, 150),
    borderRadius: Math.min(28, width * 0.07),
    overflow: 'hidden',
    marginVertical: height * 0.030,
  },
  optionGradient: { flex: 1, padding: 25, alignItems: 'center', justifyContent: 'center' },
  iconCircle: {
    width: Math.min(65, width * 0.16),
    height: Math.min(65, width * 0.16),
    borderRadius: Math.min(32.5, width * 0.08),
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.02,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  optionTitle: {
    fontSize: Math.min(24, width * 0.06),
    fontWeight: '800',
    color: '#fff',
    marginBottom: height * 0.008,
  },
  optionSubtitle: {
    fontSize: Math.min(16, width * 0.04),
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', width: '85%', marginVertical: 25 },
  dividerGradient: { flex: 1, height: 2 },
  dividerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  dividerText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: Math.min(25, width * 0.06),
    padding: width * 0.06,
    alignItems: 'center',
    width: Math.min(width * 0.9, 400),
    borderWidth: 1,
    borderColor: 'rgba(219, 39, 119, 0.2)',
  },
  selectedImageContainer: {
    width: '100%',
    height: width * 0.65,
    borderRadius: Math.min(20, width * 0.05),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03,
  },
  selectedImageText: {
    color: '#fff',
    fontSize: Math.min(22, width * 0.055),
    marginTop: height * 0.025,
    fontWeight: '600',
  },
  buttonContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: { width: '48%', borderRadius: 15, overflow: 'hidden' },
  buttonGradient: { padding: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  cardShadow: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default HomeScreen;