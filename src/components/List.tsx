import {
  Button,
  Collection,
  Heading,
  Pagination,
  View,
} from "@aws-amplify/ui-react";
import { Country } from "../types";
import "./List.css";

export interface ListProps {
  countries: Country[];
  currentPage: number;
  totalPages: number;
  hasMorePages: boolean;
  onPageChange: (page?: number) => void;
  loading: boolean;
  handleSelection: (country: Country) => void;
  selected: Set<number>;
}

function List({
  countries = [],
  currentPage,
  totalPages,
  hasMorePages,
  onPageChange,
  loading,
  handleSelection,
  selected,
}: ListProps) {
  const handleNext = () => {
    if (hasMorePages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <View width="33%" height="100%" className="container">
      <Heading level={3}>Choose Country</Heading>
      <Collection
        marginTop="20px"
        type="list"
        items={countries}
        direction="column"
        isDisabled={loading}
      >
        {(country: Country, index: number) => (
          <Button
            disabled={loading}
            key={index}
            onClick={() => handleSelection(country)}
            className={selected.has(country.id) ? "selected" : ""}
          >
            {country.country_name}
          </Button>
        )}
      </Collection>
      <Pagination
        marginTop="20px"
        isDisabled={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        hasMorePages={hasMorePages}
        onChange={onPageChange}
        onNext={handleNext}
        onPrevious={() => onPageChange(currentPage - 1)}
      />
    </View>
  );
}

export default List;
