import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useAuthVerify } from "@/hooks/auth.hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";
const VerifyScreen = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { mutate, isPending } = useAuthVerify();
  const [otp, setOtp] = useState<string>("");
  const onChange = (value: string) => {
    if (value.length <= 4) {
      setOtp(value);
    }
  };
  const onSubmit = async () => {
    if (!otp) {
      return Toast.show({
        type: "error",
        text1: "OTP is required",
      });
    }
    mutate(
      { email, otp },
      {
        onError: (e: any) => {
          Toast.show({
            type: "error",
            text1: e.response.data.message,
          });
        },
        onSuccess: async (data: any) => {
          await AsyncStorage.setItem("token", data.data.data);
          router.replace({
            pathname: "/(tabs)/home",
            params: { email },
          });
        },
      }
    );
  };
  return (
    <SafeAreaView className="w-full bg-white h-full">
      <View className="p-2 bg-white h-full mx-auto max-w-[500px] mt-24 w-full">
        <View className="z-10">
          <Toast></Toast>
        </View>
        <Text className="text-center text-4xl mt-5 font-semibold mb-5">
          Curxor Tracking Verify🌊
        </Text>
        <Text className="text-center text-md mt-1  ">
          We have sent OTP to your email
        </Text>
        <Text className="text-center text-sm mt-1 font-semibold">{email}</Text>
        <Input
          onSubmitEditing={onSubmit}
          className="text-center"
          placeholder="OTP"
          onChangeText={onChange}
          value={otp}
        ></Input>
        <Button
          isLoading={isPending}
          className="mt-10"
          onPress={onSubmit}
          title="Verify"
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default VerifyScreen;
