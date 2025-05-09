import { Text } from "react-native";
import { Client, Databases, ID, Query, Account } from "react-native-appwrite";
import {Snackbar} from 'react-native-paper'
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};
type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;

  constructor() {
    client;
    this.account = new Account(client);
  }

  /* Crear un nuevo registro de usuario */
  async createAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite:createAccount", error);
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      
      console.log("Appwrite:loginAccount", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      
      console.log("Appwrite:currentUserAccount", error);
    }
  }
  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
    
      console.log("Appwrite:logout", error);
    }
  }
}

export default AppwriteService;
