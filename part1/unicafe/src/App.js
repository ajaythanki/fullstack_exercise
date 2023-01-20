import { useState } from "react";

/*
==================================================
Exercises 1.6.-1.11. starts

exercise: 1.6: unicafe step1
exercise: 1.7: unicafe step2
exercise: 1.8: unicafe step3
exercise: 1.9: unicafe step4
exercise: 1.10: unicafe step5
exercise: 1.11*: unicafe step6
==================================================
*/
const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ value, text }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const average = (good - bad) / totalFeedback;
  const positive = (good / totalFeedback) * 100 + "%";

  if (totalFeedback === 0) return <div>No Feedback Given</div>;
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={"Good:"} value={good} />
          <StatisticLine text={"Neutral:"} value={neutral} />
          <StatisticLine text={"Bad:"} value={bad} />
          <StatisticLine text={"All:"} value={totalFeedback} />
          <StatisticLine text={"Average:"} value={average} />
          <StatisticLine text={"Positive:"} value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text={"Give Feedback"} />
      <Button onClick={() => setGood(good + 1)} text={"Good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"Bad"} />

      <Header text={"Statistics"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

/*
==================================================
Exercises 1.6.-1.11. finish

exercise: 1.6: unicafe step1
exercise: 1.7: unicafe step2
exercise: 1.8: unicafe step3
exercise: 1.9: unicafe step4
exercise: 1.10: unicafe step5
exercise: 1.11*: unicafe step6
==================================================
*/