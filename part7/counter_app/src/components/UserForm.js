import React from "react";
import { useField } from "../hooks/index";

const UserForm = () => {
  const name = useField("text");
  const born = useField("date");
  const height = useField("number");

  return (
    <div>
      <h1>UserForm</h1>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};

export default UserForm;
