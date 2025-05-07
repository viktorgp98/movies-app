import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const Profile = () => {
  return (
    <View className='flex-1 bg-primary items-center justify-center'>
      <Image source={icons.person} className='w-10 h-10'/>
      <Text className='text-white'>Profile</Text>
    </View>
  )
}

export default Profile