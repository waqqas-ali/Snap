import {} from 'react-native'
import React from 'react'
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from "@/assets/src/screens/Login"
import SignIn from "@/assets/src/screens/SignIn"
import HomeScreen from "@/assets/src/screens/HomeScreen"

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    )
}

export default App