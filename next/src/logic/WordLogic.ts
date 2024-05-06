import WordService from "../service/WordService";
import {Word} from "../model/Word";

export class WordLogic {
    private wordService: WordService;

    constructor() {
        this.wordService = new WordService();
    }

    async getWords(token: string): Promise<Word[]> {
        try {
            return await this.wordService.getWords(token);
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch words.");
        }
    }

    async getWordByName(token: string, word: string): Promise<Word> {
        try {
            return await this.wordService.getWordByName(token, word);
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch word by name.");
        }
    }

    async getWordById(token: string, id: number): Promise<Word> {
        try {
            return await this.wordService.getWordById(token, id);
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch word by ID.");
        }
    }

    async addWord(token: string, word: string, translation: string, exampleSentence: string, frequency: number) {
        try {
            await this.wordService.addWord(token, word, translation, exampleSentence, frequency);
        } catch (err: any) {
            // Handle specific error based on the thrown error message
            if (err.message === "Insufficient permission to add word") {
                throw new Error("You do not have permission to add words.");
            } else {
                console.error(err);
                throw new Error("Failed to add word.");
            }
        }
    }
}
