import { View, Text } from 'react-native'
import React, { Children, createContext, FC, PropsWithChildren, useState } from 'react'
import AppWrite from '@/services/auth'

type AppContextType = {
    appwrite:AppWrite;
    isLoggedIn:boolean;
    setIsLoggedIn:(isLoggedIn:boolean)=>void;
}

export const AppWriteContext = createContext<AppContextType>({
    appwrite: new AppWrite(),
    isLoggedIn: false,
    setIsLoggedIn: () => {},
})

export const AppWriteProvider: FC<PropsWithChildren> = ({children}) => {
  debugger
 const [isLoggedIn, setIsLoggedIn] = useState(false)
 const defaultValue = {
    appwrite: new AppWrite(),
    isLoggedIn,
    setIsLoggedIn,
  }
  return (
    <AppWriteContext.Provider value={defaultValue}>
      {children}
    </AppWriteContext.Provider>
  )
 }


export default AppWriteContext