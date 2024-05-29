'use client';

import '../../../src/asset/css/index.css';
import {ThemeProvider} from "@mui/material/styles";
import React, {useEffect} from "react";
import {useTheme} from "../../../app/hooks/useTheme";
import {CssBaseline, Button, Fab} from "@mui/material";
import Box from "@mui/material/Box";
import NavBarUser from "../../../app/components/common/NavBarUser"
import DataAnalysis from "../../../app/components/common/DataAnalysis";

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
                <DataAnalysis />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '20px' }}>
                <Button variant="contained" href='/user/modify-your-words' sx={{ marginRight: '10px' }}>词库管理</Button>
                <Button variant="contained" color="secondary" href='/' sx={{ marginRight: '10px' }}>返回</Button>
                <Button variant="contained" href='/user/data-analysis' sx={{ marginRight: '10px' }}>数据分析</Button>
            </Box>
        </ThemeProvider>
    );
}

export default Index;
