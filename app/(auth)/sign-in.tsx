import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Keyboard } from "react-native";
import { z } from "zod";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useSignIn } from "@/hooks/auth.hook";
import LoginWith from "@/components/button/login-button";

const emailSchema = z.string().email({ message: "Invalid email address" });

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSignIn();
  const router = useRouter();

  const onChange = (value: string) => {
    setEmail(value.toLowerCase());
  };

  const onSubmit = () => {
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        Toast.show({
          type: "error",
          text1: "Invalid email address",
        });
        return;
      }
    }

    mutate(email, {
      onError: (e: any) => {
        Toast.show({
          type: "error",
          text1: e.response.data.message,
        });
      },
      onSuccess: () => {
        router.push({
          pathname: "/(auth)/verify",
          params: { email },
        });
      },
    });

    Keyboard.dismiss();
  };

  return (
    <SafeAreaView className="w-full bg-white h-full">
      <View className="p-2 bg-white h-full mx-auto max-w-[500px] mt-24 w-full">
        <View className="z-10">
          <Toast />
        </View>
        <Text className="text-center z-0 text-4xl mt-5 font-semibold mb-5">
          Curxor Tracking 🌊
        </Text>
        <Text className="text-center z-0 text-sm mt-5 font-semibold mb-5">
          The best way to track your expenses with AI 🚀
        </Text>
        <View className="space-y-10">
          <Input
            iconName="user"
            placeholder="Email"
            onChangeText={onChange}
            value={email}
            onSubmitEditing={onSubmit}
          />
          <Button
            className="mt-2"
            isLoading={isPending}
            onPress={onSubmit}
            title="Sign In"
          />
          <View className="mx-auto flex-row mt-2">
            <LoginWith icon="google" href="https://www.reddit.com/" />
            <LoginWith icon="github" href="https://www.reddit.com/" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
