import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import HistoryItem from "@/components/history/item";
import {
  Transaction,
  useGetTransactionsInfinity,
} from "@/hooks/transaction.hook";
import { useGetCategories } from "@/hooks/category.hook";
import DropDownPicker from "react-native-dropdown-picker";
import Input from "@/components/input/input";
import MonthYearPicker from "@/components/date-picker";
import Feather from "react-native-vector-icons/Feather";

const TransactionScreen: React.FC = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amountFilter, setAmountFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data: categories } = useGetCategories();

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

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTransactionsInfinity({
      search: searchQuery,
      category: selectedCategory,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      minAmount: amountFilter ? parseFloat(amountFilter) : undefined,
    });

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

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setAmountFilter("");
    setSelectedDate(new Date());
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
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Feather
            name={showFilters ? "x" : "filter"}
            size={24}
            color="#007AFF"
          />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filterContainer}>
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="mb-2"
          />

          <View style={styles.datePickerContainer}>
            <Text style={styles.filterLabel}>Date Range</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <MonthYearPicker
              visible={showDatePicker}
              date={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowDatePicker(false);
              }}
              onClose={() => setShowDatePicker(false)}
            />
          )}

          <View style={[styles.dropdownContainer, { zIndex: 2000 }]}>
            <Text style={styles.filterLabel}>Category</Text>
            <DropDownPicker
              open={categoryOpen}
              value={selectedCategory}
              items={
                categories?.data?.map((cat: any) => ({
                  label: cat.name,
                  value: cat._id,
                })) || []
              }
              setOpen={setCategoryOpen}
              setValue={setSelectedCategory}
              placeholder="Select category"
              style={styles.dropdown}
            />
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.filterLabel}>Minimum Amount</Text>
            <Input
              placeholder="Enter amount"
              value={amountFilter}
              onChangeText={setAmountFilter}
              keyboardType="numeric"
              className="mb-2"
            />
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}

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

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
  },
  filterButton: {
    padding: 8,
  },
  filterContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#666",
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  dateButton: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 8,
  },
  amountContainer: {
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: "#ff3b30",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default TransactionScreen;
