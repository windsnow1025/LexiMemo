'use client';

import '../src/asset/css/index.css';
import {ThemeProvider} from "@mui/material/styles";
import React, {useEffect} from "react";
import HeaderAppBar from "../app/components/common/HeaderAppBar";
import {useTheme} from "../app/hooks/useTheme";
import {CssBaseline} from "@mui/material";

function Index() {
  const theme = useTheme();

  useEffect(() => {
    document.title = "LexiMemo";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <HeaderAppBar title="LexiMemo"/>
    </ThemeProvider>
  );
}

export default Index;
