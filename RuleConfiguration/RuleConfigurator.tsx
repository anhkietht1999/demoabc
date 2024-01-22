import * as React from 'react';
import { Label, values } from '@fluentui/react';
import ConditionGroup from './ConditionGroup';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { IFliedIComboBoxOption } from './IFieldCombobox';
import ConditionComponent from './ConditionComponent';
import { IConditionObject } from './IConditionObject';

export interface IRuleConfigurationProps {
  context?: any;
  value: [any];
}

const RuleConfigurator: React.FunctionComponent<IRuleConfigurationProps> = (Props: IRuleConfigurationProps) => {
  let groups = Props.value;
  if (!groups || !groups.length)
    groups.push(
      {
        type: "Group",
        operator: "And",
        items: [
          { type: "Condition", fieldName: "account", fieldType: "string", operator: "eq", value: "abc" },
          {
            type: "Group",
            operator: "And",
            items: [{ type: "Condition", fieldName: "contact", fieldType: "string", operator: "equal", value: "abc" }],
          }
        ]
      }
    );

  const optionFields: IFliedIComboBoxOption[] = [
    { key: 'A', text: 'Account', fieldType: "Lookup" },
    { key: 'B', text: 'Account Name' },
    { key: 'C', text: 'Address 1' },
    { key: 'D', text: 'Created By' },
    { key: 'E', text: 'dfsdfsdfs' },
  ];

  return (
    <div className='rule-configurator-control'>
      {groups.map((i: any) => {
        if (i.type == "Group")
          return <ConditionGroup items={i.items} entityName={'contact'} fields={optionFields} disabled />
        else
          return <></>
      })}
    </div>

  );
}

export default RuleConfigurator;
