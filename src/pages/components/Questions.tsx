import React from 'react';
import { IOsSwitch } from '../components/IOsSwitch';
import { getQuestionList } from '../../services/covid-traffic';
import { withConditionalRender } from '../../enhancers/withConditionalRender';

export const Questions = withConditionalRender((props: any) => {
  const { questions, setQuestions } = props;

  // React.useEffect(() => {
  //   getQuestionList().then((data: any) => {
  //     console.log('Line 11 Questions.tsx');

  //     data.map((item: any) => (item['v'] = true));
  //     // setQuestions(data);
  //   });
  // }, []);

  return (
    <div className="questionaire">
      {questions.map((question: { _id: string; q: string; v: boolean }, index: number) => (
        <div className={`question-row row`} key={index}>
          <div className="question col-sm-10 col-xs-12">{question.q}</div>
          <div className="question-answer col-sm-2 col-xs-12">
            <IOsSwitch item={index} parentState={questions} parentOnStateChange={setQuestions} />
          </div>
        </div>
      ))}
    </div>
  );
});
