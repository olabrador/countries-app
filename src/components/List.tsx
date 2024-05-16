import {
  Collection,
  Flex,
  Heading,
  Pagination,
  Text,
  View,
} from "@aws-amplify/ui-react";
import { Country } from "../types";
import ListItem from "./ListItem";
import { useCallback, useMemo } from "react";

export interface ListProps {
  countries: Country[];
  currentPage: number;
  totalPages: number;
  hasMorePages: boolean;
  onPageChange: (page?: number) => void;
  loading: boolean;
  handleSelection: (country: Country) => void;
  selected: Country[];
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
  const handleNext = useCallback(() => {
    if (hasMorePages) {
      onPageChange(currentPage + 1);
    }
  }, [hasMorePages, onPageChange, currentPage]);
  const contents = useMemo(() => {
    if (!countries.length) {
      return (
        <Text fontSize="1rem" textAlign="center">No countries to select</Text>
      );
    }

    return (
      <>
        <Collection
          marginTop="10px"
          marginBottom="10px"
          type="list"
          items={countries}
          direction="column"
          isDisabled={loading}
        >
          {(country: Country, index: number) => (
            <ListItem
              key={index}
              country={country}
              loading={loading}
              selected={selected}
              handleSelection={handleSelection}
            />
          )}
        </Collection>
        <Pagination
          isDisabled={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          hasMorePages={hasMorePages}
          onChange={onPageChange}
          onNext={handleNext}
          onPrevious={() => onPageChange(currentPage - 1)}
        />
      </>
    );
  }, [
    countries,
    handleNext,
    currentPage,
    handleSelection,
    hasMorePages,
    loading,
    onPageChange,
    selected,
    totalPages,
  ]);
  return (
    <Flex direction="column" alignItems="center" flex="1">
      <View>
        <Heading level={3} textAlign="center">Choose Country</Heading>
        {contents}
      </View>
    </Flex>
  );
}

export default List;
