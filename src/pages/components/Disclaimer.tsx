import React from 'react';
import { withConditionalRender } from '../../enhancers/withConditionalRender';
import Warning from '@material-ui/icons/WarningRounded';

export const Disclaimer = withConditionalRender((props: any) => {
  return (
    <div className="info disclaimer">
      <div>
        <Warning fontSize="large" color="disabled" />
      </div>
      <div>I understand the contagious nature of the Coronavirus/COVID-19 and that the CDC and many other public health authorities still recommend practicing social distancing.</div>
    </div>
  );
});
