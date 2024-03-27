import React from 'react';
import NavBar from '../../app/components/common/NavBar';
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {useTheme} from "../../app/hooks/useTheme";
function Index(props) {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <NavBar/>
        </ThemeProvider>
    );
}

export default Index;