import { useState } from "react";

const Display = ({ heading, anecdote, point }) => {
  return (
    <>
      <h1>{heading}</h1>
      <p>{anecdote}</p>
      <p>has {point} votes</p>
    </>
  );
};

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const initPoints = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initPoints);
  const [mostVotesIndex, setMostVotesIndex] = useState(0);
  const handleClick = (e) => {
    e.preventDefault();
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = async (e) => {
    e.preventDefault();
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    setMaxVotesAnecdote(copy);
  };

  const setMaxVotesAnecdote = (points) => {
    let maxVotes = Math.max(...points);
    for (let i in points) {
      if (points[i] === maxVotes) {
        setMostVotesIndex(i);
        break;
      }
    }
  };
  return (
    <div>
      <Display
        heading="Anecdote of the day"
        anecdote={anecdotes[selected]}
        point={points[selected]}
      />
      <div>
        <Button name="vote" handleClick={handleVote} />
        <Button name="next anecdote" handleClick={handleClick} />
      </div>
      <Display
        heading="Anecdote with most votes"
        anecdote={anecdotes[mostVotesIndex]}
        point={points[mostVotesIndex]}
      />
    </div>
  );
};

export default App;
