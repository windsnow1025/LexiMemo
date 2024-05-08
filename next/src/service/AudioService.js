import axios from 'axios';

const sendPostRequestAndPlayWav = async (text) => {
    const url = 'http://48d1p74958.qicp.vip:9880';
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    const data = {
        text: text,
        text_language: 'zh',
    };

    try {
        const response = await axios.post(url, data, {
            headers: headers,
            responseType: 'arraybuffer',
        });

        console.log('Response data:', response.data);
        console.log('Response data length:', response.data.byteLength);

        if (response.status === 200) {
            // Convert response data to ArrayBuffer
            const arrayBuffer = response.data;

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const audioSource = audioContext.createBufferSource();
            audioSource.buffer = audioBuffer;
            audioSource.connect(audioContext.destination);
            audioSource.start(0);
        } else {
            console.error('Error:', response.status);
            console.error(response.data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export { sendPostRequestAndPlayWav };
