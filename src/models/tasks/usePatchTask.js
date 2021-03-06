import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import { getTaskQueryKey } from '../../constants/queryKeys';

export default function usePatchTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation(async ({ taskId, operations }) => {
    const result = await axios.request({
      url: `${__houston_url__}/api/v1/missions/tasks/${taskId}`,
      withCredentials: true,
      method: 'patch',
      data: operations,
    });

    if (result?.status === 200) {
      queryClient.invalidateQueries(getTaskQueryKey(taskId));
    }

    return result;
  });

  const patchTask = (taskId, operations) =>
    mutation.mutateAsync({ taskId, operations });

  const error = mutation?.error
    ? mutation?.error.toJSON().message
    : null;

  return {
    ...mutation,
    patchTask,
    error,
  };
}
