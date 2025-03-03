import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import HistoryItem from "@/components/history/item";
import {
  Transaction,
  useGetTransactionsInfinity,
} from "@/hooks/transaction.hook";

const TransactionScreen: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTransactionsInfinity("");

  const transactions: Transaction[] = data
    ? data.pages.flatMap((page: any) => page.data.transactions)
    : [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{ padding: 16, flexDirection: "row", backgroundColor: "#fff" }}
      >
        <Text style={{ fontWeight: "600", fontSize: 24 }}>History</Text>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <HistoryItem
            _id={item._id}
            amount={item.amount}
            createdAt={item.createdAt}
            type={item.category?.name || "Undefined"}
            description={item.description}
            icon={item.category?.icon || "X"}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default TransactionScreen;
