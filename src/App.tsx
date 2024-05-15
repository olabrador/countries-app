import { useEffect, useState } from "react";
import "./App.css";
import apiCalls from "./services";
import { Country } from "./types";
import { View } from "@aws-amplify/ui-react";
import List from "./components/List";

function App() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const result = await apiCalls.getCountryInformation(page);
      setCountries(result.data);
      setTotalPages(
        Math.ceil(result.metadata.total_registers / result.metadata.rows)
      );
      setLoading(false);
    };

    fetchCountries();
  }, [page]);
  const handlePageChange = (newPage?: number) => {
    setPage(newPage || 1);
  };
  const handleSelection = (country: Country) => {
    if (selected.has(country.id)) {
      selected.delete(country.id);
    } else {
      selected.add(country.id);
    }
    setSelected(new Set(selected));
  }
  return (
    <View>
      <List
        handleSelection={handleSelection}
        countries={countries}
        currentPage={page}
        totalPages={totalPages}
        hasMorePages={page < totalPages}
        onPageChange={handlePageChange}
        loading={loading}
        selected={selected}
      />
    </View>
  );
}

export default App;
