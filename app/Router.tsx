import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {AppWriteContext} from '../components/AppWriteContext'
import Loading from '@/components/Loading'

//Routes
import AuthStack from './AuthStack'
import AppStack from './AppStack'



/* VALIDAR SI EL USUARIO ESTA LOGIN  */
const Router = () => {
  const [isLoading,setIsLoading]=useState<boolean>(true);
  const {appwrite,isLoggedIn,setIsLoggedIn}=useContext(AppWriteContext)

  useEffect(()=>{
    appwrite
    .getCurrentUser()
    .then(response =>{
      setIsLoading(false)
      if (response) {
        setIsLoggedIn(true)
      }
    })
    .catch(_=>{
      setIsLoading(false)
      setIsLoggedIn(false)
    })
  },[appwrite,setIsLoggedIn])

  if (isLoading) {
    return <Loading/>
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default Router