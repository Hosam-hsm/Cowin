import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import LoginScreen from '../containers/LoginScreen/LoginScreen';
import { useAppSelector } from '../hooks/storeHooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SlotsScreen from '../containers/SlotsScreen/SlotsScreen';
import { AuthStackParamList, HomeStackParamList } from '../types/NavigationTypes';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const RootNavigator=()=>{
    const credentials=useAppSelector(state=>state.user.credentials)
    return(
    <NavigationContainer>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        {!credentials? (
        // No token found, user isn't signed in
        <AuthStack.Navigator>
            <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
                headerShown:false
            }}
            />
            </AuthStack.Navigator>
    ) : (
        // User is signed in
        <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Change Location',
            headerRight:()=> <Icon 
            name='dots-vertical' 
            size={27} />
        }}/>
        <HomeStack.Screen name="Slots" component={SlotsScreen} options={{
            headerRight:()=> <Icon 
            name='dots-vertical' 
            size={27} />,
        }}/>
        </HomeStack.Navigator>
        )}
    </NavigationContainer>
    )
}

export default RootNavigator