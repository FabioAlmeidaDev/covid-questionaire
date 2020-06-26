import React from 'react';
import { withState, compose } from 'recompose';
import withDisplay from './withDisplay';

export const withConditionalRender = (WrappedComponent: any) => (props: any) => {
  const { display = true, children } = props;
  return display ? <WrappedComponent {...props}>{children}</WrappedComponent> : null;
};
