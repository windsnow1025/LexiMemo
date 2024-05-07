import axios, { AxiosInstance } from 'axios';
import {User} from "../model/User";
import { Word } from '../model/Word';



export default class UserService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_NODE_API_BASE_URL });
  }

  async getUser(token: string): Promise<User> {
    try {
      const res = await this.axiosInstance.get("/user", {
        headers: { Authorization: token }
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user.");
    }
  }

  async signIn(username: string, password: string): Promise<Map<string, string>> {
  try {
  const res = await this.axiosInstance.post("/user/sign-in", {
    username: username,
    password: password
  });
  const tokenMap = new Map<string, string>();
  tokenMap.set("token", res.data.token);
  return tokenMap;
} catch (error) {
  console.error("Error signing in:", error);
  throw new Error("Failed to sign in.");
}
}

async signUp(username: string, password: string, type: string | null = null): Promise<void> {
  try {
    const userData: { username: string; password: string; type?: string } = { username, password };
if (type) {
  userData.type = type;
}
await this.axiosInstance.post("/user/sign-up", userData);
} catch (error) {
  console.error("Error signing up:", error);
  throw new Error("Failed to sign up.");
}
}

async updatePassword(token: string, newPassword: string): Promise<void> {
  try {
    await this.axiosInstance.post("/user/password", { password: newPassword }, {
      headers: { Authorization: token, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error("Failed to update password.");
  }
}

async getUserWord(token: string): Promise<Word[]> {
  try {
    const res = await this.axiosInstance.get("/user/user-word", {
      headers: { Authorization: token }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user word:", error);
    throw new Error("Failed to fetch user word.");
  }
}

async linkUserWord(token: string, wordId: number, weights: string, day: string): Promise<void> {
  try {
    await this.axiosInstance.post("/user/user-word", { wordId, weights, day }, {
      headers: { Authorization: token, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error linking user word:", error);
    throw new Error("Failed to link user word.");
  }
}

async unlinkUserWord(token: string, userId: number): Promise<void> {
  try {
    await this.axiosInstance.delete(`/user/${userId}`, {
      headers: { Authorization: token }
    });
  } catch (error) {
    console.error("Error unlinking user word:", error);
    throw new Error("Failed to unlink user word.");
  }
}

}
