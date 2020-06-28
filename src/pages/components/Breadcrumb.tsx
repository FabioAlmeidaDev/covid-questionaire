import React from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

export const Breadcrumb = (props: any) => {
  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-button" onClick={props.onClick}>
        <ChevronLeft fontSize="small" />
        <div>{props.label}</div>
      </div>
    </div>
  );
};
