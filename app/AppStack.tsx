import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import index from './(tabs)/index'

export type AuthStackParamList = {
  index: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign:'center', headerBackVisible:false}}>
        <Stack.Screen name='index' component={index}/>
    </Stack.Navigator>
  )
}

export default AuthStack
