import React from 'react';
import { Container, Paper, Button as MUIButton } from '@material-ui/core';

import { Search } from './components/Searchbar';
import { Questions } from './components/Questions';
import { saveAnswers } from '../services/covid-traffic';
import { PersonDetails } from './components/PersonDetails';
import { Password } from './components/Password';
import { Spinner } from './components/Spinner';
import { Header } from './components/Header';
import { Disclaimer } from './components/Disclaimer';
import { Notification } from './components/Snackbar';
import { withConditionalRender } from '../enhancers/withConditionalRender';

import '../App.scss';

export const Home = (props: any) => {
  const [value, setValue] = React.useState({ _id: null, name: '', group: '', dob: '' });
  const [questions, setQuestions] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);
  const [password, setPassword] = React.useState({ password: '', showPassword: false });
  const [notification, setNotification] = React.useState({ message: '', open: false, severity: 'success', onClose: () => {} });

  // adding conditional display to button
  const Button = withConditionalRender(MUIButton);

  const resetQuestions = () => {
    questions.map((question: any) => {
      question.v = true;
    });
    setQuestions([...questions]);
  };

  const resetData = () => {
    if (!!value.name) {
      resetQuestions();
      setValue({ _id: null, name: '', group: '', dob: '' });
      setPassword({ password: '', showPassword: false });
    }
  };

  const saveData = () => {
    setSpinner(true);
    // pre validate to make sure none of the answers are clicked yes
    // if yes to any, take action and save

    // Reset user and questions on save
    const data = {
      userId: value._id,
      password: password.password,
      questions: questions
    };
    saveAnswers(data)
      .then((data) => {
        setSpinner(false);
        if (!!data.error) {
          setNotification({ open: true, message: data.error, severity: 'error', onClose: resetData });
        } else {
          resetData();
          setNotification({ open: true, message: 'Thank you! Data saved successfuly!', severity: 'success', onClose: () => {} });
        }
      })
      .catch((error) => {
        setSpinner(false);
      });
  };

  return (
    <Container>
      <Spinner display={spinner} />
      <Header title="COVID-19 Triage" subtitle="This form must be filled out and submitted before every class" />
      <Search value={value} setValue={setValue} display={!value.name} />
      <PersonDetails value={value} setValue={setValue} display={!!value.name} onClose={resetData} />
      <Paper className="paper-padding">
        <Disclaimer display={!value.name} />
        <Questions questions={questions} setQuestions={setQuestions} display={!!value.name} />
        <div className="row footer">
          <Password state={password} setState={setPassword} display={!!value.name} placeholder="4 Digit Pin" maxLength={4} className="password" />
          <Button variant="contained" color="primary" display={!!value.name} onClick={saveData} disabled={password.password.length < 4}>
            Save Answers
          </Button>
        </div>
      </Paper>
      <Notification open={notification} setOpen={setNotification} />
    </Container>
  );
};

export default Home;
