import { ActivityIndicator, Button, Text, View } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import { Country } from "../types";
import ListItem from "../components/Listitem";
import { useState } from "react";
import useCountries from "../services";
import Pagination from "../components/Pagination";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";
import { useSelected } from "../context/countries";

type ListProps = NativeStackScreenProps<RootStackParamList, 'List'>;

function EmptyListContent() {
  return (
    <Text style={styles.emptyTitle}>No countries to select</Text>
  );
}

export default function List({
  navigation,
}: ListProps) {
  const { selected, setSelected } = useSelected();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { countries, totalPages } = useCountries({ page, setLoading });
  const handleSelection = (country: Country) => {
    const alreadySelected = selected.some((c) => c.id === country.id);
    if (alreadySelected) {
      const newSelected = selected.filter((c) => c.id !== country.id);
      setSelected(newSelected);
      return;
    }

    setSelected([...selected, country]);
  }
  const onShowData = () => {
    navigation.navigate('Table');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Countries</Text>
        <ActivityIndicator style={styles.loader} size={60} color="#0000ff" />
        <Pagination
          loading={loading}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
        <Button color="#0f66d8" title="See Data" disabled={loading || !selected.length} onPress={onShowData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Countries</Text>
      <FlatList
        style={styles.list}
        ListEmptyComponent={<EmptyListContent />}
        data={countries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            country={item}
            loading={loading}
            selected={selected}
            handleSelection={handleSelection}
          />
        )}
      />
      <Pagination
        loading={loading}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
      <Button color="#0f66d8" title="See Data" onPress={onShowData} disabled={loading || !selected.length} />
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: '70%',
    width: '80%',
  },
  loader: {
    height: '70%'
  },
});
