import DictionaryService from '../service/DictionaryService';

export class DictionaryLogic {
    private dictionaryService: DictionaryService;

    constructor() {
        this.dictionaryService = new DictionaryService();
    }

    async getDictionaries(token: string) {
        try {
            return await this.dictionaryService.getDictionaries(token);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch dictionaries.');
        }
    }

    async addDictionary(token: string, name: string) {
        try {
            return await this.dictionaryService.addDictionary(token, name);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add dictionary.');
        }
    }

    async getDictionaryWords(token: string, dictionaryId: number) {
        try {
            return await this.dictionaryService.getDictionaryWords(token, dictionaryId);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch dictionary words.');
        }
    }

    async addWordToDictionary(token: string, wordId: number, dictionaryId: number) {
        try {
            return await this.dictionaryService.addWordToDictionary(token, wordId, dictionaryId);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add word to dictionary.');
        }
    }

    async deleteWordFromDictionary(token: string, wordId: number, dictionaryId: number) {
        try {
            return await this.dictionaryService.deleteWordFromDictionary(token, wordId, dictionaryId);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete word from dictionary.');
        }
    }
}
