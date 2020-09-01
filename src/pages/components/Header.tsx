import React from "react";
import moment from "moment";

const getCurrentDate = (format = "MM/DD/YYYY") => {
  let newDate = new Date();
  return moment(newDate).format(format);
};

const ABWeek = () => {
  let newDate = new Date();
  const weekno = parseInt(moment(newDate).format("w"));
  return weekno % 2 === 0 ? "A" : "B";
};

export const Header = (props: any) => {
  const { title, subtitle } = props;

  return (
    <div className="row header-container">
      <div className="col-sm-6 col-xs-12 title">
        <h2>{title}</h2>
        <small className="info">{subtitle}</small>
      </div>
      <div className="date-formatted col-sm-6 col-xs-12">
        <div>Today is {getCurrentDate("dddd, MMMM DD, YYYY")}</div>
        <div className={`week-number ${ABWeek() == "A" ? "red" : "blue"}`}>
          This is <span className={`week-letter`}>{ABWeek()}</span> week
        </div>
      </div>
      <hr />
    </div>
  );
};
