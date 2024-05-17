import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Country } from "../types";
import { useMemo } from "react";

export interface ListItemProps {
  country: Country;
  loading: boolean;
  selected: Country[];
  handleSelection: (country: Country) => void;
}

export default function ListItem({
  country,
  loading,
  selected,
  handleSelection,
}: ListItemProps) {
  const isSelected = useMemo(() => selected.some(s => s.id === country.id), [selected, country.id]);
  return (
    <TouchableOpacity
      onPress={() => handleSelection(country)}
      disabled={loading}
      style={[styles.button, isSelected ? styles.selectedButton : {}]}
    >
      <Text style={[styles.text, isSelected ? styles.activeText : {}]}>{country.country_name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedButton: {
    backgroundColor: '#0f66d8',
  },
  text: {
    fontSize: 18,
  },
  activeText: {
    color: '#fff',
  },
});
