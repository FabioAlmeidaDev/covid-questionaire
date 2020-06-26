import * as React from 'react';
import { compose, setDisplayName } from 'recompose';

const withDisplay = (WrappedComponent: any) => (props: any) => {
  const { children, display } = props;
  return display ? <WrappedComponent {...props}>{children}</WrappedComponent> : '';
};

export default compose(setDisplayName('withDisplay'), withDisplay);
