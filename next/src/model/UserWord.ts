import {User} from "@/model/User";
import {Word} from "@/model/Word";

export class UserWord {
  userId?: number;
  wordId: number = 0;
  weights: string = '';
  day: Date = new Date();
  user?: User;
  word?: Word;

  constructor(userId?: number, wordId: number = 0, weights: string = '', day: Date = new Date(), user?: User, word?: Word) {
    this.userId = userId;
    this.wordId = wordId;
    this.weights = weights;
    this.day = day;
    this.user = user;
    this.word = word;
  }
}