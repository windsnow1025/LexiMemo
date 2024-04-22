import axios from 'axios';

export default class DictionaryService {
    constructor() {
        this.axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_NODE_API_BASE_URL });
    }

    async getDictionaries(token) {
        try {
            const response = await this.axiosInstance.get('/dictionaries', {
                headers: { Authorization: token }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch dictionaries:', error);
            throw new Error('Failed to fetch dictionaries.');
        }
    }

    async addDictionary(token, name) {
        try {
            const response = await this.axiosInstance.post('/dictionary', { name }, {
                headers: { Authorization: token, 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to add dictionary:', error);
            throw new Error('Failed to add dictionary.');
        }
    }

    async getDictionaryWords(token, dictionaryId) {
        try {
            const response = await this.axiosInstance.get(`/dictionary/${dictionaryId}`, {
                headers: { Authorization: token }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch dictionary words:', error);
            throw new Error('Failed to fetch dictionary words.');
        }
    }

    async addWordToDictionary(token, wordName, dictionaryName) {
        try {
            const response = await this.axiosInstance.post('/dictionary/add', { wordName, dictionaryName }, {
                headers: { Authorization: token, 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to add word to dictionary:', error);
            throw new Error('Failed to add word to dictionary.');
        }
    }
}
