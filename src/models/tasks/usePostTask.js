import { usePost } from '../../hooks/useMutate';

export default function usePostTask() {
  return usePost({
    deriveUrl: ({ missionGuid }) => `/missions/${missionGuid}/tasks`,
    deriveData: ({ operations }) => operations,
    onSuccess: result => {
      const newTaskId = result?.data?.guid;
      window.location.href = `/tasks/${newTaskId}`;
    },
  });
}
