import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const Saved = () => {
  return (
    <View className='flex-1 bg-primary items-center justify-center'>
      <Image source={icons.save}/>
      <Text className='text-white'>Saved</Text>
    </View>
  )
}

export default Saved