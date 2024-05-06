import axios, {AxiosInstance} from 'axios';
import {Word} from "../model/Word";

export default class WordService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_NODE_API_BASE_URL});
    }

    async getWords(token: string): Promise<Word[]> {
        try {
            const res = await this.axiosInstance.get("/words", {
                headers: {Authorization: token}
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching words:", error);
            throw error;
        }
    }

    async getWordByName(token: string, word: string): Promise<Word> {
        try {
            const res = await this.axiosInstance.get("/word", {
                params: {word},
                headers: {Authorization: token}
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching word by name:", error);
            throw error;
        }
    }

    async getWordById(token: string, id: number) :Promise<Word> {
        try {
            const res = await this.axiosInstance.get(`/word/${id}`, {
                headers: {Authorization: token}
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching word by ID:", error);
            throw error;
        }
    }

    async addWord(token: string, word: string, translation: string, exampleSentence: string, frequency: number) {
        try {
            const res = await this.axiosInstance.post("/word", {
                word,
                translation,
                exampleSentence,
                frequency
            }, {
                headers: {Authorization: token}
            });
            return res.data;
        } catch (error) {
            console.error("Error adding word:", error);
            throw error;
        }
    }
}
