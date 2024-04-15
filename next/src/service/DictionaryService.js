import axios from 'axios';

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
