import { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash-es';
import { formatError } from '../../utils/formatters';

export default function useSighting(sightingId) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusCode, setStatusCode] = useState(null);
  const [sightingData, setSightingData] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  function refresh() {
    setRefreshCount(refreshCount + 1);
  }

  useEffect(
    () => {
      const fetchSightingData = async () => {
        try {
          const response = await axios.request({
            url: `${__houston_url__}/api/v1/sightings/${sightingId}`,
            method: 'get',
          });

          const responseStatusCode = get(response, ['status']);
          setStatusCode(responseStatusCode);
          const successful = responseStatusCode === 200;
          if (!successful) setError(formatError(response));

          setLoading(false);
          setSightingData(get(response, ['data']));
        } catch (fetchError) {
          const responseStatusCode = get(fetchError, [
            'response',
            'status',
          ]);
          setStatusCode(responseStatusCode);
          console.error(`Error fetching sighting ${sightingId}`);
          console.error(fetchError);
          setError(formatError(fetchError));
          setLoading(false);
        }
      };

      if (sightingId) fetchSightingData();
    },
    [sightingId, refreshCount],
  );

  return { data: sightingData, statusCode, loading, error, refresh };
}
