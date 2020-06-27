import React from 'react';
import { withConditionalRender } from '../../enhancers/withConditionalRender';

export const Disclaimer = withConditionalRender((props: any) => {
  return <div className="info">I acknowledge the contagious nature of the Coronavirus/COVID-19 and that the CDC and many other public health authorities still recommend practicing social distancing.</div>;
});
