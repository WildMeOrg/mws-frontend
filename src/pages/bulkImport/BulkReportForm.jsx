import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { FlatfileButton } from '@flatfile/react';
import { get } from 'lodash-es';
import { useHistory } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomAlert from '../../components/Alert';

import usePostAssetGroup from '../../models/assetGroup/usePostAssetGroup';
import useSightingFieldSchemas from '../../models/sighting/useSightingFieldSchemas';
import useEncounterFieldSchemas from '../../models/encounter/useEncounterFieldSchemas';
import prepareAssetGroup from './utils/prepareAssetGroup';
import useBulkImportFields from './utils/useBulkImportFields';
import { flatfileKey } from '../../constants/apiKeys';

import LoadingScreen from '../../components/LoadingScreen';
import InputRow from '../../components/fields/edit/InputRowNew';
import TermsAndConditionsDialog from '../../components/report/TermsAndConditionsDialog';
import Button from '../../components/Button';
import Text from '../../components/Text';
import InlineButton from '../../components/InlineButton';
import BulkFieldBreakdown from './BulkFieldBreakdown';

const minmax = {
  decimalLatitude: [-180, 180],
  decimalLongitude: [-180, 180],
  timeYear: [1900, 2021],
  timeMonth: [1, 12],
  timeDay: [1, 31],
  timeHour: [0, 24],
  timeMinutes: [0, 60],
  timeSeconds: [0, 60],
};
const minmaxKeys = Object.keys(minmax);

function recordHook(record) {
  const recordHookResponse = {};
  minmaxKeys.forEach(key => {
    if (record[key]) {
      const value = parseFloat(record[key]);
      const min = minmax[key][0];
      const max = minmax[key][1];
      if (value < min || value > max) {
        recordHookResponse[key] = {
          info: [
            {
              message: `Value must be between ${min} and ${max}`,
              level: 'error',
            },
          ],
        };
      }
    }
  });

  return recordHookResponse;
}

export default function BulkReportForm({ assetReferences }) {
  const theme = useTheme();
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [sightingData, setSightingData] = useState(null);
  const [detectionModel, setDetectionModel] = useState('');
  const [
    everythingReadyForFlatfile,
    setEverythingReadyForFlatfile,
  ] = useState(false);

  const {
    postAssetGroup,
    loading,
    error: postError,
  } = usePostAssetGroup();
  const error = termsError || postError;

  const {
    numEncounterFieldsForFlatFile,
    numSightingFieldsForFlatFile,
    availableFields,
  } = useBulkImportFields();
  const sightingFieldSchemas = useSightingFieldSchemas();
  const encounterFieldSchemas = useEncounterFieldSchemas();
  const detectionModelField = sightingFieldSchemas.find(
    schema => schema.name === 'speciesDetectionModel',
  );

  useEffect(
    () => {
      if (
        numEncounterFieldsForFlatFile > 0 &&
        numSightingFieldsForFlatFile > 0
      ) {
        // wait for these to become non-zero to be confident that availableFields is fully populated before sending off to FlatFile
        setEverythingReadyForFlatfile(true);
      }
    },
    [encounterFieldSchemas, sightingFieldSchemas],
  );

  if (!everythingReadyForFlatfile) return <LoadingScreen />;

  return (
    <>
      <TermsAndConditionsDialog
        visible={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <div style={{ marginLeft: 12 }}>
        <Text variant="h6" style={{ marginTop: 20 }}>
          Review available fields
        </Text>
      </div>
      <BulkFieldBreakdown availableFields={availableFields} />

      <Grid item style={{ marginTop: 12 }}>
        <div style={{ marginLeft: 12 }}>
          <Text variant="h6" style={{ marginTop: 20 }}>
            Import data
          </Text>
        </div>
        <Paper
          elevation={2}
          style={{
            marginTop: 20,
            marginBottom: 32,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 12px',
          }}
        >
          <FlatfileButton
            devMode
            managed
            maxRecords={1000}
            licenseKey={flatfileKey}
            customer={{ userId: 'dev' }}
            settings={{
              disableManualInput: true,
              title: 'Import sightings data',
              type: 'bulk_import',
              fields: availableFields,
              styleOverrides: {
                primaryButtonColor: theme.palette.primary.main,
              },
            }}
            onRecordInit={recordHook}
            onRecordChange={recordHook}
            onData={async results => {
              setSightingData(results.data);
            }}
            render={(importer, launch) => (
              <Button
                style={{ width: 260 }}
                display="primary"
                onClick={launch}
                id="UPLOAD_SPREADSHEET"
              />
            )}
          />
          {sightingData ? (
            <Text variant="body2" style={{ margin: '8px 0 8px 4px' }}>
              {`${sightingData.length} sightings imported.`}
            </Text>
          ) : null}

          {detectionModelField && (
            <InputRow schema={detectionModelField}>
              <detectionModelField.editComponent
                schema={detectionModelField}
                value={detectionModel}
                onChange={value => {
                  setDetectionModel(value);
                }}
                minimalLabels
              />
            </InputRow>
          )}
        </Paper>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedTerms}
              onChange={() => {
                setAcceptedTerms(!acceptedTerms);
                if (!acceptedTerms && termsError)
                  setTermsError(false);
              }}
            />
          }
          label={
            <span>
              <FormattedMessage id="TERMS_CHECKBOX_1" />
              <InlineButton onClick={() => setDialogOpen(true)}>
                <FormattedMessage id="TERMS_CHECKBOX_2" />
              </InlineButton>
              <FormattedMessage id="END_OF_SENTENCE" />
            </span>
          }
        />
      </Grid>

      {error && (
        <Grid style={{ marginTop: 12 }} item>
          <CustomAlert severity="error" titleId="SUBMISSION_ERROR">
            {termsError ? (
              <Text variant="body2" id="TERMS_ERROR" />
            ) : (
              postError
            )}
          </CustomAlert>
        </Grid>
      )}
      <Grid
        item
        style={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={async () => {
            // check that terms and conditions were accepted
            if (acceptedTerms) {
              const sightings = prepareAssetGroup(
                sightingData,
                assetReferences,
              );
              const assetGroupData = await postAssetGroup({
                description: 'Bulk import from user',
                uploadType: 'bulk',
                speciesDetectionModel: [detectionModel || null],
                transactionId: get(assetReferences, [
                  0,
                  'transactionId',
                ]),
                sightings,
              });
              const assetGroupId = get(assetGroupData, 'guid');
              if (assetGroupId) {
                history.push(`/bulk-import/success/${assetGroupId}`);
              }
            } else {
              setTermsError(true);
            }
          }}
          style={{ width: 200 }}
          loading={loading}
          display="primary"
          disabled={!sightingData}
          id="REPORT_SIGHTINGS"
        />
      </Grid>
    </>
  );
}
