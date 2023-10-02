import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack, Tabs } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import appTheme from "../constants/theme";
import { COLORS } from "../constants";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//     // Ensure that reloading on `/modal` keeps a back button present.
//     initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="CheckIn"
          options={{
            headerShown: true,
            headerTitle: "Conexão com seu personal trainer",
            headerStyle: {
              backgroundColor: appTheme.COLORS.primary,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
            },
          }}
        />
      
        <Stack.Screen
          name="workout"
          options={{
            headerShown: true,
            title: "Acompanhe seu treino",
            headerStyle: {
              backgroundColor: appTheme.COLORS.primary,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
            },
          }}
        />
        <Stack.Screen
          name="prescricao-especificacao"
          options={{
            headerShown: true,
            title: "Monte seu treino",
            headerStyle: {
              backgroundColor: appTheme.COLORS.primary,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
            }}}
          />
        <Stack.Screen
          name="Comments"
          options={{
            headerShown: true,
            title: "Comentários",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />
        
        <Stack.Screen
          name="Profile"
          options={{
            headerShown: true,
            title: "Perfil",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />
      </Stack>
      
    </ThemeProvider>
  );
}
