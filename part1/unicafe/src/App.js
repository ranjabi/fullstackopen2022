import { useState } from 'react';
import Button from './components/Button';
import StatisticLine from './components/StatisticLine';

const Statistics = ({ good, neutral, bad, score }) => {
  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={good + neutral + bad} />
      <StatisticLine text='average' value={score / 3} />
      <StatisticLine text='positive' value={((good / (good + neutral + bad)) * 100) + ' %'} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [score, setScore] = useState(0);

  const goodHandler = () => {
    setGood(good + 1);
    setScore(score + 1);
  };

  const badHandler = () => {
    setBad(bad + 1);
    setScore(score - 1);
  };

  const neutralHandler = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodHandler}>good</button>
      <button onClick={neutralHandler}>neutral</button>
      <button onClick={badHandler}>bad</button>
      <h1>statistics</h1>

      {good + neutral + bad === 0 ? (
        'No feedback given'
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} score={score} />
      )}
    </div>
  );
};

export default App;
