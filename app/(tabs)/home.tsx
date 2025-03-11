import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Button } from "react-native";
import MonthYearPicker from "@/components/date-picker"; // Component MonthYearPicker của bạn
import HistoryItem from "@/components/history/item";
import Balance from "@/components/statictis/balance";
import Total from "@/components/statictis/total";
import { useGetProfile } from "@/hooks/auth.hook";
import { useGetTransactions } from "@/hooks/transaction.hook";

const HomeScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const startDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const endDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const { data: dataUser, isLoading: isLoadingUser } = useGetProfile(
    formatDate(startDate),
    formatDate(endDate)
  );

  const { data, isLoading } = useGetTransactions({
    limit: 10,
    page: 1,
    search: "",
  });

  const onValueChange = (newDate: Date) => {
    setSelectedDate(newDate);
    setShowPicker(false);
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <SafeAreaView>
        <View style={{ backgroundColor: "white", padding: 16 }}>
          <Text style={{ fontWeight: "600", fontSize: 24 }}>Overview</Text>
          <Button
            title={`Select Month: ${selectedDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}`}
            onPress={() => setShowPicker(true)}
          />
          {showPicker && (
            <MonthYearPicker
              visible={showPicker}
              date={selectedDate}
              onChange={onValueChange}
              onClose={() => setShowPicker(false)}
            />
          )}
        </View>
        {!isLoadingUser && <Balance balance={dataUser.balance} />}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {!isLoadingUser && (
            <>
              <Total
                icon="smile"
                name="Total income this month"
                value={dataUser.income}
              />
              <Total
                icon="alert-circle"
                name="Total expense this month"
                value={dataUser.expense}
              />
            </>
          )}
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            borderRadius: 10,
            margin: 16,
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: 8 }}>
            Latest Entries
          </Text>
          {!isLoading &&
            data.data.transactions.map((item: any) => (
              <HistoryItem
                key={item._id}
                _id={item._id}
                amount={item.amount}
                createdAt={item.createdAt}
                type={item.category?.name}
                description={item.description}
                icon={item.category?.icon}
              />
            ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
