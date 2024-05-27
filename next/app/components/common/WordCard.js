import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { sendPostRequestAndPlayWav } from '../../../src/service/AudioService';
import { UserLogic } from '../../../src/logic/UserLogic';
import { getNextIntervalFromData } from '../../../src/logic/memory/MemoryLogic';

const WordCard = () => {
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);
    const [showExampleSentence, setShowExampleSentence] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        async function fetchWords() {
            try {
                const userLogic = new UserLogic();
                const token = localStorage.getItem('token');
                const userWords = await userLogic.getUserWord(token);
                console.log("User words:", userWords);
                const sortedWords = userWords.sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate));
                const limitedWords = sortedWords.slice(0, 5).map(wordObj => {
                    return { ...wordObj, companionArray: [], stats: { known: 0, blurred: 0, notKnown: 0 } };
                });
                console.log("Limited words:", limitedWords);
                setWords(limitedWords);
            } catch (error) {
                console.error("Error fetching user words:", error);
            }
        }
        fetchWords();
    }, []);

    const handlePlayAudio = (text) => {
        sendPostRequestAndPlayWav(text);
    };

    const handleNextWord = () => {
        checkConsecutiveOnes(words[0].companionArray);
        if (words.length > 1) {
            setCurrentIndex(0);
            setShowTranslation(false);
            setShowExampleSentence(false);
            setShowNextButton(false);
        } else {
            setFinished(true);
        }
    };

    const handleKnow = () => {
        const updatedWords = [...words];
        updatedWords[0].companionArray.push(1);
        updatedWords[0].stats.known += 1;
        setWords(updatedWords);
        setShowTranslation(true);
        setShowExampleSentence(true);
        if (!finished) setShowNextButton(true);
    };

    const handleBlur = () => {
        const updatedWords = [...words];
        updatedWords[0].companionArray.push(-1);
        updatedWords[0].stats.blurred += 1;
        setWords(updatedWords);
        setShowTranslation(true);
        setShowExampleSentence(true);
        if (!finished) setShowNextButton(true);
    };

    const handleNotKnow = () => {
        const updatedWords = [...words];
        updatedWords[0].companionArray.push(0);
        updatedWords[0].stats.notKnown += 1;
        setWords(updatedWords);
        setShowTranslation(true);
        setShowExampleSentence(true);
        if (!finished) setShowNextButton(true);
    };

    const checkConsecutiveOnes = async (companionArray) => {
        const lastTwo = companionArray.slice(-2);
        if (lastTwo[0] === 1 && lastTwo[1] === 1){
            const { zeros, ones, negatives } = countZerosOnesAndNegatives(companionArray);
            const weightString = words[0].weights;
            const weightArray = JSON.parse(weightString);
            weightArray.push([ones, negatives, zeros]);
            const prevIntervalDays = words[0].days;
            const oldDate = words[0].nextDate;
            const prevIntervalDaysArray = JSON.parse(prevIntervalDays);
            const nextInterval = await getNextIntervalFromData(weightArray, prevIntervalDaysArray);
            const newDate = new Date(oldDate);
            newDate.setDate(newDate.getDate() + nextInterval);
            const updatedNewDate = newDate.toISOString().slice(0, 10);
            prevIntervalDaysArray.push(nextInterval);
            const updatedWeightString = JSON.stringify(weightArray);
            const updatedDaysString = JSON.stringify(prevIntervalDaysArray);
            const token = localStorage.getItem('token');
            const userLogic = new UserLogic();
            userLogic.updateLinkedUserWord(token, words[0].wordId, updatedWeightString, updatedDaysString, updatedNewDate);
            setSnackbarMessage("下次背诵时间：" + updatedNewDate);
            setSnackbarOpen(true);
            const updatedWords = words.filter((word, index) => index !== currentIndex);
            setWords(updatedWords);
            setCurrentIndex(0);
        } else {
            const randomIndex = Math.floor(Math.random() * (words.length - currentIndex)) + currentIndex;
            const updatedWords = [...words];
            const currentWord = updatedWords[0];
            updatedWords.splice(0, 1);
            updatedWords.splice(randomIndex, 0, currentWord);
            setWords(updatedWords);
        }
    };

    const countZerosOnesAndNegatives = (companionArray) => {
        const count = companionArray.reduce((acc, currentValue) => {
            if (currentValue === 0) {
                acc.zeros++;
            } else if (currentValue === 1) {
                acc.ones++;
            } else if (currentValue === -1) {
                acc.negatives++;
            }
            return acc;
        }, { zeros: 0, ones: 0, negatives: 0 });

        return count;
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
      <>
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
                                {words[0]?.word?.word}
                            </Typography>
                            {showTranslation && (
                              <Typography variant="body1" component="div">
                                  翻译: {words[0]?.word?.translation}
                              </Typography>
                            )}
                            {showExampleSentence && (
                              <Typography variant="body1" component="div">
                                  例句: {words[0]?.word?.exampleSentence}
                              </Typography>
                            )}
                            <Typography variant="body2" component="div">
                                记住: {words[0]?.stats?.known} 次 | 模糊: {words[0]?.stats?.blurred} 次 | 忘记: {words[0]?.stats?.notKnown} 次
                            </Typography>
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
              <Button size="small" onClick={() => handlePlayAudio(words[0]?.word?.word)} sx={{ justifyContent: 'center' }}>
                  <PlayArrowIcon />
              </Button>
          </Card>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <MuiAlert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                  {snackbarMessage}
              </MuiAlert>
          </Snackbar>
      </>
    );
};

export default WordCard;
