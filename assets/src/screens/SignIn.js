// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
//   StatusBar,
//   Animated,
// } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const { width, height } = Dimensions.get('window');

// const SignUp = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [name, setName] = useState('');
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [slideAnim] = useState(new Animated.Value(50));

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         tension: 20,
//         friction: 7,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const handleSignUp = () => {
//     console.log('Sign up pressed');
//   };

//   return (
//     <>
//       <StatusBar barStyle="light-content" />
//       <LinearGradient
//         colors={['#1A1A2E', '#16213E', '#0F3460']}
//         style={styles.container}
//       >
//         <SafeAreaView style={styles.safeArea}>
//           <Animated.View 
//             style={[
//               styles.content, 
//               { 
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             {/* Header */}
//             <View style={styles.header}>
//               <LinearGradient
//                 colors={['#E94560', '#FF6B6B']}
//                 style={styles.headerIcon}
//               >
//                 <MaterialIcons name="person-add" size={36} color="#fff" />
//               </LinearGradient>
//               <Text style={styles.title}>Welcome Aboard</Text>
//               <Text style={styles.subtitle}>Let's get you started</Text>
//             </View>

//             {/* Form */}
//             <View style={styles.form}>
//               <AnimatedInput
//                 icon="person-outline"
//                 placeholder="Full Name"
//                 value={name}
//                 onChangeText={setName}
//               />
//               <AnimatedInput
//                 icon="mail-outline"
//                 placeholder="Email Address"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//               <AnimatedInput
//                 icon="lock-outline"
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//               />
//               <AnimatedInput
//                 icon="lock-outline"
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry
//               />

//               <TouchableOpacity 
//                 style={styles.signUpButton}
//                 onPress={handleSignUp}
//                 activeOpacity={0.9}
//               >
//                 <LinearGradient
//                   colors={['#E94560', '#FF6B6B']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={styles.buttonGradient}
//                 >
//                   <Text style={styles.buttonText}>Create Account</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>

//             {/* Social Login */}
//             <View style={styles.socialSection}>
//               <Text style={styles.socialText}>Or continue with</Text>
//               <View style={styles.socialButtons}>
//                 {[
//                   { name: 'google', color: '#DB4437' },
//                   { name: 'facebook-f', color: '#4267B2' },
//                   { name: 'apple', color: '#000000' },
//                 ].map((social, index) => (
//                   <TouchableOpacity 
//                     key={index}
//                     style={[styles.socialButton, { backgroundColor: social.color }]}
//                   >
//                     <FontAwesome5 name={social.name} size={24} color="#fff" />
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>

//             {/* Footer */}
//             <View style={styles.footer}>
//               <Text style={styles.footerText}>Already a member? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                 <Text style={styles.footerLink}>Sign In</Text>
//               </TouchableOpacity>
//             </View>
//           </Animated.View>
//         </SafeAreaView>
//       </LinearGradient>
//     </>
//   );
// };

// // Custom Animated Input Component
// const AnimatedInput = ({ icon, ...props }) => {
//   const [focusAnim] = useState(new Animated.Value(0));

//   const handleFocus = () => {
//     Animated.timing(focusAnim, {
//       toValue: 1,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   };

//   const handleBlur = () => {
//     Animated.timing(focusAnim, {
//       toValue: 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   };

//   return (
//     <Animated.View 
//       style={[
//         styles.inputContainer,
//         {
//           borderColor: focusAnim.interpolate({
//             inputRange: [0, 1],
//             outputRange: ['rgba(255,255,255,0.1)', '#E94560']
//           })
//         }
//       ]}
//     >
//       <MaterialIcons name={icon} size={22} color="#fff" style={styles.inputIcon} />
//       <TextInput
//         style={styles.input}
//         placeholderTextColor="rgba(255,255,255,0.6)"
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         {...props}
//       />
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     paddingVertical: height * 0.02,
//     paddingHorizontal: width * 0.05,
//     justifyContent: 'space-between',
//   },
//   header: {
//     alignItems: 'center',
//     marginTop: height * 0.02,
//     marginBottom: height * 0.02,
//   },
//   headerIcon: {
//     width: Math.min(width * 0.17, 60),
//     height: Math.min(width * 0.17, 60),
//     borderRadius: Math.min(width * 0.085, 30),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: height * 0.015,
//   },
//   title: {
//     fontSize: Math.min(width * 0.07, 28),
//     fontWeight: '700',
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: Math.min(width * 0.035, 14),
//     color: 'rgba(255,255,255,0.8)',
//     marginTop: height * 0.008,
//   },
//   form: {
//     flex: 1,
//     justifyContent: 'center',
//     marginVertical: height * 0.02,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderRadius: 12,
//     marginBottom: height * 0.015,
//     borderWidth: 1,
//     paddingHorizontal: width * 0.04,
//     height: Math.min(height * 0.065, 50),
//   },
//   inputIcon: {
//     marginRight: width * 0.02,
//   },
//   input: {
//     flex: 1,
//     fontSize: Math.min(width * 0.035, 14),
//     color: '#fff',
//   },
//   signUpButton: {
//     borderRadius: 12,
//     marginTop: height * 0.02,
//     overflow: 'hidden',
//   },
//   buttonGradient: {
//     paddingVertical: Math.min(height * 0.018, 15),
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: Math.min(width * 0.04, 16),
//     fontWeight: '600',
//   },
//   socialSection: {
//     alignItems: 'center',
//     marginTop: 'auto',
//     paddingBottom: height * 0.02,
//   },
//   socialText: {
//     color: 'rgba(255,255,255,0.7)',
//     fontSize: Math.min(width * 0.032, 13),
//     marginBottom: height * 0.015,
//   },
//   socialButtons: {
//     flexDirection: 'row',
//     gap: width * 0.04,
//     marginBottom: height * 0.025,
//   },
//   socialButton: {
//     width: Math.min(width * 0.12, 45),
//     height: Math.min(width * 0.12, 45),
//     borderRadius: Math.min(width * 0.06, 22.5),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: height * 0.01,
//   },
//   footerText: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: Math.min(width * 0.032, 13),
//   },
//   footerLink: {
//     color: '#E94560',
//     fontSize: Math.min(width * 0.032, 13),
//     fontWeight: '600',
//   },
// });

