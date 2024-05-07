import UserService from "../service/UserService";

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
}
