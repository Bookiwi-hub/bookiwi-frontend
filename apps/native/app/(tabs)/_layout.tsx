import { Tabs } from "expo-router";

// import { useColorScheme } from "@/hooks/use-color-scheme";

import { Library, UserRound } from "@/lib/icons";

export default function TabLayout() {
  // const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tabs.Screen
        name="(my-kiwis)/index"
        options={{
          title: "My Kiwis",
          tabBarIcon: ({ color }) => <Library color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-page/index"
        options={{
          title: "My Page",
          tabBarIcon: ({ color }) => <UserRound color={color} />,
        }}
      />
    </Tabs>
  );
}
