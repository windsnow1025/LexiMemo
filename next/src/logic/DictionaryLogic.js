import DictionaryService from '../service/DictionaryService';

export class DictionaryLogic {
    constructor() {
        this.dictionaryService = new DictionaryService();
    }

    async getDictionaries(token) {
        try {
            return await this.dictionaryService.getDictionaries(token);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch dictionaries.');
        }
    }

    async addDictionary(token, name) {
        try {
            return await this.dictionaryService.addDictionary(token, name);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add dictionary.');
        }
    }

    async getDictionaryWords(token, dictionaryId) {
        try {
            return await this.dictionaryService.getDictionaryWords(token, dictionaryId);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch dictionary words.');
        }
    }

    async addWordToDictionary(token, wordName, dictionaryName) {
        try {
            return await this.dictionaryService.addWordToDictionary(token, wordName, dictionaryName);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add word to dictionary.');
        }
    }
}
