import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelected } from '../context/countries';

export default function Table() {
  const { selected: data } = useSelected();
  const countriesNames = useMemo(() => data.map(country => country.country_name), [data]);
  const performanceData = useMemo(() => data.map(country => country.performance_oriented), [data]);
  const autocraticData = useMemo(() => data.map(country => country.autocratic), [data]);
  const decisiveData = useMemo(() => data.map(country => country.decisive), [data]);
  return (
    <ScrollView contentContainerStyle={styles.container} horizontal>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.row}>
          <Text style={[styles.headerCell, styles.propertyCell]}></Text>
          {countriesNames.map((name, index) => (
            <Text numberOfLines={1} ellipsizeMode='tail' key={index} style={styles.headerCell}>{name}</Text>
          ))}
        </View>

        {/* Table Rows */}
        <View style={styles.row}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.cell, styles.propertyCell]}>Performance</Text>
          {performanceData.map((performance, index) => (
            <Text numberOfLines={1} ellipsizeMode='tail' key={index} style={styles.cell}>{performance}</Text>
          ))}
        </View>
        <View style={styles.row}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.cell, styles.propertyCell]}>Autocratic</Text>
          {autocraticData.map((autocratic, index) => (
            <Text numberOfLines={1} ellipsizeMode='tail' key={index} style={styles.cell}>{autocratic}</Text>
          ))}
        </View>
        <View style={styles.row}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.cell, styles.propertyCell]}>Decisive</Text>
          {decisiveData.map((decisive, index) => (
            <Text numberOfLines={1} ellipsizeMode='tail' key={index} style={styles.cell}>{decisive}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  table: {
  },
  row: {
    flexDirection: 'row',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#000',
    width: 90,
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000',
    width: 90,
  },
  propertyCell: {
    width: 110,
  },
});
