import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import BigAvatar from './profilePhotos/BigAvatar';
import Text from './Text';

export default function EntityHeader({
  admin = false,
  imageSrc,
  imageGuid,
  name,
  editable,
  noAvatar = false,
  children,
  square = false,
  renderOptions,
  renderAvatar = Function.prototype,
}) {
  return (
    <>
      <Grid container>
        <Grid
          style={{
            marginLeft: 12,
            padding: '24px 0 0 0',
          }}
          item
        >
          {renderAvatar()}
          {noAvatar ? (
            <div style={{ width: 4, height: 151 }} />
          ) : (
            <BigAvatar
              imageSrc={imageSrc}
              imageGuid={imageGuid}
              editable={editable}
              name={name}
              square={square}
              admin={admin}
            />
          )}
        </Grid>
        <Grid
          item
          style={{
            marginLeft: 12,
            flexGrow: 1,
            padding: '24px 12px 12px 0',
            overflow: 'hidden',
            maxWidth: 677, // (i never said i was a role model)
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              variant="h4"
              component="h4"
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: noAvatar ? '100%' : '80%',
              }}
            >
              {name}
            </Text>
            <div>{renderOptions}</div>
          </div>
          <div style={{ marginLeft: 4, marginTop: 4 }}>
            {children}
          </div>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 24, marginBottom: 12 }} />
    </>
  );
}
