
import * as React from 'react';
import {
  DefaultButton, Dropdown, IDropdownOption, IIconProps, IContextualMenuProps
} from '@fluentui/react';
import ConditionComponent from './ConditionComponent';
import { IFliedIComboBoxOption } from './IFieldCombobox';
import { IConditionObject } from './IConditionObject';
import { useState } from 'react';

export interface IConditionGroupProps {
  entityName?: string;
  fields: IFliedIComboBoxOption[];
  disabled?: boolean;
  items: any[];
  delete?: any;
}

const addIcon: IIconProps = { iconName: 'Add' };
const options: IDropdownOption[] = [
  { key: 'AND', text: 'AND', selected: true },
  { key: 'OR', text: 'OR' }
];

const ConditionGroup: React.FunctionComponent<IConditionGroupProps> = (Props: IConditionGroupProps) => {
  const fields = Props.fields;
  const [childs, setChilds] = useState(Props.items);
  const ids = [Number];
  const deleteChild = (id: any) => {
    return (ev: Event) => {
      if (Props.items.length < 2) {
        if (Props.delete)
          Props.delete(ev);
        else {
          Props.items.splice(id, 1);
          setChilds(Array.from(Props.items));
        }
      }
      else {
        Props.items.splice(id, 1);
        setChilds(Array.from(Props.items));
      }

    }
  }

  const deleteGroup = (id: any) => {
    return (ev: Event) => {
      Props.items.splice(id, 1);
      setChilds(Array.from(Props.items));
    }
  }
  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'Add row',
        text: 'Add row',
        iconProps: { iconName: 'AddTo' },
        onClick: (ev => {
          let item = { type: "Condition", fieldName: "account", fieldType: "string", operator: "equal", value: "cde" };
          Props.items.push(item);
          setChilds(Array.from(Props.items));
        })
      },
      {
        key: 'Add group',
        text: 'Add group',
        iconProps: { iconName: 'GroupList' },
        onClick: (ev => {
          let item = {
            type: "Group",
            operator: "And",
            items: [{ type: "Condition", fieldName: "account", fieldType: "string", operator: "equal", value: "abc" }],
          }
          Props.items.push(item);
          setChilds(Array.from(Props.items));
        })
      },
      {
        key: 'Add related entity',
        text: 'Add related entity',
        iconProps: { iconName: 'LookupEntities' },
        onClick: (ev => {
        })
      }
    ],
    shouldFocusOnMount: true,
    shouldFocusOnContainer: true
  };
  return (
    <div className='condition-group'>
      <div>
        <Dropdown
          placeholder="Select an field"
          options={options} disabled={Props.disabled} style={{ width: "80px" }} />
      </div>

      <div className='condition'>
        {childs.map((i: any, id) => {
          if (i.type == "Group") {
            return <ConditionGroup items={i.items} entityName={'contact'} fields={fields} delete={deleteGroup(id)} key={id} />
          }
          else if (i.type == "Condition") {
            return <ConditionComponent conditionObject={i as IConditionObject} fields={fields} delete={deleteChild(id)} key={id} />
          }
          else
            return <></>
        })}
      </div>
      <div className='menu-add'>
        <DefaultButton
          text="Add"
          iconProps={addIcon}
          menuProps={menuProps}
          persistMenu
        />
      </div>

    </div>);
}

export default ConditionGroup;