import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './Login'
import Register from './Register'

export type AuthStackParamList = {
  Login: undefined
  Register: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign:'center', headerBackVisible:false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
    </Stack.Navigator>
  )
}

export default AuthStack