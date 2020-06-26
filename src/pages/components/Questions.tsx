import React from 'react';
import { IOsSwitch } from '../components/IOsSwitch';
import { getQuestionList } from '../../services/covid-traffic';

import { withConditionalRender } from '../../enhancers/withConditionalRender';

export const Questions = withConditionalRender((props: any) => {
  const { questions, setQuestions } = props;

  React.useEffect(() => {
    getQuestionList().then((data: any) => {
      const questionInit = data.reduce((prev: any, question: { _id: string; q: string }) => {
        return { ...prev, [question.q]: true };
      }, {});

      setQuestions(questionInit);
    });
  }, []);

  const buildQuestion = (question: string) => {
    question = question ? question : '';
    return (
      <div className={`question-row`}>
        <div className="question-answer">
          <IOsSwitch item={question} parentState={questions} parentOnStateChange={setQuestions} />
        </div>
        <div className="question">{question}</div>
      </div>
    );
  };

  return (
    <div className="questionaire">
      <div className="section-title">Questionaire</div>
      {Object.keys(questions).map((question) => buildQuestion(question))}
    </div>
  );
});
