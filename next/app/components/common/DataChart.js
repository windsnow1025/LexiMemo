import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { UserLogic } from '../../../src/logic/UserLogic';

export default function BasicLineChart() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
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

        fetchData();
    }, []);

    return (
        <Card sx={{ maxWidth: 1000 }}>
            <CardContent>
                <LineChart
                    xAxis={[{ data: data.map((_, index) => index + 1) }]}
                    series={[
                        {
                            data: data,
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
