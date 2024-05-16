// Table is exported but the type definitions for the package @aws-amplify/ui-react are missing.
// @ts-ignore
import { Heading, TableBody, TableCell, TableHead, TableRow, Table, View } from "@aws-amplify/ui-react";
import { Country } from "../types";
import { useMemo } from "react";

export interface CountriesTableProps {
  countries: Country[];
}

function CountriesTable({ countries }: CountriesTableProps) {
  const tableBody = useMemo(() => {
    if (!countries.length) {
      return (
        <TableRow>
          <TableCell colSpan={6} textAlign="center">Select countries to compare</TableCell>
        </TableRow>
      );
    }

    return (
      <>
        {countries.map((country, index) => (
          <TableRow key={index}>
            <TableCell>{country.country_name}</TableCell>
            <TableCell>{country.performance_oriented}</TableCell>
            <TableCell>{country.autocratic}</TableCell>
            <TableCell>{country.decisive}</TableCell>
            <TableCell>{country.modesty}</TableCell>
            <TableCell>{country.charisma}</TableCell>
          </TableRow>
        ))}
      </>
    );
  }, [countries]);
  return (
    <View width="100%">
      <Heading level={3} textAlign="center">Data</Heading>
      <Table marginTop="10px" highlightOnHover={true} variation="striped">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Performance</TableCell>
            <TableCell>Autocratic</TableCell>
            <TableCell>Desicive</TableCell>
            <TableCell>Diplomatic</TableCell>
            <TableCell>Charisma</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody}
        </TableBody>
      </Table>
    </View>
  );
}

export default CountriesTable;
