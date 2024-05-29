import React from 'react';
import NavBarUser from '../../../app/components/common/NavBarUser';
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {useTheme} from "../../../app/hooks/useTheme";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as PropTypes from "prop-types";
import ModifyYourWords from '../../../app/components/common/ModifyYourWords';
import UserWordsDisplay from '../../../app/components/common/UserWordsDisplay';
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

Item.propTypes = {children: PropTypes.node};

function Index(props) {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <NavBarUser />
            <UserWordsDisplay/>
            <ModifyYourWords/>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '20px' }}>
                <Button variant="contained" href='/user/modify-your-words' sx={{ marginRight: '10px' }}>词库管理</Button>
                <Button variant="contained" color="secondary" href='/' sx={{ marginRight: '10px' }}>返回</Button>
                <Button variant="contained" href='/user/data-analysis' sx={{ marginRight: '10px' }}>数据分析</Button>
            </Box>
        </ThemeProvider>
    );
}

export default Index;