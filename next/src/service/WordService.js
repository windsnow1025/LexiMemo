import axios from 'axios';

export default class WordService {
    constructor() {
        this.axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_NODE_API_BASE_URL });
    }

    async getWords(token) {
        try {
            const res = await this.axiosInstance.get("/words", {
                headers: { Authorization: token }
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching words:", error);
            throw error;
        }
    }

    async getWordByName(token, word) {
        try {
            const res = await this.axiosInstance.get("/word", {
                params: { word },
                headers: { Authorization: token }
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching word by name:", error);
            throw error;
        }
    }

    async getWordById(token, id) {
        try {
            const res = await this.axiosInstance.get(`/word/${id}`, {
                headers: { Authorization: token }
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching word by ID:", error);
            throw error;
        }
    }

    async addWord(token, word, translation, exampleSentence, frequency) {
        try {
            const res = await this.axiosInstance.post("/word", {
                word,
                translation,
                exampleSentence,
                frequency
            }, {
                headers: { Authorization: token }
            });
            return res.data;
        } catch (error) {
            console.error("Error adding word:", error);
            throw error;
        }
    }
}
