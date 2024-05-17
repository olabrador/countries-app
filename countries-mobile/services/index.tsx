import { get } from 'aws-amplify/api';
import { Country } from '../types';
import { useEffect, useState } from 'react';
// import { useAlert } from '../context';
// import { AlertProps } from '@aws-amplify/ui-react';

export interface PaginatedCountries {
  metadata: {
    page: number;
    rows: number;
    total_registers: number;
  };
  data: Country[];
}

interface UseCountriesProps {
  setLoading: (loading: boolean) => void;
  page: number;
}

interface UseCountriesResult {
  totalPages: number;
  countries: Country[];
}

const apiCalls = {
  getCountryInformation: async (onError: (alert: any) => void, page?: number): Promise<PaginatedCountries> => {
    try {
      const response = await get({
        apiName: 'GetCountriesInfo',
        path: '/getCountryInformation',
        options: {
          queryParams: {
            page: page?.toString() || '1',
            rows: '10',
          },
        },
      }).response;
      if (response.statusCode !== 200) {
        throw new Error('Failed to fetch countries');
      }
      const countriesData = await response.body.json() as never;
      return countriesData;
    } catch (error) {
      console.error('getCountryInformation::error', error);
      onError({
        variation: 'error',
        children: 'Failed to fetch countries',
        heading: 'Error',
      });
      return {
        metadata: {
          page: 0,
          rows: 0,
          total_registers: 0,
        },
        data: [],
      };
    }
  },
};

export default function useCountries({ setLoading, page }: UseCountriesProps): UseCountriesResult {
  const [totalPages, setTotalPages] = useState(0);
  const [countries, setCountries] = useState<Country[]>([]);
  // const { setAlert } = useAlert();
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const result = await apiCalls.getCountryInformation(() => {}, page);
      setCountries(result.data);
      setTotalPages(
        Math.ceil(result.metadata.total_registers / result.metadata.rows)
      );
      setLoading(false);
    };

    fetchCountries();
  }, [page, setLoading]);

  return {
    totalPages,
    countries,
  };
}
