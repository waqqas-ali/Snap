import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native';
import Login from "@/assets/src/screens/Login";
import SignIn from "@/assets/src/screens/SignIn";
import HomeScreen from "@/assets/src/screens/HomeScreen";
import Photos from "@/assets/src/screens/Photos";
import Setting from "@/assets/src/screens/Setting";
import Profile from "@/assets/src/screens/Profile";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
);

// Floating Action Button Component
const FloatingActionButton = ({ onPress }) => {
  const scaleValue = new Animated.Value(1);

  const animateScale = (toValue) => {
    Animated.spring(scaleValue, {
      toValue,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={() => {
        animateScale(0.9);
        setTimeout(() => animateScale(1), 200);
        onPress();
      }}
      activeOpacity={0.7}
      style={styles.fabContainer}
    >
      <Animated.View style={[styles.fab, { transform: [{ scale: scaleValue }] }]}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.fabGradient}
        >
          <Feather name="plus" size={30} color="#fff" />
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

// App Tabs with Enhanced UI
const AppTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false, // Hide labels for cleaner look
      tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 70,
        borderRadius: 25,
        // Use Platform.select to handle Android-specific styling
        backgroundColor: Platform.select({
          ios: 'transparent',
          android: 'transparent', // No background color on Android
        }),
        // Remove shadow/elevation for Android
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
          },
          android: {
            elevation: 0, // Remove elevation (shadow) on Android
          },
        }),
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <LinearGradient
              colors={focused ? ['#4c669f', '#3b5998', '#192f6a'] : ['#ffffff', '#f0f0f0']}
              style={styles.gradientIcon}
            >
              <Feather 
                name="home" 
                size={24} 
                color={focused ? '#fff' : '#666'} 
              />
            </LinearGradient>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Photos"
      component={Photos}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <LinearGradient
              colors={focused ? ['#4c669f', '#3b5998', '#192f6a'] : ['#ffffff', '#f0f0f0']}
              style={styles.gradientIcon}
            >
              <Feather 
                name="image" 
                size={24} 
                color={focused ? '#fff' : '#666'} 
              />
            </LinearGradient>
          </View>
        ),
      }}
    />
    {/* Placeholder for FAB */}
    <Tab.Screen
      name="Add"
      component={View} // Empty component for the FAB placeholder
      options={{
        tabBarButton: () => (
          <FloatingActionButton onPress={() => console.log('Add Pressed')} />
        ),
      }}
    />
    <Tab.Screen
      name="Setting"
      component={Setting}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <LinearGradient
              colors={focused ? ['#4c669f', '#3b5998', '#192f6a'] : ['#ffffff', '#f0f0f0']}
              style={styles.gradientIcon}
            >
              <Feather 
                name="settings" 
                size={24} 
                color={focused ? '#fff' : '#666'} 
              />
            </LinearGradient>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabIconContainer}>
            <LinearGradient
              colors={focused ? ['#4c669f', '#3b5998', '#192f6a'] : ['#ffffff', '#f0f0f0']}
              style={styles.gradientIcon}
            >
              <Feather 
                name="user" 
                size={24} 
                color={focused ? '#fff' : '#666'} 
              />
            </LinearGradient>
          </View>
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

// Styles
const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  gradientIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // Use Platform.select to handle Android-specific styling for gradient icons
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 20, // Remove elevation (shadow) on Android for icons
      },
    }),
  },
  fabContainer: {
    position: 'absolute',
    // bottom: 40,
    bottom: Platform.OS === 'ios' ? 0 : 37,
    alignSelf: 'center',
    zIndex: 10,
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    // Use Platform.select to handle Android-specific styling for FAB
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 20, // Remove elevation (shadow) on Android for FAB
      },
    }),
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;