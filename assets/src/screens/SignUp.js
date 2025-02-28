import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);
  const slideAnim = new Animated.Value(-100);
  const inputsSlideAnim = new Animated.Value(width);

  useEffect(() => {
    Animated.parallel([
      // Fade in and scale up the header
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      // Slide in the header from top
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      // Slide in inputs from right
      Animated.timing(inputsSlideAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignUp = () => {
    console.log('Sign up pressed');
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4A00E0', '#8E2DE2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Animated.View 
              style={[
                styles.headerContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim }
                  ]
                }
              ]}
            >
              <View style={styles.iconContainer}>
                <MaterialIcons name="person-add" size={32} color="#fff" />
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Please fill in the form below</Text>
            </Animated.View>

            <Animated.View 
              style={[
                styles.formContainer,
                {
                  transform: [{ translateX: inputsSlideAnim }]
                }
              ]}
            >
              <View style={styles.inputContainer}>
                <MaterialIcons name="person-outline" size={22} color="#fff" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="rgba(255,255,255,0.5)"
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons name="mail-outline" size={22} color="#fff" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons name="lock-outline" size={22} color="#fff" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="rgba(255,255,255,0.5)"
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons name="lock-outline" size={22} color="#fff" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  placeholderTextColor="rgba(255,255,255,0.5)"
                />
              </View>

              <TouchableOpacity 
                style={styles.button}
                onPress={handleSignUp}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#fff', '#f8f8f8']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.divider} />
              </View>

              <Animated.View 
                style={[
                  styles.socialButtonsContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                  }
                ]}
              >
                <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                  <FontAwesome5 name="google" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                  <FontAwesome5 name="facebook-f" size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
                  <FontAwesome5 name="apple" size={18} color="#fff" />
                </TouchableOpacity>
              </Animated.View>

              <Animated.View 
                style={[
                  styles.loginContainer,
                  {
                    opacity: fadeAnim
                  }
                ]}
              >
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: height * 0.03,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  formContainer: {
    paddingHorizontal: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#fff',
    height: '100%',
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4A00E0',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 12,
    fontSize: 13,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  loginLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default SignUp; 