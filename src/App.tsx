import { useRef, useState } from "react";
import "./App.css";
import { Country } from "./types";
import { Button, Flex } from "@aws-amplify/ui-react";
import List from "./components/List";
import CountriesTable from "./components/Table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AlertProvider from "./context";
import useCountries from "./services";

function ViewCountries() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Country[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const { countries, totalPages } = useCountries({ page, setLoading });
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

  const downloadPDF = () => {
    html2canvas(tableRef.current!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
  
      const margin = 10;
      const widthRatio = (pageWidth - 2 * margin) / imageWidth;
      const heightRatio = (pageHeight - 2 * margin) / imageHeight;
  
      let ratio = Math.min(widthRatio, heightRatio);
  
      const width = imageWidth * ratio;
      const height = imageHeight * ratio;
  
      const x = pageWidth / 2 - width / 2;
  
      pdf.addImage(imgData, 'PNG', x, margin, width, height);
      pdf.save("download.pdf"); 
    });
  };
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
        <CountriesTable tableRef={tableRef} countries={selected} />
        <Button alignSelf="flex-end" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Flex>
    </Flex>
  );
}

function App() {
  return (
    <AlertProvider>
      <ViewCountries />
    </AlertProvider>
  );
}

export default App;
