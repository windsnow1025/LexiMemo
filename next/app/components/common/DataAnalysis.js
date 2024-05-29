import React, {useState, useEffect, useRef} from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import { UserLogic } from '../../../src/logic/UserLogic';
import { ChatLogic } from '../../../src/logic/ChatLogic';

export default function BasicLineChart() {
    const [data, setData] = useState([]);
    const [responseMessage, setResponseMessage] = useState(`
<br>
<br>
<br>
<br>
<h3>数据生成中...</h3>
<br>
<br>
<br>
<br>
    `);

    const markdownRef = useRef(null);

    useEffect(() => {
        markdownRef.current.innerHTML = responseMessage;
    }, [responseMessage]);

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
                const message = await chatLogic.generateVocabsParagraph();
                console.log(message);
                setResponseMessage(message);
            } catch (error) {
                console.error("Error fetching initial message:", error);
            }
        };

        fetchInitialMessage();
        fetchData();
    }, []);

    return (
        <Card sx={{ maxWidth: 1000, p: 2, bgcolor: '#f9f9f9', boxShadow: 3, borderRadius: 2 }}>
            <CardHeader title="单词数据分析" sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: 'white', borderRadius: 2, boxShadow: 1, height: 300 }}>
                    <CardContent sx={{ flex: 1 }}>
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
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: 'white', borderRadius: 2, boxShadow: 1, height: 300, overflowY: 'auto' }}>
                    <CardContent sx={{flex: 1}}>
                        <div
                          className="markdown-body"
                          ref={markdownRef}
                        />
                    </CardContent>
                </Box>
            </Box>
        </Card>
    );
}
