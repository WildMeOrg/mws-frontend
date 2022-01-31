import React, { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import WildMeLogo from '../../../assets/wild-me-gradient-logo.png';
import Text from '../../../components/Text';
import TaskSwitcher from './TaskSwitcher';
import MissionSwitcher from './MissionSwitcher';
import NotesEditor from './NotesEditor';

export default function MissionDrawer({
  missionData,
  projectName,
  createdDate,
}) {
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={open}
      onClose={() => setOpen(false)}
      style={{ width: 361 }}
      PaperProps={{ style: { padding: 20 } }}
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
        <Text variant="h5">MWS App</Text>
      </div>
      <Divider />

      <MissionSwitcher
        missionData={missionData}
        createdDate={createdDate}
        projectName={projectName}
      />

      <TaskSwitcher />

      <NotesEditor missionData={missionData} />
    </Drawer>
  );
}
