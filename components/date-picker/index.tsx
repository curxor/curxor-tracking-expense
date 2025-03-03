// src/components/MonthYearPicker.tsx
import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface MonthYearPickerProps {
  visible: boolean;
  date: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
  minYear?: number;
  maxYear?: number;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  visible,
  date,
  onChange,
  onClose,
  minYear = 2000,
  maxYear = new Date().getFullYear() + 10,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(date.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(date.getFullYear());

  useEffect(() => {
    // cập nhật khi props date thay đổi
    setSelectedMonth(date.getMonth());
    setSelectedYear(date.getFullYear());
  }, [date]);

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1);
    onChange(newDate);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Select Month and Year</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMonth}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            >
              {Array.from({ length: 12 }, (_, index) => (
                <Picker.Item
                  key={index}
                  label={new Date(0, index).toLocaleString("default", {
                    month: "long",
                  })}
                  value={index}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedYear}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedYear(itemValue)}
            >
              {Array.from({ length: maxYear - minYear + 1 }, (_, index) => {
                const year = minYear + index;
                return (
                  <Picker.Item
                    key={year}
                    label={year.toString()}
                    value={year}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  button: {
    padding: 10,
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#007AFF",
  },
  confirmButtonText: {
    color: "white",
  },
});

export default MonthYearPicker;
