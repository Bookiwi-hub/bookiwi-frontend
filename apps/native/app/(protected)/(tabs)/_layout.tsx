import { Tabs } from "expo-router";

// import { useColorScheme } from "@/hooks/use-color-scheme";

import { Library, UserRound } from "@/lib/icons";
import { mainColor } from "@bookiwi/color";

export default function TabLayout() {
  // const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: mainColor,
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
