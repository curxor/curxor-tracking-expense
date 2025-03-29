import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { Text, View, Image } from "react-native";
interface BalanceProps {
  balance: number;
}
const Balance: React.FC<BalanceProps> = ({ balance }) => {
  // return (
  //   <View className="my-2">
  //     <Image
  //     className="w-40 h-40 mx-auto"
  //       source={{
  //         uri: "https://wallet.pointer.io.vn/assets/auth_img-DqywpUJV.png",
  //       }}
  //     />

  //     <Text className="text-center font-semibold text-5xl my-5">
  //       {formatCurrency(balance, "VND", "vn-VN")}
  //     </Text>
  //   </View>
  // );
  return (
    <View className="my-2" data-testid="balance-container">
      {/* Thêm data-testid cho hình ảnh */}
      <Image
        className="w-40 h-40 mx-auto"
        source={{
          uri: "https://wallet.pointer.io.vn/assets/auth_img-DqywpUJV.png",
        }}
        data-testid="balance-image"
      />

      {/* Thêm data-testid cho giá trị số dư */}
      <Text
        className="text-center font-semibold text-5xl my-5"
        data-testid="balance-value"
      >
        {formatCurrency(balance, "VND", "vn-VN")}
      </Text>
    </View>
  );
};

export default Balance;
