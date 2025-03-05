// import React from 'react';
// import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'; // Removed NavigationIndependentTree (see note below)
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, Platform, Dimensions, StyleSheet } from 'react-native';
// import Login from "@/assets/src/screens/Login";
// import SignIn from "@/assets/src/screens/SignIn";
// import HomeScreen from "@/assets/src/screens/HomeScreen";
// import Photos from "@/assets/src/screens/Photos";
// import Setting from "@/assets/src/screens/Setting";
// import Profile from "@/assets/src/screens/Profile";
// import { LinearGradient } from 'expo-linear-gradient';
// import { Feather } from '@expo/vector-icons';
// import Animated, { 
//   useAnimatedStyle, 
//   withSpring, 
//   withTiming, 
//   interpolate,
//   useSharedValue,
//   withSequence,
// } from 'react-native-reanimated';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   tabBarContainer: {
//     position: 'absolute',
//     bottom: Platform.OS === 'ios' ? 24 : 16,
//     left: 16,
//     right: 16,
//     height: 80, // Increased height for a more spacious design
//     borderRadius: 30, // Larger radius for a pill-shaped design
//     backgroundColor: 'transparent',
//     overflow: 'hidden',
//     elevation: 12, // Deeper shadow for modern look
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.35,
//     shadowRadius: 12,
//   },
//   gradientBackground: {
//     ...StyleSheet.absoluteFillObject,
//     opacity: 0.95,
//   },
//   iconContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//     paddingTop : 0,
//     width: SCREEN_WIDTH / 4, // Evenly distribute width for 4 tabs
//   },
//   iconWrapper: {

//     padding: 14,
//     borderRadius: 28, // Larger radius for a softer look
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.08)', // Subtle background for inactive tabs
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)', // Subtle border for depth
//   },
//   activeIconWrapper: {
//     backgroundColor: 'rgba(255,255,255,0.2)', // Slightly more opaque for active tabs
//     borderColor: '#fff', // White border for active tabs
//     shadowColor: '#fff',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   glowEffect: {
//     position: 'absolute',
//     width: 60, // Larger glow effect
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'rgba(255,255,255,0.25)', // Softer glow
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: 'rgba(255,255,255,0.8)',
//     marginTop: 4,
//   },
//   activeLabel: {
//     color: '#fff',
//     fontWeight: '700',
//   },
// });

// // Stack Navigator for Auth
// const AuthStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="SignIn" component={SignIn} />
//     </Stack.Navigator>
//   );
// };

// const TabBarIcon = ({ focused, icon, label }) => {
//   const scale = useSharedValue(1);
//   const rotation = useSharedValue(0);
//   const opacity = useSharedValue(0.8); // For label animation

//   React.useEffect(() => {
//     if (focused) {
//       scale.value = withSequence(
//         withSpring(1.3, { damping: 10, stiffness: 100 }), // Smoother spring animation
//         withSpring(1.1, { damping: 10, stiffness: 100 })
//       );
//       rotation.value = withSequence(
//         withTiming(0.1, { duration: 120 }), // Smoother timing
//         withTiming(-0.1, { duration: 120 }),
//         withTiming(0, { duration: 120 })
//       );
//       opacity.value = withTiming(1, { duration: 200 }); // Fade in label
//     } else {
//       scale.value = withSpring(1, { damping: 10, stiffness: 100 });
//       rotation.value = withSpring(0, { damping: 10, stiffness: 100 });
//       opacity.value = withTiming(0.8, { duration: 200 }); // Fade out label
//     }
//   }, [focused]);

//   const animatedIconStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { scale: scale.value },
//         { rotate: `${rotation.value * 360}deg` },
//       ],
//     };
//   });

//   const animatedGlowStyle = useAnimatedStyle(() => {
//     const glowOpacity = interpolate(
//       scale.value,
//       [1, 1.3],
//       [0, 0.6] // Stronger glow when active
//     );
//     return {
//       opacity: glowOpacity,
//       transform: [{ scale: scale.value }],
//     };
//   });

//   const animatedLabelStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//     };
//   });

//   return (
//     <View style={styles.iconContainer}>
//       <Animated.View style={[styles.glowEffect, animatedGlowStyle]} />
//       <Animated.View
//         style={[
//           styles.iconWrapper,
//           focused && styles.activeIconWrapper,
//           animatedIconStyle,
//         ]}
//       >
//         <Feather 
//           name={icon} 
//           size={28} // Slightly larger icons for better visibility
//           color={focused ? '#fff' : 'rgba(255,255,255,0.6)'} 
//         />
//       </Animated.View>
//       <Animated.Text style={[styles.label, focused && styles.activeLabel, animatedLabelStyle]}>
//         {label}
//       </Animated.Text>
//     </View>
//   );
// };

