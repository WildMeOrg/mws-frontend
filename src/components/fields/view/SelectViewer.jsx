import React from 'react';
import { get } from 'lodash-es';
import Text from '../../Text';

export default function SelectViewer({
  value,
  schema,
  lookupKey = 'value',
  labelKey = 'label',
  labelIdKey = 'labelId',
  defaultLabel = 'Option label not found',
}) {
  const { choices } = schema;

  const selectedOption = choices.find(
    choice => choice[lookupKey] === value,
  );

  return (
    <Text
      component="span"
      variant="body2"
      id={get(selectedOption, labelIdKey, undefined)}
    >
      {get(selectedOption, labelKey, defaultLabel)}
    </Text>
  );
}
