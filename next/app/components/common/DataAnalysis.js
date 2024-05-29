import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { UserLogic } from '../../../src/logic/UserLogic';
import { ChatLogic } from '../../../src/logic/ChatLogic';

export default function BasicLineChart() {
    const [data, setData] = React.useState([]);
    const [initialMessage, setInitialMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const userLogic = new UserLogic();
                const token = localStorage.getItem('token');
                const userWords = await userLogic.getUserWord(token);
                let daysArray = [];

                userWords.forEach(word => {
                    const days = JSON.parse(word.days);
                    if (daysArray.length === 0) {
                        daysArray = days;
                    } else {
                        days.forEach((day, index) => {
                            daysArray[index] = (daysArray[index] || 0) + day;
                        });
                    }
                });

                const invertedData = daysArray.map(day => 1 / day);
                setData(invertedData);
            } catch (error) {
                console.error("Error fetching user words:", error);
            }
        }

        const fetchInitialMessage = async () => {
            const chatLogic = new ChatLogic();
            try {
                const message = await chatLogic.generateVocabsParagraph("");
                console.log(message);
                setInitialMessage(message);
            } catch (error) {
                console.error("Error fetching initial message:", error);
            }
        };

        fetchInitialMessage();
        fetchData();
    }, []);

    return (
        <Card sx={{ maxWidth: 1000 }}>
            <Box sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1, border: '1px solid grey', height: '300px', overflow: 'auto' }}>
                    <LineChart
                        xAxis={[{ data: data.map((_, index) => index + 1) }]}
                        series={[
                            {
                                data: data,
                            },
                        ]}
                        width={500}
                        height={250}
                    />
                </CardContent>
                <CardContent sx={{ flex: 1, border: '1px solid grey', height: '300px', overflow: 'auto' }}>
                    <pre>{initialMessage}</pre>
                </CardContent>
            </Box>
        </Card>
    );
}
