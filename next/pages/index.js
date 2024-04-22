'use client';

import '../src/asset/css/index.css';
import {ThemeProvider} from "@mui/material/styles";
import React, {useEffect} from "react";
import HeaderAppBar from "../app/components/common/HeaderAppBar";
import {useTheme} from "../app/hooks/useTheme";
import {CssBaseline} from "@mui/material";
import WordCard from "../app/components/common/WordCard";
import Box from "@mui/material/Box";

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
      </ThemeProvider>

  );
}

export default Index;
