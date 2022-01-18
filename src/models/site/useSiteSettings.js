import { get, merge } from 'lodash-es';
import axios from 'axios';
import { useQuery } from 'react-query';

import queryKeys from '../../constants/queryKeys';

export default function useSiteSettings() {
  const settingsSchemaResult = useQuery(
    queryKeys.settingsSchema,
    async () => {
      const response = await axios({
        url: `${__houston_url__}/api/v1/configurationDefinition/default/__bundle_setup`,
        timeout: 2000,
      });
      return get(response, 'data.response.configuration');
    },
    {
      staleTime: Infinity,
    },
  );

  const settingsConfigResult = useQuery(
    queryKeys.settingsConfig,
    async () => {
      const response = await axios(
        `${__houston_url__}/api/v1/configuration/default/__bundle_setup`,
      );
      return get(response, 'data.response.configuration');
    },
    {
      staleTime: Infinity,
    },
  );

  const {
    data: schemaData,
    isLoading: schemaLoading,
    isError: schemaError,
  } = settingsSchemaResult;

  const {
    data: configData,
    isLoading: configLoading,
    isError: configError,
  } = settingsConfigResult;

  const loading = schemaLoading || configLoading;
  const error = schemaError || configError;
  const siteSettingsVersion = get(
    configData,
    'data.response.version',
  );

  let data = null;
  if (schemaData && configData) {
    /* Order of this merge is crucial. Values from the settings object must
     * override values from the schema object. If the order ever needs to be
     * changed for some reason, extensive QA of the RegionEditor component
     * will be necesssary. */
    data = merge(configData, schemaData);
  }

  return { data, loading, error, siteSettingsVersion };
}
