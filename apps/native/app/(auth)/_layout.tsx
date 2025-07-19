import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login/index"
        options={{
          title: "Login",
          headerTitle: "Login",
        }}
      />
      <Stack.Screen
        name="sign-in/index"
        options={{
          title: "Sign In",
          headerTitle: "Sign In",
        }}
      />
    </Stack>
  );
}
