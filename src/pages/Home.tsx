import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Container, Paper } from '@material-ui/core';
import { options } from '../data/persons';
import moment from 'moment';

import { IOsSwitch } from './components/IOsSwitch';

import '../App.scss';

// apis
import { getAll as getUserList } from '../services/athlete-traffic';
import { getQuestionList } from '../services/covid-traffic';

export const Home = (props: any) => {
  const [value, setValue] = React.useState({ name: '', group: '', dob: '' });
  const [athleteList, setAthleteList] = React.useState([]);
  const [questions, setQuestions] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    getUserList().then((data) => {
      setAthleteList(data);
    });

    getQuestionList().then((data) => {
      const questionInit = data.reduce((prev: any, question: { _id: string; q: string }) => {
        return { ...prev, [question.q]: true };
      }, {});

      setQuestions(questionInit);
    });
  }, []);

  const getCurrentDate = (format = 'MM/DD/YYYY') => {
    let newDate = new Date();
    return moment(newDate).format(format);
  };

  const personDetails = () => {
    if (value.name) {
      return (
        <div className="details">
          <div className="section-title">Details</div>
          <div>Name:{value.name}</div>
          <div>Age:{value.dob}</div>
          <div>Group:{value.group}</div>
        </div>
      );
    } else {
      return '';
    }
  };

  const buildQuestion = (question: string) => {
    question = question ? question : '';
    return (
      <div className={`question-row`}>
        <div className="question-answer col-sm-2">
          <IOsSwitch item={question} parentState={questions} parentOnStateChange={setQuestions} />
        </div>
        <div className="question col-sm-10">{question}</div>
      </div>
    );
  };
  return (
    <Container>
      <Paper className="paper-padding">
        <h2>Covid-19 waiver</h2>
        <small>Must fill out this form prior to every class</small>
        <hr />
        <div className="date-formatted"> Today is {getCurrentDate('dddd, MMMM DD, YYYY')}</div>
        <div>
          <Autocomplete
            value={value ? value : null}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setValue(newValue);
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={athleteList}
            // options={options.sort((a, b) => -b.name.localeCompare(a.name))}
            groupBy={(athlete) => athlete.group}
            getOptionLabel={(athlete) => athlete.name}
            renderInput={(params) => <TextField {...params} label="Athlete's Name" variant="outlined" />}
            className="col-sm-12 row"
          />
        </div>
        {personDetails()}
        {value ? (
          <div className="questionaire">
            <div className="section-title">Questionaire</div>
            {Object.keys(questions).map((question) => buildQuestion(question))}
          </div>
        ) : (
          ''
        )}
      </Paper>
    </Container>
  );
};

export default Home;
