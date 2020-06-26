import React from 'react';
import { Container, Paper, Button as MUIButton } from '@material-ui/core';
import moment from 'moment';

import { Search } from './components/Searchbar';
import { Questions } from './components/Questions';

import '../App.scss';
import { PersonDetails } from './components/PersonDetails';
import { withConditionalRender } from '../enhancers/withConditionalRender';

export const Home = (props: any) => {
  const [value, setValue] = React.useState({ name: '', group: '', dob: '' });
  const [questions, setQuestions] = React.useState({});

  const getCurrentDate = (format = 'MM/DD/YYYY') => {
    let newDate = new Date();
    return moment(newDate).format(format);
  };

  // adding conditional display to button
  const Button = withConditionalRender(MUIButton);

  return (
    <Container>
      <Paper className="paper-padding">
        <h2>Covid-19 waiver</h2>
        <small className="danger">Must fill out this form prior to every class</small>
        <hr />
        <div className="date-formatted"> Today is {getCurrentDate('dddd, MMMM DD, YYYY')}</div>
        <div>
          <Search value={value} setValue={setValue} display={!value.name} />
        </div>
        <PersonDetails value={value} display={!!value.name} />
        <Questions questions={questions} setQuestions={setQuestions} display={!!value.name} />
        <div className="row">
          <Button variant="contained" color="primary" display={!!value.name}>
            Save Answers
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Home;
