import { Tabs } from "expo-router";

// import { useColorScheme } from "@/hooks/use-color-scheme";

import { MAIN_COLOR } from "@/constants/colors";
import { Library, UserRound } from "@/lib/icons";

export default function TabLayout() {
  // const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: MAIN_COLOR,
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tabs.Screen
        name="(my-kiwis)/index"
        options={{
          title: "My Kiwis",
          headerShown: false,
          tabBarIcon: ({ color }) => <Library color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-page/index"
        options={{
          title: "My Page",
          headerShown: false,
          tabBarIcon: ({ color }) => <UserRound color={color} />,
        }}
      />
      <Tabs.Screen
        name="(my-kiwis)/[kiwi]/index"
        options={{
          title: "Kiwi",
          headerShown: false,
          tabBarStyle: { display: "none" },
          href: null,
        }}
      />
    </Tabs>
  );
}
