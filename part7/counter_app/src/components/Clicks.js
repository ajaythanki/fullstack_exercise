import React from "react";
import { useCounter } from "../hooks/index";

const Clicks = () => {
  const left = useCounter();
  const right = useCounter();
  return (
    <>
      <h1>Clicks</h1>
      <div>
        {left.value}
        <button onClick={left.increase}>left</button>
        <button onClick={right.increase}>right</button>
        {right.value}
      </div>
    </>
  );
};

export default Clicks;