// const TabBarBackground = () => {
//   return (
//     <View style={styles.tabBarContainer}>
//       <LinearGradient
//         colors={[
//           '#0F172A', // Dark navy (matches HomeScreen background)
//           '#1E1B4B', // Deep purple
//           '#4C1D95', // Vibrant purple (matches HomeScreen gradient)
//         ]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.gradientBackground}
//       >
//         <View style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '100%',
//           backgroundColor: 'rgba(255,255,255,0.05)', // Subtle overlay for depth
//         }} />
//       </LinearGradient>
//     </View>
//   );
// };

// // Tab Navigator with enhanced UI
// const AppTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           ...styles.tabBarContainer,
//           backgroundColor: 'transparent',
//           borderTopWidth: 0,
//           elevation: 0,
//           height: 80, // Increased height to accommodate labels and match HomeScreen design
//         },
//         tabBarBackground: () => <TabBarBackground />,
//         tabBarActiveTintColor: '#fff',
//         tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
//         tabBarShowLabel: false, // Labels are handled manually in TabBarIcon
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon focused={focused} icon="home" label="Home" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Photos"
//         component={Photos}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon focused={focused} icon="image" label="Photos" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Setting"
//         component={Setting}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon focused={focused} icon="settings" label="Settings" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon focused={focused} icon="user" label="Profile" />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// // Root Navigator to switch between Auth (Login/SignIn) and App (Tabs)
// const App = () => {
//   return (
//     <NavigationIndependentTree>
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Auth" component={AuthStack} />
//         <Stack.Screen name="App" component={AppTabs} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     </NavigationIndependentTree>
//   );
// };

// export default App;





// import React from 'react';
// import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'; // Removed NavigationIndependentTree (see note below)
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, Platform, Dimensions, StyleSheet } from 'react-native';
// import Login from "@/assets/src/screens/Login";
// import SignIn from "@/assets/src/screens/SignIn";
// import HomeScreen from "@/assets/src/screens/HomeScreen";
// import Photos from "@/assets/src/screens/Photos";
// import Setting from "@/assets/src/screens/Setting";
// import Profile from "@/assets/src/screens/Profile";
// import { LinearGradient } from 'expo-linear-gradient';
// import { Feather } from '@expo/vector-icons'; // Explicitly using Feather icons
// import Animated, { 
//   useAnimatedStyle, 
//   withSpring, 
//   withTiming, 
//   interpolate,
//   useSharedValue,
//   withSequence,
// } from 'react-native-reanimated';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// const styles = StyleSheet.create({
// });

// // Stack Navigator for Auth
// const AuthStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="SignIn" component={SignIn} />
//     </Stack.Navigator>
//   );
// };

// const TabBarIcon = ({ focused, icon, label }) => {
//   const scale = useSharedValue(1);
//   const rotation = useSharedValue(0);
//   const opacity = useSharedValue(0.8); // For label animation

//   React.useEffect(() => {
//     if (focused) {
//       scale.value = withSequence(
//         withSpring(1.3, { damping: 10, stiffness: 100 }), // Smoother spring animation
//         withSpring(1.1, { damping: 10, stiffness: 100 })
//       );
//       rotation.value = withSequence(
//         withTiming(0.1, { duration: 120 }), // Smoother timing
//         withTiming(-0.1, { duration: 120 }),
//         withTiming(0, { duration: 120 })
//       );
//       opacity.value = withTiming(1, { duration: 200 }); // Fade in label
//     } else {
//       scale.value = withSpring(1, { damping: 10, stiffness: 100 });
//       rotation.value = withSpring(0, { damping: 10, stiffness: 100 });
//       opacity.value = withTiming(0.8, { duration: 200 }); // Fade out label
//     }
//   }, [focused]);

//   const animatedIconStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { scale: scale.value },
//         { rotate: `${rotation.value * 360}deg` },
//       ],
//     };
//   });

//   const animatedGlowStyle = useAnimatedStyle(() => {
//     const glowOpacity = interpolate(
//       scale.value,
//       [1, 1.3],
//       [0, 0.6] // Stronger glow when active
//     );
//     return {
//       opacity: glowOpacity,
//       transform: [{ scale: scale.value }],
//     };
//   });

//   const animatedLabelStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//     };
//   });

//   return (
//     <View style={styles.iconContainer}>
//       <Animated.View style={[styles.glowEffect, animatedGlowStyle]} />
//       <Animated.View
//         style={[
//           styles.iconWrapper,
//           focused && styles.activeIconWrapper,
//           animatedIconStyle,
//         ]}
//       >
//         <Feather 
//           name={icon} 
//           size={28} // Slightly larger icons for better visibility
//           color={focused ? '#fff' : 'rgba(255,255,255,0.6)'} 
//         />
//       </Animated.View>
//       <Animated.Text style={[styles.label, focused && styles.activeLabel, animatedLabelStyle]}>
//         {label}
//       </Animated.Text>
//     </View>
//   );
// };

