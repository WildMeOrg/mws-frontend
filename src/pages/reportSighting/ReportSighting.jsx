import React, { useState, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { v4 as uuid } from 'uuid';

import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import UploadManager from '../../components/report/UploadManager';
import ReportSightingsPage from '../../components/report/ReportSightingsPage';
import Text from '../../components/Text';
import Link from '../../components/Link';
import Button from '../../components/Button';
import ReportForm from './ReportForm';

export default function ReportSighting({ authenticated }) {
  const assetSubmissionId = useMemo(uuid, []);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [files, setFiles] = useState([]);
  const [exifData, setExifData] = useState([]);
  const [reporting, setReporting] = useState(false);
  const noImages = files.length === 0;

  const onBack = () => {
    window.scrollTo(0, 0);
    setReporting(false);
  };

  let continueButtonText = 'CONTINUE';
  if (noImages) continueButtonText = 'CONTINUE_WITHOUT_PHOTOGRAPHS';
  if (uploadInProgress) continueButtonText = 'UPLOAD_IN_PROGRESS';

  return (
    <ReportSightingsPage
      titleId="REPORT_A_SIGHTING"
      authenticated={authenticated}
    >
      {reporting ? (
        <Button
          onClick={onBack}
          style={{ marginTop: 8, width: 'fit-content' }}
          display="back"
          id="BACK_TO_PHOTOS"
        />
      ) : null}
      {reporting ? (
        <ReportForm assetReferences={files} exifData={exifData} />
      ) : (
        <>
          <Grid item style={{ marginTop: 20 }}>
            <UploadManager
              onUploadStarted={() => setUploadInProgress(true)}
              onUploadComplete={() => setUploadInProgress(false)}
              assetSubmissionId={assetSubmissionId}
              exifData={exifData}
              setExifData={setExifData}
              files={files}
              setFiles={setFiles}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <InfoIcon fontSize="small" style={{ marginRight: 4 }} />
              <Text variant="caption">
                <FormattedMessage id="PHOTO_OPTIMIZE_1" />
                <Link
                  external
                  href="https://docs.wildme.org/docs/researchers/photography_guidelines"
                >
                  <FormattedMessage id="PHOTO_OPTIMIZE_2" />
                </Link>
                <FormattedMessage id="PHOTO_OPTIMIZE_3" />
              </Text>
            </div>
          </Grid>
          <Grid item>
            <Button
              id={continueButtonText}
              display="primary"
              disabled={uploadInProgress}
              onClick={async () => {
                window.scrollTo(0, 0);
                setReporting(true);
              }}
              style={{ marginTop: 16 }}
            />
          </Grid>
        </>
      )}
    </ReportSightingsPage>
  );
}
