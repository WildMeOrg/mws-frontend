import { useEffect, useState } from 'react';
import { get } from 'lodash-es';
import axios from 'axios';

export default function useAcmImageData(acmId) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await axios(
            `https://www.flukebook.org/iaResults.jsp?acmId=${acmId}`,
          );
          setData(get(response, ['data', 'annotations', '0']));
          setLoading(false);
          setError(false);
        } catch (fetchError) {
          setError(fetchError);
          setLoading(false);
          console.error('Error fetching site settings');
          console.error(fetchError);
        }
      };

      if (acmId) fetchData();
    },
    [acmId],
  );

  return { data, loading, error, setError, setLoading };
}
