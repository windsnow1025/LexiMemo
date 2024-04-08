import axios from 'axios';

export default class WordService {
    constructor() {
        this.axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_NODE_API_BASE_URL });
    }

    async getWords() {
        const token = localStorage.getItem('token');
        const res = await this.axiosInstance.get("/words", {
            headers: { Authorization: token }
        });
        return res.data;
    }

    async getWord(word) {
        const token = localStorage.getItem('token');
        const res = await this.axiosInstance.get("/word", {
            params: { word },
            headers: { Authorization: token }
        });
        return res.data;
    }

    async addWord(word, translation, exampleSentence, frequency) {
        const token = localStorage.getItem('token');
        try {
            const res = await this.axiosInstance.post("/word/add", {
                word,
                translation,
                exampleSentence,
                frequency
            }, {
                headers: { Authorization: token }
            });
            return res.data;
        } catch (error) {
            // Handle error if userType is not admin
            console.error("Insufficient permission to add word");
            throw error; // Re-throw to allow further error handling
        }
    }
}