import React from "react";
import Counter from "./components/Counter";
import Clicks from "./components/Clicks";
import UserForm from "./components/UserForm";

const App = () => {
  return (
    <>
      <Counter />
      <br />
      <hr />
      <Clicks />
      <br />
      <hr />
      <UserForm />
    </>
  );
};

export default App;