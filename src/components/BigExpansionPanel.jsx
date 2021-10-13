import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';

export default function BigExpansionPanel({
  children,
  style = {},
  ...rest
}) {
  const theme = useTheme();

  return (
    <Accordion
      style={{
        border: `1px solid ${theme.palette.grey[500]}`,
        boxShadow: 'none',
        margin: '16px 0',
        maxWidth: 600,
        width: '90%',
        ...style,
      }}
      square
      {...rest}
    >
      {children}
    </Accordion>
  );
}
