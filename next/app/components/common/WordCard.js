import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { sendPostRequestAndPlayWav } from '../../../src/service/AudioService';
import { UserLogic } from '../../../src/logic/UserLogic';

const WordCard = () => {
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        async function fetchWords() {
            try {
                const userLogic = new UserLogic();
                const token = localStorage.getItem('token');
                const userWords = await userLogic.getUserWord(token);
                console.log("User words:", userWords);
                // Sort words by day in ascending order
                const sortedWords = userWords.sort((a, b) => new Date(a.word.day) - new Date(b.word.day));
                // Limit to first 5 words
                const limitedWords = sortedWords.slice(0, 5);
                console.log("Limited words:", limitedWords);
                setWords(limitedWords);
            } catch (error) {
                console.error("Error fetching user words:", error);
                // Handle error
            }
        }
        fetchWords();
    }, []);

    const handlePlayAudio = (text) => {
        sendPostRequestAndPlayWav(text);
    };

    const handleNextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // All words are finished
            setFinished(true);
        }
    };

    const handleKnow = () => {
        handleNextWord();
    };

    const handleBlur = () => {
        handleNextWord();
    };

    const handleNotKnow = () => {
        handleNextWord();
    };

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    {finished ? (
                        <Typography variant="h5" component="div">
                            今日单词已背完，恭喜你！
                        </Typography>
                    ) : (
                        words.length > 0 && (
                            <Typography variant="h5" component="div">
                                {words[currentIndex].word.word}
                            </Typography>
                        )
                    )}
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                {!finished && (
                    <>
                        <Button size="small" variant="contained" onClick={handleKnow}>
                            认识
                        </Button>
                        <Button size="small" onClick={handleBlur}>
                            模糊
                        </Button>
                        <Button size="small" variant="contained" onClick={handleNotKnow}>
                            不认识
                        </Button>
                    </>
                )}
            </CardActions>
            {!finished && (
                <Button size="small" onClick={() => handlePlayAudio(words[currentIndex].word.word)} sx={{ justifyContent: 'center' }}>
                    <PlayArrowIcon />
                </Button>
            )}
        </Card>
    );
};

export default WordCard;
