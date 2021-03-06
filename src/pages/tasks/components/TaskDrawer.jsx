import React, { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CollapseIcon from '@material-ui/icons/ChevronLeft';

import WildMeLogo from '../../../assets/wild-me-gradient-logo.png';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import ImageList from './ImageList';
import AddImagesDialog from './dialogs/AddImagesDialog';

export default function TaskDrawer({
  taskData,
  selectedAsset,
  setSelectedAsset,
}) {
  const [addImagesDialogOpen, setAddImagesDialogOpen] = useState(
    false,
  );
  const [minimized, setMinimized] = useState(false);

  const minimizedStyles = {
    opacity: minimized ? 0 : 1,
    pointerEvents: minimized ? 'none' : undefined,
  };

  const noImages = taskData?.assets?.length === 0;
  const hasEditPermissions = true;

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open
      style={{
        width: minimized ? 88 : 361,
        cursor: minimized ? 'pointer' : undefined,
      }}
      PaperProps={{
        style: { padding: 20, width: minimized ? 88 : 361 },
      }}
      onClick={() => {
        if (minimized) setMinimized(false);
      }}
    >
      <AddImagesDialog
        open={addImagesDialogOpen}
        onClose={() => setAddImagesDialogOpen(false)}
        missionGuid={taskData?.mission?.guid}
        taskGuid={taskData?.guid}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <img
            src={WildMeLogo}
            style={{ width: 48, marginRight: 12 }}
            alt="Wild Me logo"
          />
          <Text
            variant="h5"
            style={{
              whiteSpace: 'nowrap',
              fontSize: 26,
              ...minimizedStyles,
            }}
          >
            Wild Me Scout
          </Text>
        </div>
        <IconButton
          style={minimizedStyles}
          onClick={() => setMinimized(true)}
        >
          <CollapseIcon />
        </IconButton>
      </div>
      <Divider style={minimizedStyles} />

      {noImages ? (
        <div style={minimizedStyles}>
          <Text style={{ margin: '20px 0 12px 0' }}>
            {hasEditPermissions
              ? 'This task has no images. Get started by adding some images!'
              : 'This task has no images.'}
          </Text>
          {hasEditPermissions && (
            <Button
              display="primary"
              onClick={() => setAddImagesDialogOpen(true)}
            >
              Add images
            </Button>
          )}
        </div>
      ) : (
        <div style={minimizedStyles}>
          <ImageList
            taskData={taskData}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
          />
        </div>
      )}
    </Drawer>
  );
}
