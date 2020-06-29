import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, TextField, MenuItem, Paper, Button as MUIButton } from '@material-ui/core';

import { Password } from './components/Password';
import { Spinner } from './components/Spinner';
import { DatePicker } from './components/DatePicker';
import { registerAthlete } from '../services/athlete-traffic';
import { Header } from './components/Header';
import { Disclaimer } from './components/Disclaimer';
import { Notification } from './components/Snackbar';
import { Breadcrumb } from './components/Breadcrumb';
import { withConditionalRender } from '../enhancers/withConditionalRender';

import '../App.scss';

export const Register = (props: any) => {
  const initialState = { guardian: '', name: '', dob: '01/01/2010', group: '', fourDigitPin: '', password: '', email: '', phone_no: '', gym: 'APEX Athletics' };
  const [state, setState] = React.useState(initialState);
  const [spinner, setSpinner] = React.useState(false);
  const [notification, setNotification] = React.useState({ message: '', open: false, severity: 'success', onClose: () => {} });

  let history = useHistory();

  const groups = [
    {
      label: 'USAG - Level 1'
    },
    {
      label: 'USAG - Level 2'
    },
    {
      label: 'USAG - Level 3'
    },
    {
      label: 'USAG - Level 4'
    },
    {
      label: 'USAG - Level 5'
    },
    {
      label: 'USAG - Level 6'
    },
    {
      label: 'USAG - Level 7'
    },
    {
      label: 'USAG - Level 8'
    },
    {
      label: 'USAG - Level 9'
    },
    {
      label: 'USAG - Level 10'
    },
    {
      label: 'USAG - Elite'
    },
    {
      label: 'USAG - Level 1 (Boys)'
    },
    {
      label: 'USAG - Level 2 (Boys)'
    },
    {
      label: 'USAG - Level 3 (Boys)'
    },
    {
      label: 'USAG - Level 4 (Boys)'
    },
    {
      label: 'USAG - Level 5 (Boys)'
    },
    {
      label: 'USAG - Level 6 (Boys)'
    },
    {
      label: 'USAG - Level 7 (Boys)'
    },
    {
      label: 'USAG - Level 8 (Boys)'
    },
    {
      label: 'USAG - Level 9 (Boys)'
    },
    {
      label: 'USAG - Level 10 (Boys)'
    },
    {
      label: 'USAG - Elite (Boys)'
    },
    {
      label: 'Boys - JD'
    },
    {
      label: 'USAIGC - Copper 1'
    },
    {
      label: 'USAIGC - Copper 2'
    },
    {
      label: 'USAIGC - Bronze'
    },
    {
      label: 'USAIGC - Diamond'
    },
    {
      label: 'USAIGC - Silver'
    },
    {
      label: 'USAIGC - Gold'
    },
    {
      label: 'USAIGC - Platinum'
    },
    {
      label: 'USAIGC - Premier'
    },
    {
      label: 'Pre Team'
    },
    {
      label: 'Rec Class'
    },
    {
      label: 'TNT'
    },
    {
      label: 'Ninja'
    },
    {
      label: 'Tumbling'
    },
    {
      label: 'Cheerleading'
    },
    {
      label: 'College Athlete'
    },
    {
      label: 'Coach'
    },
    {
      label: 'Parent'
    },
    {
      label: 'Staff'
    },
    {
      label: 'Other'
    }
  ];

  // adding conditional display to button
  const Button = withConditionalRender(MUIButton);

  const resetForm = () => {
    setState(initialState);
  };

  const saveData = () => {
    setSpinner(true);
    registerAthlete(state)
      .then((data) => {
        setSpinner(false);
        if (!!data.error) {
          setNotification({ open: true, message: data.error, severity: 'error', onClose: () => {} });
        } else {
          resetForm();
          setNotification({
            open: true,
            message: 'Thank you! You have registered successfuly!',
            severity: 'success',
            onClose: () => {
              history.push('/');
            }
          });
        }
      })
      .catch((error) => {
        setSpinner(false);
      });

    // pre validate to make sure none of the answers are clicked yes
    // if yes to any, take action and save

    // Reset user and questions on save

    // saveAnswers(data)
    //   .then((data) => {
    //     setSpinner(false);
    //     if (!!data.error) {
    //       setNotification({ open: true, message: data.error, severity: 'error', onClose: resetData });
    //     } else {
    //       resetData();
    //       setNotification({ open: true, message: 'Thank you! Data saved successfuly!', severity: 'success', onClose: () => {} });
    //     }
    //   })
    //   .catch((error) => {
    //     setSpinner(false);
    //   });
  };
  const checkEmptyFields = () => {
    return !(state.guardian && state.name && state.password && state.phone_no && state.gym && state.group && state.fourDigitPin && state.dob);
  };

  const handleChange = (prop: any) => (event: any) => {
    setState({ ...state, [prop]: event.target.value });
  };

  return (
    <Container>
      <Spinner display={spinner} />
      <Header title="COVID-19 Athlete Registration" />
      <Breadcrumb label="Go back to COVID Triage Page" onClick={() => history.push('/')} />
      <Paper className="paper-padding">
        <Disclaimer />
      </Paper>
      <Paper className="paper-padding">
        <div className="form-row">
          <TextField className={`col-sm-8 col-xs-12${state.guardian ? '' : ' danger'}`} id="outlined-error-helper-text" label="Parent or Guardian (Athlete's name if 18yo or older)" value={state.guardian} variant="outlined" onChange={handleChange('guardian')} />
        </div>
        <div className="form-row">
          <TextField className="col-sm-8 col-xs-12" id="outlined-error-helper-text" label="Gymnast's Full Name" value={state.name} variant="outlined" onChange={handleChange('name')} />
        </div>
        <div className="form-row">
          <DatePicker className="col-sm-8 col-xs-12" label="Date of Birth" state={state} setState={setState} variant="outlined" />
        </div>
        <div className="form-row">
          <TextField className="col-sm-8 col-xs-12" id="outlined-error-helper-text" label="Gym" defaultValue="APEX Athletics" value={state.gym} variant="outlined" onChange={handleChange('gym')} />
        </div>
        <div className="form-row">
          <TextField select className="col-sm-8 col-xs-12" id="outlined-error-helper-text" label="Group" value={state.group} variant="outlined" onChange={handleChange('group')}>
            {groups.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="form-row">
          <TextField inputProps={{ inputMode: 'email' }} className="col-sm-8 col-xs-12" id="outlined-error-helper-text" label="Email" value={state.email} variant="outlined" onChange={handleChange('email')} />
        </div>
        <div className="form-row">
          <TextField inputProps={{ inputMode: 'tel' }} className="col-sm-8 col-xs-12" id="outlined-error-helper-text" label="Phone Number" value={state.phone_no} variant="outlined" onChange={handleChange('phone_no')} />
        </div>
        <div className="form-row">
          <Password name="password" maxLength={4} state={state} setState={setState} placeholder="4 Digit Pin" />
        </div>

        <div className="form-row">
          <Password name="fourDigitPin" maxLength={4} state={state} setState={setState} placeholder="Confirm 4 Digit Pin" error={state.password != state.fourDigitPin} />
        </div>
        <div className="form-row">
          <div className="answered-yes" style={{ display: !state.guardian ? 'flex' : 'none' }}>
            You must enter a guardian name to register
          </div>
          <Button variant="contained" color="primary" onClick={saveData} disabled={state.password != state.fourDigitPin || checkEmptyFields()} style={{ display: state.guardian ? 'flex' : 'none' }}>
            Register Athlete
          </Button>
        </div>
      </Paper>
      <Notification open={notification} setOpen={setNotification} />
    </Container>
  );
};

export default Register;
