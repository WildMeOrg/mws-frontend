import { usePatch } from '../../hooks/useMutate';
import queryKeys, {
  getMissionQueryKey,
} from '../../constants/queryKeys';

export default function usePatchMission() {
  return usePatch({
    deriveUrl: ({ missionGuid }) => `/missions/${missionGuid}`,
    deriveData: ({ operations }) => operations,
    deriveFetchKeys: ({ missionGuid }) => [
      getMissionQueryKey(missionGuid),
      queryKeys.me,
    ],
  });
}
