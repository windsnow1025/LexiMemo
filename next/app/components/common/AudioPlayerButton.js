import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import axios from 'axios';

const AudioPlayerButton = ({ text }) => {
    const [audioBlob, setAudioBlob] = useState(null);

    const handlePlayAudio = async () => {
        const url = '/api/proxy';
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
                responseType: 'blob', // 设置响应类型为 blob
            });

            if (response.status === 200) {
                setAudioBlob(response.data); // 将响应的音频数据存储在状态中
            } else {
                console.error('Error:', response.status);
                console.error(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Button size="small" onClick={handlePlayAudio} sx={{ justifyContent: 'center' }}>
                <PlayArrowIcon />
            </Button>
            {/* 播放音频的组件 */}
            {audioBlob && (
                <ReactAudioPlayer
                    src={URL.createObjectURL(audioBlob)} // 将音频 Blob 转换为 URL
                    autoPlay
                    controls
                />
            )}
        </div>
    );
};

export default AudioPlayerButton;
