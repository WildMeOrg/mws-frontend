import React, { useState } from 'react';
import { get, set, pick } from 'lodash-es';

import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import usePatchIndividual from '../../models/individual/usePatchIndividual';
import CustomAlert from '../../components/Alert';
import InputRow from '../../components/fields/edit/InputRowNew';
import Button from '../../components/Button';
import StandardDialog from '../../components/StandardDialog';

function getInitialFormValues(schema, fieldKey) {
  return schema.reduce((memo, field) => {
    const valueKey = get(field, fieldKey);
    const value = get(
      field,
      'value',
      get(field, 'defaultValue', null),
    );
    memo = set(memo, valueKey, value);
    return memo;
  }, {});
}

export default function EditIndividualMetadata({
  open,
  individualId,
  metadata,
  onClose,
  refreshIndividualData,
}) {
  const {
    updateIndividualProperties,
    loading,
    error,
    setError,
  } = usePatchIndividual();

  const defaultFieldMetadata = metadata.filter(
    field => !field.customField,
  );
  const customFieldMetadata = metadata.filter(
    field => field.customField,
  );

  const [defaultFieldValues, setDefaultFieldValues] = useState(
    getInitialFormValues(defaultFieldMetadata, 'name'),
  );

  const [customFieldValues, setCustomFieldValues] = useState(
    getInitialFormValues(customFieldMetadata, 'id'),
  );

  return (
    <StandardDialog
      PaperProps={{ style: { width: 800 } }}
      maxWidth="lg"
      open={open}
      onClose={onClose}
      titleId="EDIT_INDIVIDUAL_METADATA"
    >
      <DialogContent style={{ minWidth: 200 }}>
        {metadata.map(field => {
          if (!field.editable) return null;
          if (!field.editComponent) return null; // temporary stopgap
          const value = field.customField
            ? get(customFieldValues, field.id)
            : get(defaultFieldValues, field.name);

          const fieldProps = field.editComponentProps || {};

          return (
            <InputRow schema={field} key={field.id || field.name}>
              <field.editComponent
                schema={field}
                {...fieldProps}
                value={value}
                minimalLabels
                onChange={newValue => {
                  if (field.customField) {
                    const newFormValues = {
                      ...customFieldValues,
                      [field.id]: newValue,
                    };
                    setCustomFieldValues(newFormValues);
                  } else {
                    const newFormDefaultValues = {
                      ...set(
                        defaultFieldValues,
                        field.name,
                        newValue,
                      ),
                    };
                    setDefaultFieldValues(newFormDefaultValues);
                  }
                }}
              />
            </InputRow>
          );
        })}

        {error && (
          <CustomAlert severity="error" titleId="SUBMISSION_ERROR">
            {error}
          </CustomAlert>
        )}
      </DialogContent>
      <DialogActions style={{ padding: '0px 24px 24px 24px' }}>
        <Button
          display="basic"
          onClick={() => {
            setError(null);
            onClose();
          }}
          id="CANCEL"
        />
        <Button
          loading={loading}
          display="primary"
          onClick={async () => {
            const currentPatchableValues = pick(defaultFieldValues, [
              'names',
            ]);
            const successfulUpdate = await updateIndividualProperties(
              individualId,
              currentPatchableValues,
            );
            if (successfulUpdate) {
              refreshIndividualData();
              onClose();
            }
          }}
          id="SAVE"
        />
      </DialogActions>
    </StandardDialog>
  );
}
