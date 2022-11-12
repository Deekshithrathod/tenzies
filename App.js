import React from "react";
import Die from "./components/Die";
import ScoreBoard from "./components/ScoreBoard";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollsCount, setRollsCount] = React.useState(0);

  const [topFive, setTopFive] = React.useState(
    JSON.parse(localStorage.getItem("tenzies-sb-tf")) || []
  );
  const [currTime, setCurrTime] = React.useState();

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setTopFive((prevState) => {
        console.log("entered set Top Five list:Line22");
        const newState = [
          ...prevState,
          {
            rank: 111,
            time: new Date() - currTime,
            rolls: rollsCount,
          },
        ];
        newState.sort((a, b) => (a.time > b.time ? 1 : -1));
        // console.log(newState);
        localStorage.setItem(
          "tenzies-sb-tf",
          JSON.stringify(newState.slice(0, 5))
        );
        return newState.slice(0, 5);
      });
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setRollsCount((prevCount) => {
        if (prevCount === 1) {
          setCurrTime(new Date());
        }
        return prevCount + 1;
      });
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      console.log("won the game");

      setRollsCount(0);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="main">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls. This is the latest change
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        {<p>Rolls: {rollsCount} </p>}
      </main>

      <ScoreBoard topFive={topFive} />
    </div>
  );
}
