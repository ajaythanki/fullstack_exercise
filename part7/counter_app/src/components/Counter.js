import React from "react";
import { useCounter } from "../hooks/index";

const Counter = () => {
  const counter = useCounter();
  return (
    <div>
      <h1>Counter</h1>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>plus</button>
      <button onClick={counter.decrease}>minus</button>
      <button onClick={counter.zero}>zero</button>
    </div>
  );
};

export default Counter;
