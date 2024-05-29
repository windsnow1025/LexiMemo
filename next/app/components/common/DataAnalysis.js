import React, {useState, useEffect, useRef} from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import { UserLogic } from '../../../src/logic/UserLogic';
import { ChatLogic } from '../../../src/logic/ChatLogic';
import Typography from "@mui/material/Typography";
import {parseMarkdown} from "../../../src/util/MarkdownParser";

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

    async function updateMessage() {
        markdownRef.current.innerHTML = await parseMarkdown(responseMessage, false);
    }

    useEffect( () => {
        updateMessage();
    }, [responseMessage]);

    useEffect(() => {
        async function fetchChartData() {
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

        const generateParagraph = async () => {
            const chatLogic = new ChatLogic();
            try {
                const message = await chatLogic.generateVocabsParagraph();
                console.log(message);
                setResponseMessage(message);
            } catch (error) {
                console.error("Error fetching initial message:", error);
            }
        };

        generateParagraph();
        fetchChartData();
    }, []);

    return (
        <Card sx={{ maxWidth: 1000, p: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardHeader title="单词数据分析" sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 1, height: 500 }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2, textAlign: 'center' }}>
                            记忆曲线
                        </Typography>
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
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 1, overflowY: 'auto' }}>
                    <div
                      className="markdown-body p-2 min-h-16"
                      ref={markdownRef}
                    />
                </Box>
            </Box>
        </Card>
    );
}
