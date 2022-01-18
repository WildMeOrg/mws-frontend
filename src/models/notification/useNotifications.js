import { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash-es';
import { formatError } from '../../utils/formatters';

export default function useNotifications(includeRead = false) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusCode, setStatusCode] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  function refresh() {
    setRefreshCount(refreshCount + 1);
  }

  useEffect(
    () => {
      const fetchNotifications = async () => {
        try {
          const baseUrl = `${__houston_url__}/api/v1/notifications`;
          const url = includeRead ? baseUrl : `${baseUrl}/unread`;

          const response = await axios.request({
            url,
            method: 'get',
          });

          const responseStatusCode = get(response, ['status']);
          setStatusCode(responseStatusCode);
          const successful = responseStatusCode === 200;
          if (!successful) setError(formatError(response));

          setNotifications(get(response, ['data']));
          setLoading(false);
        } catch (fetchError) {
          const responseStatusCode = get(fetchError, [
            'response',
            'status',
          ]);
          setStatusCode(responseStatusCode);
          console.error('Error fetching notifications');
          console.error(fetchError);
          setError(formatError(fetchError));
          setLoading(false);
        }
      };

      fetchNotifications();
    },
    [refreshCount],
  );

  return {
    data: notifications,
    statusCode,
    loading,
    error,
    refresh,
  };
}
