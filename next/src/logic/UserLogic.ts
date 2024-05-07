import UserService from "../service/UserService";
import {Word} from "@/src/model/Word";

export class UserLogic {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async fetchUsername(): Promise<string | null> {
    const token = localStorage.getItem('token') ?? null;
    if (!token) {
      return null;
    }
    try {
      const user = await this.userService.getUser(token);
      return user.username!;
    } catch (err) {
      localStorage.removeItem('token');
      return null;
    }
  }

  async signIn(username: string, password: string): Promise<void> {
    try {
      const tokenMap = await this.userService.signIn(username, password);
      const token = tokenMap.get('token');
      if (token) {
        localStorage.setItem('token', token);
      } else {
        throw new Error("Token not found in response.");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        throw new Error("Incorrect Username or Password.");
      } else {
        console.error(err);
        throw new Error("Sign In Fail.");
      }
    }
  }

  async signUp(username: string, password: string): Promise<void> {
    try {
      await this.userService.signUp(username, password);
    } catch (err:any) {
      if (err.response && err.response.status === 409) {
        throw new Error("Username already exists.");
      } else {
        console.error(err);
        throw new Error("Sign Up Fail.");
      }
    }
  }

  async updateUser(username: string, password: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found in localStorage.");
      }
      await this.userService.updatePassword(token, password);
    } catch (err) {
      console.error(err);
      throw new Error("Update Fail.");
    }
  }

  validateInput(input: string): boolean {
    const asciiRegex: RegExp = /^[\x20-\x7F]{4,32}$/;
    return asciiRegex.test(input);
  }

  async linkUserWord(token: string, wordId: number, weights: string, day: string): Promise<void> {
    try {
      await this.userService.linkUserWord(token, wordId, weights, day);
    } catch (error) {
      console.error("Error linking user word:", error);
      throw new Error("Failed to link user word.");
    }
  }

  async linkUserNewWord(token: string, wordId: number): Promise<void> {
    try {
      const weights = '[]';
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      const day = currentDate.toISOString().slice(0, 10);
      await this.userService.linkUserWord(token, wordId, weights, day);
    } catch (error) {
      console.error("Error linking user word:", error);
      throw new Error("Failed to link user word.");
    }
  }
  async unlinkUserWord(token: string, userId: number): Promise<void> {
    try {
      await this.userService.unlinkUserWord(token, userId);
    } catch (error) {
      console.error("Error unlinking user word:", error);
      throw new Error("Failed to unlink user word.");
    }
  }

  async getUserWord(token: string): Promise<void> {
    try {
      await this.userService.getUserWord(token);
    } catch (error) {
      console.error("Error fetching user word:", error);
      throw new Error("Failed to fetch user word.");
    }
  }
}
