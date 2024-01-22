
import * as React from 'react';
import {
  ComboBox, IComboBoxOption, IIconProps, IconButton
} from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
import { IFliedIComboBoxOption } from './IFieldCombobox';
import { IConditionObject } from './IConditionObject';

export interface IConditionProps {
  fields: IFliedIComboBoxOption[];
  conditionObject: IConditionObject;
  delete?: any;
}

const deleteIcon: IIconProps = { iconName: 'Delete' };

const ConditionComponent: React.FunctionComponent<IConditionProps> = (Props: IConditionProps) => {
  const optionFields = Props.fields;
  const conditionObject = Props.conditionObject;
  const optionOperate: IComboBoxOption[] = [
    { key: '0', text: 'Does not Equal' },
    { key: '1', text: 'Equals' },
    { key: '2', text: 'Contains' },
    { key: '3', text: 'Does not contain' },
    { key: '4', text: 'Begins with' },
    { key: '5', text: 'Does not begin with' },
    { key: '6', text: 'Ends with' },
    { key: '7', text: 'Does not end with' },
    { key: '8', text: 'Contains data' },
    { key: '9', text: 'Does not contain data' },
  ];
  console.log(JSON.stringify(conditionObject));

  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-md3 ms-sm12">
          <ComboBox
            placeholder="Select an field"
            options={optionFields}
          />
        </div>
        <div className="ms-Grid-col ms-md3 ms-sm12">
          <ComboBox
            placeholder="Select an operate"
            options={optionOperate}
          />
        </div>
        <div className="ms-Grid-col ms-md3 ms-sm12"> <TextField placeholder='Value...' /></div>
        <div className="ms-Grid-col ms-sm2 ms-sm12" style={{ textAlign: 'left' }}>
          <IconButton iconProps={deleteIcon} aria-label="Delete" onClick={Props.delete} />
        </div>
      </div>
    </div>
  )
}

export default ConditionComponent;