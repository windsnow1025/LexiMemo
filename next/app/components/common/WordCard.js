import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { sendPostRequestAndPlayWav } from '../../../src/service/AudioService';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const WordCard = () => {
    const handlePlayAudio = () => {
        const text = 'test'; // 填入需要发音的文本
        sendPostRequestAndPlayWav(text);
    };

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div" >
                        test
                    </Typography>

                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small" variant="contained">认识</Button>
                <Button size="small" >模糊</Button>
                <Button size="small" variant="contained">不认识</Button>
            </CardActions>
            <Button size="small" onClick={handlePlayAudio} sx={{ justifyContent: 'center' }}>
                <PlayArrowIcon />
            </Button>
        </Card>
    );
};

export default WordCard;
