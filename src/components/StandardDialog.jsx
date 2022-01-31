import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Text from './Text';

export default function StandardDialog({
  open,
  onClose,
  closeDialogDisabled,
  title,
  titleId,
  children,
  ...rest
}) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>
        <Text id={titleId} style={{ marginRight: 60 }}>
          {title}
        </Text>
        <IconButton
          style={{ position: 'absolute', top: 4, right: 12 }}
          aria-label="close"
          disabled={closeDialogDisabled}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  );
}
