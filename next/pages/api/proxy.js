import axios from 'axios';

export default async function handler(req, res) {
    const url = 'http://48d1p74958.qicp.vip:9880';
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    try {
        const response = await axios.post(url, req.body, { headers: headers });

        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(response.status).send(response.data);
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}