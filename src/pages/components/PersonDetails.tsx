import React from 'react';
import { withConditionalRender } from '../../enhancers/withConditionalRender';

const component = (props: any) => {
  const { value, setValue } = props;

  const clearButtonHandler = () => setValue({ ...value, name: null });
  return (
    <div className="details">
      <div className="section-title">Details</div>
      <div>
        {value.name} ({value.group})
      </div>
      <div className="clear-button" onClick={clearButtonHandler}>
        {' '}
        x{' '}
      </div>
    </div>
  );
};

export const PersonDetails = withConditionalRender(component);
