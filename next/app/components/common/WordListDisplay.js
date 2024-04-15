import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import WordService from '../../../src/service/WordService';

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function WordList() {
    const [words, setWords] = useState([]);
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    useEffect(() => {
        async function fetchWords() {
            try {
                const wordService = new WordService();
                const fetchedWords = await wordService.getWords();
                setWords(fetchedWords);
            } catch (error) {
                console.error('Error fetching words:', error);
            }
        }

        fetchWords();
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={dense}
                            onChange={(event) => setDense(event.target.checked)}
                        />
                    }
                    label="Enable dense"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={secondary}
                            onChange={(event) => setSecondary(event.target.checked)}
                        />
                    }
                    label="Enable secondary text"
                />
            </FormGroup>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Text only
                    </Typography>
                    <Demo>
                        <List dense={dense}>
                            {words.map((word, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={word}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Icon with text
                    </Typography>
                    <Demo>
                        <List dense={dense}>
                            {words.map((word, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={word}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
}
