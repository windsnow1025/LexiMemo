'use client';

import '../src/asset/css/index.css';
import {ThemeProvider} from "@mui/material/styles";
import React, {useEffect} from "react";
import {useTheme} from "../app/hooks/useTheme";
import {CssBaseline, Button, Fab} from "@mui/material";
import WordCard from "../app/components/common/WordCard";
import Box from "@mui/material/Box";
import NavBarUser from "../app/components/common/NavBarUser"
import NavigationIcon from '@mui/icons-material/Navigation';
import {Link} from "react-router-dom";

function Index() {
    const theme = useTheme();

    useEffect(() => {
        document.title = "LexiMemo";
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <NavBarUser />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <WordCard />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '20px' }}>
                <Button variant="contained" href='/user/modify-your-words' sx={{ marginRight: '20px' }}>词库管理</Button>
                <Button variant="contained" href='/user/data-analysis'>数据分析</Button>
            </Box>
        </ThemeProvider>
    );
}

export default Index;
