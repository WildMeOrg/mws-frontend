import { useState } from 'react';
import axios from 'axios';
import { get } from 'lodash-es';
import { useQueryClient } from 'react-query';

import queryKeys from '../../constants/queryKeys';
import { formatError } from '../../utils/formatters';

export default function usePostUser() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const postUser = async (email, password, roles) => {
    try {
      setLoading(true);
      const response = await axios({
        url: `${__houston_url__}/api/v1/users/`,
        withCredentials: true,
        method: 'post',
        data: {
          email,
          password,
          roles,
        },
      });
      const successful = get(response, 'status') === 200;
      if (successful) {
        setSuccess(`User ${email} created succesfully.`);
        setError(null);
        queryClient.invalidateQueries(queryKeys.users);
        setLoading(false);
        return true;
      }

      setError(formatError(response));
      setLoading(false);
      setSuccess(false);
      return false;
    } catch (postError) {
      setLoading(false);
      setError(formatError(postError));
      setSuccess(false);
      return false;
    }
  };

  return {
    postUser,
    error,
    setError,
    success,
    setSuccess,
    loading,
  };
}
