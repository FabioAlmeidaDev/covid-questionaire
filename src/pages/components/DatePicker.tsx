import '@date-io/date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker as DP } from '@material-ui/pickers';

import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

export const DatePicker = (props: any) => {
  // The first commit of Material-UI
  const { state, setState } = props;

  React.useEffect(() => {
    setState({ ...state, dob: new Date('2010-01-01T00:00:00') });
  }, []);

  const handleDateChange = (date: Date | null) => {
    setState({ ...state, dob: date });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={props.className}
        margin="normal"
        id="date-picker-dialog"
        label="Date of birth"
        format="MM/dd/yyyy"
        value={state.dob}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
        disableFuture={true}
      />
    </MuiPickersUtilsProvider>
    // <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //   <DP className={props.className} views={['year', 'month']} label="Year and Month" helperText="With min and max" minDate={new Date('1900-01-01')} value={state.dob} onChange={handleDateChange} />
    // </MuiPickersUtilsProvider>
  );
};