// const TabBarBackground = () => {
//   return (
//     <View style={styles.tabBarContainer}>
//       <LinearGradient
//         colors={[
//           '#0F172A', // Dark navy (matches HomeScreen background)
//           '#1E1B4B', // Deep purple
//           '#4C1D95', // Vibrant purple (matches HomeScreen gradient)
//         ]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.gradientBackground}
//       >
//         <View style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '100%',
//           backgroundColor: 'rgba(255,255,255,0.05)', // Subtle overlay for depth
//         }} />
//       </LinearGradient>
//     </View>
//   );
// };

// // Tab Navigator with enhanced UI and Feather icons
// const AppTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           ...styles.tabBarContainer,
//           backgroundColor: 'transparent',
//           borderTopWidth: 0,
//           elevation: 0,
//           height: 80, // Increased height to accommodate labels and match HomeScreen design
//         },
//         tabBarBackground: () => <TabBarBackground />,
//         tabBarActiveTintColor: '#fff',
//         tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
//         tabBarShowLabel: false, // Labels are handled manually in TabBarIcon
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon focused={focused} icon="home" label="Home" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Photos"
//         component={Photos}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon focused={focused} icon="image" label="Photos" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Setting"
//         component={Setting}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon focused={focused} icon="settings" label="Settings" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon focused={focused} icon="user" label="Profile" />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// // Root Navigator to switch between Auth (Login/SignIn) and App (Tabs)
// const App = () => {
//   return (
//     <NavigationIndependentTree>
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Auth" component={AuthStack} />
//         <Stack.Screen name="App" component={AppTabs} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     </NavigationIndependentTree>
//   );
// };

// export default App;





import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import Login from "@/assets/src/screens/Login";
import SignIn from "@/assets/src/screens/SignIn";
import HomeScreen from "@/assets/src/screens/HomeScreen";
import Photos from "@/assets/src/screens/Photos";
import Setting from "@/assets/src/screens/Setting";
import Profile from "@/assets/src/screens/Profile";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 20,
    paddingBottom: 0,
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 12,
  },
  activeIconWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  glowEffect: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  label: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    fontWeight: '600',
  },
  activeLabel: {
    color: '#fff',
  },
});

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
);

// Enhanced TabBarIcon Component
const TabBarIcon = ({ focused, icon, label }) => {
  const scale = useSharedValue(1);
  const offsetY = useSharedValue(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.2, { damping: 12, stiffness: 150 });
      offsetY.value = withSpring(-5, { damping: 12, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      scale.value = withSpring(1, { damping: 12, stiffness: 150 });
      offsetY.value = withSpring(0, { damping: 12, stiffness: 150 });
      opacity.value = withTiming(0.7, { duration: 300 });
    }
  }, [focused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: offsetY.value },
    ],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [1, 1.2], [0, 0.5]),
    transform: [{ scale: scale.value * 1.5 }],
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.iconContainer}>
      <Animated.View style={[styles.glowEffect, animatedGlowStyle]} />
      <Animated.View
        style={[
          styles.iconWrapper,
          focused && styles.activeIconWrapper,
          animatedIconStyle,
        ]}
      >
        <Feather 
          name={icon} 
          size={26} 
          color={focused ? '#fff' : 'rgba(255, 255, 255, 0.7)'} 
        />
      </Animated.View>
      <Animated.Text style={[styles.label, focused && styles.activeLabel, animatedLabelStyle]}>
        {label}
      </Animated.Text>
    </View>
  );
};

// Custom Tab Bar Background with Glassmorphism
const TabBarBackground = () => (
  <View style={styles.tabBarContainer}>
    <LinearGradient
      colors={['#1E3A8A', '#7C3AED', '#DB2777']} // Vibrant gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      <View style={styles.glassEffect} />
    </LinearGradient>
  </View>
);

// App Tabs
const AppTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBarContainer,
      tabBarBackground: () => <TabBarBackground />,
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} icon="home" label="Home" />
        ),
      }}
    />
    <Tab.Screen
      name="Photos"
      component={Photos}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} icon="image" label="Photos" />
        ),
      }}
    />
    <Tab.Screen
      name="Setting"
      component={Setting}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} icon="settings" label="Settings" />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} icon="user" label="Profile" />
        ),
      }}
    />
  </Tab.Navigator>
);

// Root Navigator
const App = () => (
  <NavigationIndependentTree>
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="App" component={AppTabs} />
    </Stack.Navigator>
  </NavigationContainer>
  </NavigationIndependentTree>
);

export default App;