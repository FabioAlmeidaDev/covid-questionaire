import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Paper as P, Button as MUIButton } from '@material-ui/core';

import Person from '@material-ui/icons/PersonAdd';
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
import { getQuestionList } from '../services/covid-traffic';

import '../App.scss';

export const Home = (props: any) => {
  const [value, setValue] = React.useState({ _id: null, name: '', group: '', dob: '' });
  const [questions, setQuestions] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);
  const [password, setPassword] = React.useState({ password: '' });
  const [notification, setNotification] = React.useState({ message: '', open: false, severity: 'success', onClose: () => {} });

  let history = useHistory();

  React.useEffect(() => {
    getQuestionList().then((data: any) => {
      console.log('Line 11 Questions.tsx');

      data.map((item: any) => (item['v'] = true));
      setQuestions(data);
    });
  }, []);

  // adding conditional display to button
  const Button = withConditionalRender(MUIButton);
  const Paper = withConditionalRender(P);

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
      setPassword({ password: '' });
    }
  };
  const countYes = (): number => {
    let count = 0;
    questions.map((question: any) => {
      if (question.v == 'true' || question.v == true) {
        count = count + 1;
      }
    });
    return count;
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
      <div className="add-new-name">
        <Button variant="outlined" color="primary" display={!value.name} onClick={() => history.push('/register')}>
          <Person fontSize="small" className="add-person-icon" />
          Click here to add a new name
        </Button>
      </div>
      <PersonDetails value={value} setValue={setValue} display={!!value.name} onClose={resetData} />
      <Paper className="paper-padding" display={!!value.name}>
        <Questions questions={questions} setQuestions={setQuestions} />
      </Paper>
      <div className="row footer" style={{ display: !value.name ? 'none' : '' }}>
        <div className="answered-yes" style={{ display: countYes() > 0 ? 'flex' : 'none' }}>
          You have answered yes to ({countYes()}) question(s). You are not allowed to enter the gym!
        </div>

        <Password state={password} setState={setPassword} placeholder="4 Digit Pin" maxLength={4} className="password" style={{ display: countYes() == 0 ? 'flex' : 'none' }} />
        <Button variant="contained" color="primary" onClick={saveData} disabled={password.password.length < 4} style={{ display: countYes() == 0 ? 'flex' : 'none' }}>
          Save Answers
        </Button>
      </div>
      <Disclaimer display={!value.name} />
      <Notification open={notification} setOpen={setNotification} />
    </Container>
  );
};

export default Home;
