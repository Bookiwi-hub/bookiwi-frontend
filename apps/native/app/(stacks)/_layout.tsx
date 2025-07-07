import { Stack, useRouter } from "expo-router";

// import { useColorScheme } from "@/hooks/use-color-scheme";

import { ArrowLeft } from "@/lib/icons/arrow-left";
import { mainColor } from "@bookiwi/color";

export default function StackLayout() {
  // const { isDarkColorScheme } = useColorScheme();

  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <ArrowLeft color={mainColor} onPress={() => router.back()} />
        ),
      }}
    >
      <Stack.Screen
        name="create-kiwi/index"
        options={{
          title: "Create Kiwi",
          headerTitle: "Create Kiwi",
        }}
      />
      <Stack.Screen
        name="kiwi-details/[kiwi]"
        options={{
          title: "Kiwi Details",
          headerTitle: "Kiwi Details",
        }}
      />
    </Stack>
  );
}
