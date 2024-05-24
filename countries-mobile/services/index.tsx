import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { get } from 'aws-amplify/api';
import { Country } from '../types';

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
  getCountryInformation: async (page?: number): Promise<PaginatedCountries> => {
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
    } catch (error: any) {
      console.error('getCountryInformation::error', error);
      const errorMessage = error?.message || 'Failed to fetch countries';
      Alert.alert('Error', errorMessage);
      Sentry.captureException(error);
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
  }, [page, setLoading]);

  return {
    totalPages,
    countries,
  };
}
