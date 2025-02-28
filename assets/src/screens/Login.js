import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  ScrollView,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const FloatingParticle = ({ style, delay }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 3000,
          delay,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.particle,
        style,
        {
          opacity: anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.2, 0.6, 0.2],
          }),
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -70],
              }),
            },
            {
              scale: anim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.4, 1],
              }),
            },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={['#6366F1', '#EC4899']}
        style={styles.particleGradient}
      />
    </Animated.View>
  );
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(100)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(cardAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const handleLogin = () => {
    console.log('Login attempted with:', email, password);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0F172A', '#1E1B4B', '#4C1D95']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <FloatingParticle style={styles.particle1} delay={0} />
          <FloatingParticle style={styles.particle2} delay={500} />
          <FloatingParticle style={styles.particle3} delay={1000} />
          
          <SafeAreaView style={styles.safeArea}>
            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: cardAnim }],
                },
              ]}
            >
              <Animated.Text style={[styles.title, { transform: [{ scale: pulseAnim }] }]}>
                Welcome Back
              </Animated.Text>
              <Text style={styles.subtitle}>Access your cosmic journey</Text>

              <BlurView intensity={100} tint="dark" style={styles.formCard}>
                <View style={styles.inputGroup}>
                  <Animated.View
                    style={[
                      styles.inputContainer,
                      isFocused.email && styles.inputContainerFocused,
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={22}
                      color={isFocused.email ? '#6366F1' : '#A78BFA'}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      value={email}
                      onChangeText={setEmail}
                      onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                      onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </Animated.View>

                  <Animated.View
                    style={[
                      styles.inputContainer,
                      isFocused.password && styles.inputContainerFocused,
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={22}
                      color={isFocused.password ? '#6366F1' : '#A78BFA'}
                    />
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      placeholder="Password"
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                      onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                      secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      <Ionicons
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        size={22}
                        color="#A78BFA"
                      />
                    </TouchableOpacity>
                  </Animated.View>

                  <TouchableOpacity style={styles.forgotButton}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                  >
                    <LinearGradient
                      colors={['#6366F1', '#EC4899']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.buttonText}>Enter Universe</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </BlurView>

              <View style={styles.socialContainer}>
                <Text style={styles.socialText}>Or connect via</Text>
                <View style={styles.socialButtons}>
                  {[
                    { name: 'Google', icon: 'logo-google', color: '#6366F1' },
                    { name: 'Apple', icon: 'logo-apple', color: '#FFFFFF' },
                    { name: 'Facebook', icon: 'logo-facebook', color: 'blue' },
                  ].map((platform) => (
                    <TouchableOpacity
                      key={platform.name}
                      style={styles.socialButton}
                    >
                      <LinearGradient
                        colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
                        style={styles.socialGradient}
                      >
                        <Ionicons
                          name={platform.icon}
                          size={26}
                          color={platform.color}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('SignIn')}
              >
                <Text style={styles.signupText}>
                  New here? <Text style={styles.signupLink}>Create Account</Text>
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height,
  },
  particle: {
    position: 'absolute',
    width: Math.min(80, width * 0.2),
    height: Math.min(80, width * 0.2),
    borderRadius: Math.min(40, width * 0.1),
    overflow: 'hidden',
    opacity: 0.8,
  },
  particleGradient: { flex: 1 },
  particle1: { top: '10%', left: '15%' },
  particle2: { top: '60%', right: '10%' },
  particle3: { bottom: '15%', left: '60%' },
  safeArea: { flex: 1, justifyContent: 'center', padding: 20 },
  formContainer: { alignItems: 'center' },
  title: {
    fontSize: Math.min(42, width * 0.1),
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: height * 0.015,
    textAlign: 'center',
    textShadowColor: 'rgba(99, 102, 241, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: Math.min(18, width * 0.045),
    color: 'rgba(255,255,255,0.85)',
    marginBottom: height * 0.04,
    fontWeight: '500',
    textAlign: 'center',
  },
  formCard: {
    width: Math.min(width * 0.9, 400),
    borderRadius: Math.min(30, width * 0.07),
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  inputGroup: {
    padding: Math.min(30, width * 0.07),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Math.min(16, width * 0.04),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
    minHeight: Math.min(60, height * 0.08),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputContainerFocused: {
    borderColor: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  input: {
    flex: 1,
    paddingVertical: Math.min(16, height * 0.02),
    paddingHorizontal: width * 0.03,
    fontSize: Math.min(16, width * 0.04),
    color: '#FFFFFF',
  },
  passwordInput: { paddingRight: 40 },
  forgotButton: { alignSelf: 'flex-end', marginBottom: 25 },
  forgotText: {
    color: '#A78BFA',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: Math.min(16, width * 0.04),
    overflow: 'hidden',
    elevation: 8,
    width: '100%',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: Math.min(18, height * 0.025),
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: Math.min(18, width * 0.045),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  socialContainer: {
    marginTop: height * 0.03,
    alignItems: 'center',
    width: '100%',
  },
  socialText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 16,
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: width * 0.06,
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: width * 0.02,
  },
  socialButton: {
    borderRadius: Math.min(20, width * 0.05),
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  socialGradient: {
    width: Math.min(60, width * 0.15),
    height: Math.min(60, width * 0.15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButton: {
    marginTop: height * 0.03,
    paddingVertical: 10,
  },
  signupText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: Math.min(16, width * 0.04),
    textAlign: 'center',
  },
  signupLink: {
    color: '#6366F1',
    fontWeight: '700',
  },
});

export default Login;






// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Animated,
//   KeyboardAvoidingView,
//   Platform 
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import React, { useState, useEffect } from 'react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [buttonScale] = useState(new Animated.Value(1));
//   const [formTranslate] = useState(new Animated.Value(50));

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(formTranslate, {
//         toValue: 0,
//         tension: 65,
//         friction: 7,
//         useNativeDriver: true,
//       })
//     ]).start();
//   }, []);

//   const handleButtonPressIn = () => {
//     Animated.spring(buttonScale, {
//       toValue: 0.95,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handleButtonPressOut = () => {
//     Animated.spring(buttonScale, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handleLogin = () => {
//     console.log('Login attempted with:', { email, password });
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <LinearGradient
//         colors={['#8a2387', '#e94057', '#f27121']}
//         style={styles.gradientBackground}
//       >

//         {/* Animated Header */}
//         <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
//           <Text style={styles.title}>Hello Again!</Text>
//           <Text style={styles.subtitle}>Enter your credentials</Text>
//         </Animated.View>

//         {/* Animated Form Container */}
//         <Animated.View 
//           style={[
//             styles.formWrapper, 
//             { transform: [{ translateY: formTranslate }] }
//           ]}
//         >
//           <BlurView
//             intensity={80}
//             tint="light"
//             style={styles.blurContainer}
//           >
//             <View style={styles.formContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter theEmail"
//                 placeholderTextColor="orange"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />

//               <TextInput
//                 style={styles.input}
//                 placeholder=" Enter the Password"
//                 placeholderTextColor="orange"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 autoCapitalize="none"
//               />

//               <TouchableOpacity style={styles.forgotButton}>
//                 <Text style={styles.forgotText}>Forgot Password?</Text>
//               </TouchableOpacity>

//               <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
//                 <TouchableOpacity
//                   onPress={handleLogin}
//                   onPressIn={handleButtonPressIn}
//                   onPressOut={handleButtonPressOut}
//                   activeOpacity={0.9}
//                 >
//                   <LinearGradient
//                     colors={['#ff6b6b', '#ff8e53']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={styles.loginButton}
//                   >
//                     <Text style={styles.loginButtonText}>Sign In</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </Animated.View>

//               <View style={styles.signupContainer}>
//                 <Text style={styles.signupText}>Need an account? </Text>
//                 <TouchableOpacity>
//                   <Text style={styles.signupLink}>Sign Up</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </BlurView>
//         </Animated.View>
//       </LinearGradient>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradientBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 25,
//   },
//   particles: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   header: {
//     marginBottom: 50,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 48,
//     fontWeight: '900',
//     color: '#fff',
//     letterSpacing: 1.5,
//     textShadowColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 5,
//   },
//   subtitle: {
//     fontSize: 20,
//     color: 'rgba(255, 255, 255, 0.9)',
//     marginTop: 8,
//     fontWeight: '300',
//   },
//   formWrapper: {
//     alignItems: 'center',
//   },
//   blurContainer: {
//     borderRadius: 25,
//     overflow: 'hidden',
//     width: '100%',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   formContainer: {
//     padding: 30,
//     // backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     backgroundColor : 'white'
//   },
//   input: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 18,
//     marginBottom: 20,
//     fontSize: 16,
//     color: '#fff',
//     borderWidth: 1,
//     borderColor: '#f27121',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     color : 'orange'
//   },
//   forgotButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 30,
//   },
//   forgotText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '500',
//     opacity: 0.9,
//   },
//   loginButton: {
//     paddingVertical: 18,
//     borderRadius: 15,
//     alignItems: 'center',
//     shadowColor: '#ff6b6b',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 8,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '700',
//     letterSpacing: 1,
//     textTransform: 'uppercase',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 30,
//   },
//   signupText: {
//     color: 'rgba(255, 255, 255, 0.9)',
//     fontSize: 16,
//   },
//   signupLink: {
//     color: '#ff8e53',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Login;