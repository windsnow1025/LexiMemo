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
    const [showTranslation, setShowTranslation] = useState(false);
    const [showExampleSentence, setShowExampleSentence] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);

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
            setShowTranslation(false); // Reset translation display
            setShowExampleSentence(false); // Reset example sentence display
            setShowNextButton(false); // Reset next button display
        } else {
            // All words are finished
            setFinished(true);
        }
    };

    const handleKnow = () => {
        setShowTranslation(true);
        setShowExampleSentence(true);
        if (!finished) setShowNextButton(true);
    };

    const handleBlur = () => {
        setShowTranslation(true);
        setShowExampleSentence(true);
        if (!finished) setShowNextButton(true);
    };

    const handleNotKnow = () => {
        setShowTranslation(true);
        setShowExampleSentence(true);
        if (!finished) setShowNextButton(true);
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
                        <>
                            <Typography variant="h5" component="div">
                                {words[currentIndex]?.word?.word}
                            </Typography>
                            {showTranslation && (
                                <Typography variant="body1" component="div">
                                    翻译: {words[currentIndex]?.word?.translation}
                                </Typography>
                            )}
                            {showExampleSentence && (
                                <Typography variant="body1" component="div">
                                    例句: {words[currentIndex]?.word?.exampleSentence}
                                </Typography>
                            )}
                        </>
                    )}
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                {!finished && !showNextButton && (
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
                {showNextButton && (
                    <Button size="small" variant="contained" onClick={handleNextWord}>
                        下一个
                    </Button>
                )}
            </CardActions>
            <Button size="small" onClick={() => handlePlayAudio(words[currentIndex]?.word?.word)} sx={{ justifyContent: 'center' }}>
                <PlayArrowIcon />
            </Button>
        </Card>
    );
};

export default WordCard;
