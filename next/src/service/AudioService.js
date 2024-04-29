import axios from 'axios';
const sendPostRequestAndPlayWav = async (text) => {
    const url = '/api/proxy'; // 使用 API 代理的地址
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

        if (response.status === 200) {
            const audioBlob = new Blob([response.data], { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);

            // 新增从 Blob URL 中获得 ArrayBuffer 的操作
            const arrayBuffer = await (await fetch(audioUrl)).arrayBuffer();

            const audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
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