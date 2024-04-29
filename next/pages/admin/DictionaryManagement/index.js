import React from 'react';
import NavBar from '../../../app/components/common/NavBar';
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {useTheme} from "../../../app/hooks/useTheme";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as PropTypes from "prop-types";
import DictionaryListDisplay from '../../../app/components/common/DictionaryList';

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
            <NavBar/>
            <DictionaryListDisplay/>
        </ThemeProvider>
    );
}

export default Index;