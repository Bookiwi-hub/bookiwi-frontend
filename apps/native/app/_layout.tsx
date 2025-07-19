import {
  Theme,
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "@/global.css";

import { NAV_THEME } from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const [fontsLoaded] = useFonts({
    "nanum-square": require("../assets/fonts/NanumSquareR.ttf"),
    "nanum-square-l": require("../assets/fonts/NanumSquareL.ttf"),
    "nanum-square-b": require("../assets/fonts/NanumSquareB.ttf"),
    "nanum-square-eb": require("../assets/fonts/NanumSquareEB.ttf"),
    "nanum-square-ac-r": require("../assets/fonts/NanumSquare_acR.ttf"),
    "nanum-square-ac-l": require("../assets/fonts/NanumSquare_acL.ttf"),
    "nanum-square-ac-b": require("../assets/fonts/NanumSquare_acB.ttf"),
    "nanum-square-ac-eb": require("../assets/fonts/NanumSquare_acEB.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(protected)/(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(protected)/(stacks)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
          <StatusBar style="auto" />
        </Stack>
      </ThemeProvider>
      <PortalHost />
    </>
  );
}
