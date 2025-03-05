// import React from 'react';
// import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, StyleSheet, Platform } from 'react-native';
// import Login from "@/assets/src/screens/Login";
// import SignIn from "@/assets/src/screens/SignIn";
// import HomeScreen from "@/assets/src/screens/HomeScreen";
// import Photos from "@/assets/src/screens/Photos";
// import Setting from "@/assets/src/screens/Setting";
// import Profile from "@/assets/src/screens/Profile";
// import { LinearGradient } from 'expo-linear-gradient';
// import { Feather } from '@expo/vector-icons';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


// // Auth Stack
// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={Login} />
//     <Stack.Screen name="SignIn" component={SignIn} />
//   </Stack.Navigator>
// );
// // App Tabs
// const AppTabs = () => (
//   <Tab.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}
//   >
//     <Tab.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//       }}
//     />
//     <Tab.Screen
//       name="Photos"
//       component={Photos}
//       options={{
      
//       }}
//     />
//     <Tab.Screen
//       name="Setting"
//       component={Setting}
//       options={{
      
//       }}
//     />
//     <Tab.Screen
//       name="Profile"
//       component={Profile}
//       options={{
       
//       }}
//     />
//   </Tab.Navigator>
// );

// // Root Navigator
// const App = () => (
//   <NavigationIndependentTree>
//   <NavigationContainer>
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Auth" component={AuthStack} />
//       <Stack.Screen name="App" component={AppTabs} />
//     </Stack.Navigator>
//   </NavigationContainer>
//   </NavigationIndependentTree>
// );

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
);

// App Tabs with enhanced UI
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
        elevation: 5,
        borderRadius: 15,
        height: 70,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default App;