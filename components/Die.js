import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "black" : "white",
    color: props.isHeld ? "white" : "black",
  };
  return (
    <div
      onClick={props.holdDice}
      className=" text-center text-white text-3xl md:text-4xl lg:text-5xl font-Cardo "
    >
      <h1
        className={`hover:cursor-pointer rounded-2xl p-2 md:p-4 lg:p-6 xl:p-8 m-2  hover:scale-105 ${
          props.isHeld
            ? "bg-teal-100 text-black shadow-sm shadow-green-700"
            : "shadow-sm shadow-green-700 text-black"
        }`}
      >
        {props.value}
      </h1>
    </div>
  );
}
