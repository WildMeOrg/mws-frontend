import React, { useEffect, useState, useMemo } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { get } from 'lodash-es';
import ReactPlayer from 'react-player';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import DashboardModal from '@uppy/react/lib/DashboardModal';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { v4 as uuid } from 'uuid';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import VideoIcon from '@material-ui/icons/Movie';

import Button from '../Button';
import useSiteSettings from '../../models/site/useSiteSettings';
import Text from '../Text';

function MediaViewer({ variant = 'image', url, label }) {
  if (variant === 'image') {
    return (
      <img
        alt={label}
        style={{
          maxHeight: 240,
          maxWidth: 240,
          height: 'auto',
          width: 'auto',
        }}
        src={url}
      />
    );
  } else if (variant === 'video' && url) {
    return (
      <ReactPlayer
        url={url}
        height={240}
        width={360}
        muted
        autoPlay
        playing
        controls
      />
    );
  } else if (variant === 'video' && !url) {
    return (
      <Paper
        style={{ display: 'flex', padding: 20, alignItems: 'center' }}
      >
        <VideoIcon style={{ marginRight: 8 }} fontSize="large" />
        <Text variant="subtitle1">
          {label || 'Filename unavailable'}
        </Text>
      </Paper>
    );
  }

  return <Text>{label}</Text>;
}

export default function SettingsFileUpload({
  labelId,
  descriptionId,
  changeId,
  required = false,
  allowedFileTypes,
  settingName,
  onSetPostData = Function.prototype,
  maxFileSize = 10000000, // 10 MB
  variant = 'image',
}) {
  const intl = useIntl();
  const siteSettings = useSiteSettings();
  const [uppy, setUppy] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewText, setPreviewText] = useState(null);
  const assetSubmissionId = useMemo(uuid, []);

  useEffect(() => {
    const uppyInstance = Uppy({
      meta: { type: settingName },
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize,
        allowedFileTypes,
      },
      autoProceed: true,
    });

    uppyInstance.use(Tus, {
      endpoint: `${__houston_url__}/api/v1/asset_groups/tus`,
      headers: {
        'x-tus-transaction-id': assetSubmissionId,
      },
    });

    uppyInstance.on('complete', uppyState => {
      const uploadObject = get(uppyState, 'successful.0');
      if (uploadObject) {
        onSetPostData({
          key: settingName,
          transactionId: assetSubmissionId,
          transactionPath: get(uploadObject, ['meta', 'name']),
        });
        setPreviewUrl(get(uploadObject, 'preview'));
        setPreviewText(get(uploadObject, 'name'));
      }
    });

    setUppy(uppyInstance);

    return () => uppyInstance.close();
  }, []);

  const settingValue = get(siteSettings, [
    'data',
    'site.images',
    settingName,
  ]);

  const mediaUrl = previewUrl || settingValue;

  const allowedFileTypeString = allowedFileTypes
    ? allowedFileTypes.join(', ')
    : null;

  return (
    <Grid
      item
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minWidth: '35%',
        }}
      >
        <Text
          style={{
            marginTop: 20,
          }}
          variant="subtitle1"
        >
          <FormattedMessage id={labelId} />
          {required && ' *'}
        </Text>
        <Text
          style={{
            marginTop: 4,
          }}
          variant="body2"
          id={descriptionId}
        />
      </div>
      <div
        style={{
          marginTop: 24,
          marginLeft: 80,
          width: 400,
          minWidth: 400,
        }}
      >
        {mediaUrl || previewText ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MediaViewer
              url={mediaUrl}
              alt={`Uploaded ${settingName}`}
              variant={variant}
              label={previewText}
            />
            <Button
              onClick={() => {
                setPreviewUrl(null);
                uppy.reset();
                setModalOpen(true);
              }}
              id={changeId}
              display="basic"
              style={{ width: 'fit-content' }}
            />
          </div>
        ) : (
          <Button
            size="small"
            style={{ marginTop: 8 }}
            onClick={() => setModalOpen(true)}
          >
            <FormattedMessage id="UPLOAD_A_FILE" />
          </Button>
        )}
        {uppy && (
          <DashboardModal
            uppy={uppy}
            note={
              allowedFileTypeString
                ? intl.formatMessage(
                    { id: 'FILETYPES_NOTE' },
                    { allowedFileTypes: allowedFileTypeString },
                  )
                : null
            }
            // closeAfterFinish
            closeModalOnClickOutside
            showProgressDetails
            showLinkToFileUploadResult={false}
            open={modalOpen}
            onRequestClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </Grid>
  );
}
