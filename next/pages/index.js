'use client';

import '../src/asset/css/index.css';
import {ThemeProvider} from "@mui/material/styles";
import React, {useEffect} from "react";
import HeaderAppBar from "../app/components/common/HeaderAppBar";
import {useTheme} from "../app/hooks/useTheme";
import {CssBaseline, Button} from "@mui/material";
import WordCard from "../app/components/common/WordCard";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

function Index() {
    const theme = useTheme();

    useEffect(() => {
        document.title = "LexiMemo";
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <HeaderAppBar title="LexiMemo"/>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <WordCard />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Button variant="contained" href='/user/modify-your-words'>词库管理</Button>
            </Box>
        </ThemeProvider>
    );
}

export default Index;
