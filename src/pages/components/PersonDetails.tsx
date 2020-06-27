import React from 'react';
import { withConditionalRender } from '../../enhancers/withConditionalRender';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Person from '@material-ui/icons/Person';

const component = (props: any) => {
  const { value, setValue, onClose } = props;

  const clearButtonHandler = () => onClose();
  return (
    <div className="details">
      <div className="athlete-name">
        <IconButton>
          <Person />
        </IconButton>
        {value.name} <span className="athlete-group">({value.group})</span>
      </div>
      <div className="clear-button" onClick={clearButtonHandler}>
        <IconButton>
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export const PersonDetails = withConditionalRender(component);
