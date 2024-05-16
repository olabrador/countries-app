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
      console.log('getCountryInformation::data', countriesData);
      return countriesData;
    } catch (error) {
      console.error('getCountryInformation::error', error);
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

export default apiCalls;
