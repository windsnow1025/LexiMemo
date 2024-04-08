import WordService from "../service/WordService";

export class WordLogic {
    constructor() {
        this.wordService = new WordService();
    }

    async getWords() {
        try {
            return await this.wordService.getWords();
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch words.");
        }
    }

    async getWord(word) {
        try {
            return await this.wordService.getWord(word);
        } catch (err) {
            console.error(err);
            throw new Error("Failed to fetch word.");
        }
    }

    async addWord(word, translation, exampleSentence, frequency) {
        try {
            await this.wordService.addWord(word, translation, exampleSentence, frequency);
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