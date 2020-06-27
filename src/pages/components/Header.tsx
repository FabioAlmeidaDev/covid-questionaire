import React from 'react';
import moment from 'moment';

const getCurrentDate = (format = 'MM/DD/YYYY') => {
  let newDate = new Date();
  return moment(newDate).format(format);
};

export const Header = (props: any) => {
  const { title, subtitle } = props;

  return (
    <div className="row header-container">
      <div className="col-sm-6 col-xs-12 title">
        <h2>{title}</h2>
        <small className="info">{subtitle}</small>
      </div>
      <div className="date-formatted col-sm-6 col-xs-12"> Today is {getCurrentDate('dddd, MMMM DD, YYYY')}</div>
      <hr />
    </div>
  );
};
