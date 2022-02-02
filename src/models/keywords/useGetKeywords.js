import axios from 'axios';
import { get } from 'lodash-es';
import { useQuery } from 'react-query';
import queryKeys from '../../constants/queryKeys';

export default function useGetKeywords() {
  const result = useQuery(
    queryKeys.keywords,
    async () => {
      const response = await axios.request({
        url: `${__houston_url__}/api/v1/keywords`,
        method: 'get',
      });
      return response;
    },
    {
      staleTime: Infinity,
      retry: false,
    },
  );

  const { data, isLoading, error } = result;

  return {
    data: get(data, 'data'),
    loading: isLoading,
    error: error ? error.toJSON().message : null,
  };
}