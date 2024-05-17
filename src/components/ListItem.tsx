import { Button } from "@aws-amplify/ui-react";
import { Country } from "../types";
import { useMemo } from "react";
import "./ListItem.css";

export interface ListItemProps {
  country: Country;
  loading: boolean;
  selected: Country[];
  handleSelection: (country: Country) => void;
}

function ListItem({ country, loading, selected, handleSelection }: ListItemProps) {
  const isSelected = useMemo(() => selected.some(s => s.id === country.id), [selected, country.id]);
  return (
    <Button
      disabled={loading}
      onClick={() => handleSelection(country)}
      className={`${isSelected ? "selected" : ""}`}
      width="80%"
    >
      {country.country_name}
    </Button>
  );
}

export default ListItem;
