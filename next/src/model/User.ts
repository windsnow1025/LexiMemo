import {UserWord} from "@/model/UserWord";

export class User {
  id?: number;
  username?: string;
  password: string = '';
  type: string = "normal";
  userWords: UserWord[] = [];

  constructor(id?: number, username?: string, password: string = '', type: string = "normal", userWords: UserWord[] = []) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.type = type;
    this.userWords = userWords;
  }
}