// export default SignUp;




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
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 360;

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(height * 0.1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
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
        colors={['#2A0944', '#3F2E56', '#5C4D7D']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <Animated.View 
            style={[
              styles.content,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <LinearGradient
                colors={['#FEC260', '#F7A11D']}
                style={styles.headerIcon}
              >
                <MaterialIcons name="person-add-alt-1" size={isSmallScreen ? 28 : 36} color="#fff" />
              </LinearGradient>
              <Text style={styles.title}>Join Us</Text>
              <Text style={styles.subtitle}>Create your account</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <AnimatedInput
                icon="person"
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
              <AnimatedInput
                icon="email"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AnimatedInput
                icon="lock"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <AnimatedInput
                icon="lock"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <TouchableOpacity 
                style={styles.signUpButton}
                onPress={handleSignUp}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#FEC260', '#F7A11D']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Social Login */}
            <View style={styles.socialSection}>
              <Text style={styles.socialText}>Or sign up with</Text>
              <View style={styles.socialButtons}>
                {[
                  { name: 'google', color: '#DB4437' },
                  { name: 'facebook-f', color: '#4267B2' },
                  { name: 'apple', color: '#333333' },
                ].map((social, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={[styles.socialButton, { backgroundColor: social.color }]}
                  >
                    <FontAwesome5 name={social.name} size={isSmallScreen ? 20 : 24} color="#fff" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Footer */}
            <TouchableOpacity 
              style={styles.footer}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.footerText}>
                Already have an account? <Text style={styles.footerLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const AnimatedInput = ({ icon, ...props }) => {
  const [focusAnim] = useState(new Animated.Value(0));
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        styles.inputContainer,
        {
          borderColor: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(255,255,255,0.15)', '#FEC260']
          }),
          shadowOpacity: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.2]
          })
        }
      ]}
    >
      <MaterialIcons 
        name={icon} 
        size={isSmallScreen ? 18 : 22} 
        color={isFocused ? '#FEC260' : 'rgba(255,255,255,0.7)'} 
        style={styles.inputIcon} 
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="rgba(255,255,255,0.6)"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop : Platform.OS === 'android' ? 20 : 0
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.03,
  },
  header: {
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  headerIcon: {
    width: isSmallScreen ? 50 : 60,
    height: isSmallScreen ? 50 : 60,
    borderRadius: isSmallScreen ? 25 : 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.015,
    elevation: 5,
    shadowColor: '#FEC260',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: isSmallScreen ? 24 : 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: isSmallScreen ? 13 : 15,
    color: 'rgba(255,255,255,0.85)',
    marginTop: height * 0.005,
  },
  form: {
    gap: isSmallScreen ? 12 : 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: width * 0.03,
    height: isSmallScreen ? 45 : 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: width * 0.025,
  },
  input: {
    flex: 1,
    fontSize: isSmallScreen ? 13 : 14,
    color: '#fff',
    paddingVertical: 0,
  },
  signUpButton: {
    marginTop: height * 0.025,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#FEC260',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonGradient: {
    paddingVertical: isSmallScreen ? 12 : 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: height * 0.03,
  },
  socialText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: isSmallScreen ? 12 : 13,
    marginBottom: height * 0.015,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: isSmallScreen ? 10 : 15,
  },
  socialButton: {
    width: isSmallScreen ? 40 : 45,
    height: isSmallScreen ? 40 : 45,
    borderRadius: isSmallScreen ? 20 : 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: height * 0.015,
  },
  footerText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: isSmallScreen ? 12 : 13,
  },
  footerLink: {
    color: '#FEC260',
    fontWeight: '700',
  },
});

export default SignUp;



