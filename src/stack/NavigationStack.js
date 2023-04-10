import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//views
import Home from '../views/Home/index.js';
import Jogo from '../views/Jogo/index.js';


const NavigationStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}>

                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Jogo" component={Jogo} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default NavigationStack;





