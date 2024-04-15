import axios from 'axios';

export default class DictionaryService{
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

}

async function getDictionaries(token) {
    try {
        const response = await axios.get('/dictionaries', {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch dictionaries:', error);
        throw new Error('Failed to fetch dictionaries.');
    }
}
