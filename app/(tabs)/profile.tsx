import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { icons } from '@/constants/icons'
import { Snackbar } from 'react-native-paper'

/* import Snackbar from 'react-native-snackbar' */
import {AppWriteContext} from '@/components/AppWriteContext'

type UserObj ={
  name: string
  email: string
}

const Profile = () => {
  const [userData,setUserData] = useState<UserObj>()
  const [visible,setVisible] = useState<boolean>(false)
  const onDismissSnackBar = () => setVisible(false);
  const {appwrite,setIsLoggedIn} = useContext(AppWriteContext)
  
  const handleLogout = async () => {
    appwrite.logout()
    .then(() => {
      setIsLoggedIn(false)
      return <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>Algo</Snackbar>;
    })
  }

  useEffect(() => {
    appwrite.getCurrentUser()
    .then(response =>{
      if (response) {
        const user:UserObj = {
          name: response.name,
          email: response.email,
        }
        setUserData(user)
      }
    })
    
  }, [appwrite])
  

  return (
    <View className='flex-1 bg-primary items-center justify-center'>
      <Image source={icons.person} className='w-10 h-10'/>
      <Text className='text-white'>Profile</Text>
        {userData && (
          <View>
            <Text>Name: {userData.name}</Text>
            <Text>Email: {userData.email}</Text>
        </View>
        )}
    </View>
  )
}

export default Profile