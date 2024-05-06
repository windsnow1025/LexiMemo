import {Word} from "@/model/Word";

export class Dictionary {
  id?: number;
  name: string = '';
  words: Word[] = [];

  constructor(id?: number, name: string = '', words: Word[] = []) {
    this.id = id;
    this.name = name;
    this.words = words;
  }
}
