import WordService from "../service/WordService";

export class WordLogic {
    constructor() {
        this.wordService = new WordService();
    }

    async getWords(token) {
        try {
            return await this.wordService.getWords(token);
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch words.");
        }
    }

    async getWordByName(token, word) {
        try {
            return await this.wordService.getWordByName(token, word);
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch word by name.");
        }
    }

    async getWordById(token, id) {
        try {
            return await this.wordService.getWordById(token, id);
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch word by ID.");
        }
    }

    async addWord(token, word, translation, exampleSentence, frequency) {
        try {
            await this.wordService.addWord(token, word, translation, exampleSentence, frequency);
        } catch (err) {
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
