import React, { useState, useEffect } from 'react';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { ChatLogic } from '../../../src/logic/ChatLogic';

export default function BasicLineChart() {
    const [initialMessage, setInitialMessage] = useState('');

    useEffect(() => {
        const fetchInitialMessage = async () => {
            const chatLogic = new ChatLogic();
            try {
                const message = await chatLogic.generateVocabsParagraph("");
                setInitialMessage(message);
            } catch (error) {
                console.error("Error fetching initial message:", error);
            }
        };

        fetchInitialMessage();
    }, []);

    return (
        <Card sx={{ maxWidth: 1000 }}>
            <CardContent>
                <pre>{initialMessage}</pre>
            </CardContent>
        </Card>
    );
}
