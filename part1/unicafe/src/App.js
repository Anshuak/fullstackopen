import { useState } from "react";

const Statistics = ({ good, bad, neutral, all, average, positive }) => {
  if (good || bad || neutral)
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    );
  else
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {text === "positive" ? "%" : ""}
    </td>
  </tr>
);

const Button = ({ name, handleClick }) => (
  <button name={name} onClick={handleClick}>
    {name}
  </button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [all, setAll] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    let newGood = good;
    let newBad = bad;
    let newNeutral = neutral;
    if (e.target.name === "good") {
      newGood += 1;
      setGood(newGood);
    } else if (e.target.name === "neutral") {
      newNeutral += 1;
      setNeutral(newNeutral);
    } else {
      newBad += 1;
      setBad(newBad);
    }
    setAll(all + 1);
    setAverage((newGood - newBad) / (all + 1));
    setPositive(newGood / (all + 1));
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={handleClick} />
      <Button name="neutral" handleClick={handleClick} />
      <Button name="bad" handleClick={handleClick} />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positive={positive}
        all={all}
      />
    </div>
  );
};

export default App;
