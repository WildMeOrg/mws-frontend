import React from 'react';
import { get } from 'lodash-es';
import { useIntl } from 'react-intl';
import DateFnsUtils from '@date-io/date-fns';
import { getHours, setHours, getMinutes, setMinutes } from 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import Text from '../Text';

export default function DateInput(props) {
  const {
    schema,
    required,
    value,
    onChange,
    width,
    minimalLabels = false,
    ...rest
  } = props;

  const intl = useIntl();

  function getLabel(object) {
    if (object.labelId)
      return intl.formatMessage({ id: object.labelId });
    return get(object, 'label', 'Missing label');
  }

  function getDescription(object) {
    if (object.descriptionId)
      return intl.formatMessage({ id: object.descriptionId });
    return get(object, 'description', '');
  }

  /* Note: the wrapper div is there because MuiPicker creates two child elements,
   * which messes up display if this component is a flex child. */
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <KeyboardDatePicker
            disableToolbar
            disableFuture
            variant="inline"
            autoOk
            format="yyyy-MM-dd" // US: MM/dd/yyyy
            margin="normal"
            id={`${getLabel(schema)}-date-input`}
            label={intl.formatMessage({ id: 'SELECT_DATE' })}
            value={value}
            onChange={newDate => {
              // Default to 12:00pm, leave hours and minutes unchanged if they are already set.
              const hours = value ? getHours(value) : 0;
              const minutes = value ? getMinutes(value) : 0;
              newDate = setHours(newDate, hours);
              newDate = setMinutes(newDate, minutes);
              onChange(newDate);
            }}
            style={{ margin: 0, width }}
            KeyboardButtonProps={{
              'aria-label': intl.formatMessage({ id: 'CHANGE_DATE' }),
            }}
            {...rest}
          />
          <KeyboardTimePicker
            variant="inline"
            margin="normal"
            format="HH:mm" // default for US
            id={`${getLabel(schema)}-time-input`}
            label={intl.formatMessage({ id: 'SELECT_TIME' })}
            value={value}
            onChange={onChange}
            KeyboardButtonProps={{
              'aria-label': intl.formatMessage({ id: 'CHANGE_TIME' }),
            }}
            style={{ width }}
          />
          {!minimalLabels && (
            <Text
              variant="caption"
              color="textSecondary"
              style={{ marginTop: 4 }}
            >
              {getDescription(schema)}
            </Text>
          )}
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
}
