import WordService from "../service/WordService";
import { Word } from "../model/Word";

export class WordLogic {
    private wordService: WordService;

    constructor() {
        this.wordService = new WordService();
    }

    async getWords(token: string): Promise<Word[]> {
        try {
            return await this.wordService.getWords(token);
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch words.");
        }
    }

    async getWordByName(token: string, word: string): Promise<Word> {
        try {
            return await this.wordService.getWordByName(token, word);
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch word by name.");
        }
    }

    async getWordById(token: string, id: number): Promise<Word> {
        try {
            return await this.wordService.getWordById(token, id);
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch word by ID.");
        }
    }

    async addWord(token: string, word: Word | Word[]) {
        try {
            await this.wordService.addWord(token, word);
        } catch (error) {
            console.error(error);
            throw new Error("Failed to add word.");
        }
    }

    async deleteWordById(token: string, id: number) {
        try {
            await this.wordService.deleteWordById(token, id);
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete word by ID.");
        }
    }
}
