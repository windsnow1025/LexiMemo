import UserService from "../service/UserService";
import WordService from "../service/WordService";
import {Word} from "@/src/model/Word";

export class UserLogic {
  private userService: UserService;
  private wordService: WordService;

  constructor() {
    this.userService = new UserService();
    this.wordService = new WordService();
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


  async linkUserWord(token: string, wordId: number, weights: string, days: string, nextDate:string): Promise<void> {
    try {
      await this.userService.linkUserWord(token, wordId, weights, days, nextDate);
    } catch (error) {
      console.error("Error linking user word:", error);
      throw new Error("Failed to link user word.");
    }
  }

  async linkUserNewWord(token: string, wordId: number): Promise<void> {
    try {
      const weights = '[]';
      const days = '[]';
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      const newDate = currentDate.toISOString().slice(0, 10);
      console.log("newDate", newDate);

      await this.userService.linkUserWord(token, wordId, weights, days, newDate);
    } catch (error) {
      console.error("Error linking user word:", error);
      throw new Error("Failed to link user word.");
    }
  }

  async linkUserHavedWord(token: string, wordName: string): Promise<void> {
    try {
      const weights = '[]';
      const days = '[]';
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      console.log("currentDate", currentDate);
      const newDate = currentDate.toISOString().slice(0, 10);
      console.log("newDate", newDate);
      const word = await this.wordService.getWordByName(token, wordName);
      if (!word) {
        throw new Error(`Word '${wordName}' not found.`);
      }
      const wordId = word.id;
      if (wordId === undefined) {
        throw new Error(`Word '${wordName}' has no ID.`);
      }
      await this.userService.linkUserWord(token, wordId, weights, days, newDate);
    } catch (error) {
      console.error("Error linking user word:", error);
      throw new Error("Failed to link user word.");
    }
  }

  async updateLinkedUserWord(token: string, wordId: number, weights: string, days: string, newDate:string): Promise<void> {
    try {
      await this.userService.updateLinkedUserWord(token, wordId, weights, days, newDate);
    } catch (error) {
      console.error("Error updating linked user word:", error);
      throw new Error("Failed to update linked user word.");
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

  async getUserWord(token: string):Promise<any> {
    try {
      return  this.userService.getUserWord(token);
    } catch (error) {
      console.error("Error fetching user word:", error);
      throw new Error("Failed to fetch user word.");
    }
  }
}
