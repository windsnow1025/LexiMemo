import {UserWord} from "@/model/UserWord";
import {Dictionary} from "@/model/Dictionary";

export class Word {
  id?: number;
  word: string = '';
  translation: string = '';
  exampleSentence: string = '';
  frequency: number = 0;
  userWords: UserWord[] = [];
  dictionaries: Dictionary[] = [];

  constructor(id?: number, word: string = '', translation: string = '', exampleSentence: string = '', frequency: number = 0, userWords: UserWord[] = [], dictionaries: Dictionary[] = []) {
    this.id = id;
    this.word = word;
    this.translation = translation;
    this.exampleSentence = exampleSentence;
    this.frequency = frequency;
    this.userWords = userWords;
    this.dictionaries = dictionaries;
  }
}