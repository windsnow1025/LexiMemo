import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function WordCard() {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small">认识</Button>
                <Button size="small">不认识</Button>
            </CardActions>
        </Card>
    );
}
