import React from 'react';
import { withConditionalRender } from '../../enhancers/withConditionalRender';

const component = (props: any) => {
  const { value } = props;
  return (
    <div className="details">
      <div className="section-title">Details</div>
      <div>
        {value.name} ({value.group})
      </div>
    </div>
  );
};

export const PersonDetails = withConditionalRender(component);
