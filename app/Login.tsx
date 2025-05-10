import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { Snackbar } from "react-native-paper";

/* context API */
import { AppWriteContext } from "@/components/AppWriteContext";
/* Navigation */
import { StackNavigationState } from "@react-navigation/native";
import { AuthStackParamList } from "./AppStack";
import { useRouter } from "expo-router";

const Login = () => {
  const { appwrite, setIsLoggedIn } = useContext(AppWriteContext);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const onDismissSnackBar = () => setVisible(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setError("All fields are required!");
    } else {
      const user = {
        email,
        password,
      };
      appwrite
        .login(user)
        .then((response: any) => {
          if (response) {
            setIsLoggedIn(true);
            return (
              <Snackbar
                visible={visible}
                onDismiss={() => {
                  onDismissSnackBar;
                }}
                duration={3000}
              >
                Login Success!
              </Snackbar>
            );
          }
        })
        .catch((e) => {
          console.log("handleLogin", e);
          setError("Invalid email or password");
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-primary items-center justify-center"
    >
      <View className="flex gap-3">
        <Text className="text-lg  text-center text-white font-bold mb-3">
          Login
        </Text>
        {/* Email */}
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={"white"}
          placeholder="Email"
          className="text-light-200 border-2 border-light-200"
        />
        {/* Password */}
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={"white"}
          placeholder="Password"
          className="text-light-200 border-2 border-light-200"
        />
        {/* Error */}
        {error && <Text className="text-red-500">{error}</Text>}
        {/* Login button */}
        <Pressable
          onPress={handleLogin}
          className="mt-5 bg-light-200 items-center w-30 py-2  "
        >
          <Text className=" text-primary font-bold text-md">Login</Text>
        </Pressable>

        {/* register navigation */}
        <Pressable className="mt-4" onPress={() => router.push("/Register")}>
          <Text className="text-white">
            Don't have an account yet?{" "}
            <Text className="text-light-200">Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
