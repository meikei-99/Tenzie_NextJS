import Head from "next/head";
import React from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });
import LandingPage from "./LandingPage.js";
import Header from "@/components/Header.js";
import Die from "@/components/Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(
    function () {
      setHydrated(true);
      const allHeld = dice.every((die) => die.isHeld);
      const firstValue = dice[0].value;
      const allSameValue = dice.every((die) => die.value === firstValue);
      if (allHeld && allSameValue) {
        setTenzies(true);
      }
    },
    [dice]
  );
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  function generateNewDice() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return id === die.id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      holdDice={() => holdDice(die.id)}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
    />
  ));
  return (
    <>
      <Head>
        <title>Tenzie</title>
        <meta name="description" content="Tenzies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cardo&family=Carter+One&family=Permanent+Marker&family=Racing+Sans+One&family=Rock+Salt&family=Rubik+Vinyl&family=Satisfy&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="min-h-screen sm:h-screen w-screen grid place-content-center p-3">
        {tenzies && <Confetti />}

        <div className="flex flex-col items-center align-middle justify-center w-screen">
          <div className=" -ml-2 xs:-ml-4 sm:ml-0 -mt-0 sm:-mt-12 grid place-content-center w-fit relative ... ">
            <h1 className="text-7xl xs:text-8xl sm:text-9xl lg:text-10xl relative ...  text-black font-RacingSansOne">
              Tenzies
            </h1>

            <h1 className="text-7xl xs:text-8xl sm:text-9xl lg:text-10xl absolute ... top-1 left-2 xs:left-3 text-green-300 font-RacingSansOne">
              Tenzies
            </h1>
          </div>

          <div className="mt-2 text-center border border-black bg-teal-50 p-4 rounded-2xl font-light grid place-content-center text-sm md:text-base lg:text-lg w-[90%] md:w-[80%] lg:w-[70%]">
            Roll all of your dice and identify the number you want to achieve
            for all the dice. Re-roll all those that do not match your number.
            Click each dice to freeze it at its current value between rolls. The
            final goal is to get all ten of your dice to the same number.
          </div>
        </div>
        <div className="-mt-6 pt-16 gap-5 sm:gap-0 lg:gap-6 xl:gap-20 w-screen flex flex-col sm:flex-row place-content-center">
          <div className="grid place-content-center gap-6 -mt-4 sm:-mt-0 ">
            <Spline
              className=""
              scene="https://prod.spline.design/SQj9iZiwc9FQh2t2/scene.splinecode"
            ></Spline>

            <div className="w-[80%] ml-[9%] xs:ml-0 xs:w-full bg-teal-100 text-center border border-black rounded-2xl font-light">
              Rotate Me 360°
            </div>
          </div>
          <div className="gap-6 sm:gap-14 p-4 grid place-content-center ">
            <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-10 align-middle justify-center">
              {diceElements}
            </div>
            <div className="bg-white grid place-content-center">
              <button
                onClick={rollDice}
                className="text-lg md:text-xl lg:text-2xl font-Cardo shadow-sm shadow-green-700 px-12 py-1 rounded-2xl "
              >
                {tenzies ? "New Game" : "Roll"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
