import React from 'react';
import { Container, Paper, Button as MUIButton } from '@material-ui/core';
import moment from 'moment';

import { Search } from './components/Searchbar';
import { Questions } from './components/Questions';
import { saveAnswers } from '../services/covid-traffic';
import { PersonDetails } from './components/PersonDetails';
import { withConditionalRender } from '../enhancers/withConditionalRender';
import '../App.scss';

export const Home = (props: any) => {
  const [value, setValue] = React.useState({ _id: null, name: '', group: '', dob: '' });
  const [questions, setQuestions] = React.useState({});

  const getCurrentDate = (format = 'MM/DD/YYYY') => {
    let newDate = new Date();
    return moment(newDate).format(format);
  };

  // adding conditional display to button
  const Button = withConditionalRender(MUIButton);

  const saveData = () => {
    // pre validate to make sure none of the answers are clicked yes
    // if yes to any, take action and save
    const data = {
      userId: value._id,
      questions: questions
    };
    saveAnswers(data).then(() => console.log('DATA SAVED SUCCESSFULY'));
  };
  return (
    <Container>
      <Paper className="paper-padding">
        <h2>Covid-19 waiver</h2>
        <small className="danger">Must fill out this form prior to every class</small>
        <hr />
        <div className="date-formatted"> Today is {getCurrentDate('dddd, MMMM DD, YYYY')}</div>
        <Search value={value} setValue={setValue} display={!value.name} />
        <PersonDetails value={value} setValue={setValue} display={!!value.name} />
        <Questions questions={questions} setQuestions={setQuestions} display={!!value.name} />
        <div className="row">
          <Button variant="contained" color="primary" display={!!value.name} onClick={saveData}>
            Save Answers
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Home;
