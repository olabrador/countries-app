import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  loading: boolean;
}

export default function Pagination({ totalPages, currentPage, onPageChange, loading }: PaginationProps) {
  if (totalPages === 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {pages.map(page => (
        <TouchableOpacity disabled={loading} key={page} style={page === currentPage ? styles.activePage : styles.page} onPress={() => onPageChange(page)}>
          <Text style={page === currentPage ? styles.activeText : {}}>{page}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  activePage: {
    margin: 10,
    padding: 10,
    backgroundColor: '#0f66d8',
    borderRadius: 5,
  },
  activeText: {
    color: '#fff',
  },
});
