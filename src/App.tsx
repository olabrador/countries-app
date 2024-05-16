import { useEffect, useState } from "react";
import "./App.css";
import apiCalls from "./services";
import { Country } from "./types";
import { Button, Flex } from "@aws-amplify/ui-react";
import List from "./components/List";
import CountriesTable from "./components/Table";

function App() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Country[]>([]);
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
    const alreadySelected = selected.some((c) => c.id === country.id);
    if (alreadySelected) {
      const newSelected = selected.filter((c) => c.id !== country.id);
      setSelected(newSelected);
      return;
    }

    setSelected([...selected, country]);
  }
  return (
    <Flex wrap="wrap" justifyContent="center" margin="1rem">
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
      <Flex direction="column" alignItems="center" flex="2" width="100%">
        <CountriesTable countries={selected} />
        <Button alignSelf="flex-end" onClick={() => window.print()}>
          Download PDF
        </Button>
      </Flex>
    </Flex>
  );
}

export default App;
