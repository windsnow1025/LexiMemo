import axios, { AxiosInstance } from 'axios';
import { Word } from "../model/Word";

export default class WordService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_NODE_API_BASE_URL });
    }

    async getWords(token: string): Promise<Word[]> {
        try {
            const res = await this.axiosInstance.get("/words", {
                headers: { Authorization: token }
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching words:", error);
            throw new Error("Failed to fetch words.");
        }
    }

    async getWordByName(token: string, word: string): Promise<Word> {
        try {
            const res = await this.axiosInstance.get("/word", {
                params: { word },
                headers: { Authorization: token }
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching word by name:", error);
            throw new Error("Failed to fetch word by name.");
        }
    }

    async getWordById(token: string, id: number): Promise<Word> {
        try {
            const res = await this.axiosInstance.get(`/word/${id}`, {
                headers: { Authorization: token }
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching word by ID:", error);
            throw new Error("Failed to fetch word by ID.");
        }
    }

    async addWord(token: string, word: Word | Word[]) {
        try {
            const res = await this.axiosInstance.post("/words", word, {
                headers: { Authorization: token, 'Content-Type': 'application/json' }
            });
            return res.data;
        } catch (error) {
            console.error("Error adding word:", error);
            throw new Error("Failed to add word.");
        }
    }

    async deleteWordById(token: string, id: number) {
        try {
            await this.axiosInstance.delete(`/word/${id}`, {
                headers: { Authorization: token, 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error("Error deleting word by ID:", error);
            throw new Error("Failed to delete word by ID.");
        }
    }
}
