import 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import 'react-native-gesture-handler'

import {
  useFonts as useSignikaNegative,
  SignikaNegative_400Regular,
} from "@expo-google-fonts/signika-negative";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

export default function App() {
  // Load Fonts
  const [signikaNegativeLoaded] = useSignikaNegative({
    SignikaNegative_400Regular,
  });


  if (!signikaNegativeLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

