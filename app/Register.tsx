import { View, Text, KeyboardAvoidingView, Platform, TextInput, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { Snackbar } from "react-native-paper";

/* context API */
import { AppWriteContext } from "@/components/AppWriteContext";
/* Navigation */
import { StackNavigationState } from "@react-navigation/native";
import { AuthStackParamList } from "./AppStack";
import { useRouter } from 'expo-router';



type SingupScreenProps = StackNavigationState<AuthStackParamList>;

const Register = () => {
  const { appwrite, setIsLoggedIn } = useContext(AppWriteContext);
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeartPassword, setRepeatPassword] = useState<string>("");
  const [visible,setVisible] = useState<boolean>(false)
    const onDismissSnackBar = () => setVisible(false);
    const router = useRouter();

  const handleRegister = () => {
    if (!name || !email || !password || !repeartPassword) {
      setError("All fields are required");
    } else if (password !== repeartPassword) {
      setError("Passwords do not match");
    }else if(password.length < 8){
      setError("Password must be at least 8 characters");
    }else {
      const user = {
        email,
        password,
        name,
      };
      appwrite
      .createAccount(user)
      .then((response:any) =>{
        if (response) {
          setIsLoggedIn(true);
          return <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>Algo</Snackbar>;
        }
      })
      .catch((error) => { 
        console.log('handleRegister',error);
        setError(error.message);           
      })
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-primary items-center justify-center">
      <View className="flex gap-4">
        <Text className="text-lg text-white text-center font-bold mb-3">Register</Text>
        {/* Name */}
        <TextInput value={name}
        onChangeText={text =>{setError('');setName(text);}}
        placeholderTextColor={'white'}
        placeholder="Name"
        className="text-light-200 border-2 border-light-200"
        />
        {/* Email */}
        <TextInput value={email}
        keyboardType="email-address"
        onChangeText={text =>{setError('');setEmail(text);}}
        placeholderTextColor={'white'}
        placeholder="Email"
        className="text-light-200 border-2 border-light-200"
        />
        {/* Password */}
        <TextInput value={password}
        onChangeText={text =>{setError('');setPassword(text);}}
        placeholderTextColor={'white'}
        placeholder="Password"
        className="text-light-200 border-2 border-light-200"
        />
        {/* repeatPassword */}
        <TextInput value={repeartPassword}
        onChangeText={text =>{setError('');setRepeatPassword(text);}}
        placeholderTextColor={'white'}
        placeholder="Repeat Password"
        className="text-light-200 border-2 border-light-200"
        />
        {/* Validation errors */}
        {error && (<Text className="text-red-500">{error}</Text>)}
        {/* Signup button */}
        <Pressable className="mt-5 bg-light-200 items-center w-30 py-2  " onPress={handleRegister}>
          <Text className="text-primary">Register</Text>
        </Pressable>
        {/* Login navigation */}
        <Pressable className="mt-5" onPress={()=>router.push('/Login')}>
          <Text className="text-white">Already have an account? <Text className="text-light-200">Login</Text></Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
