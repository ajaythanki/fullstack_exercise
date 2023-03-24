import Total from "./Total";
import Part from "./Part";
const Content = ({ parts }) => {
  let sum = 0;
  // const sum = parts.reduce( ( a, { exercises } ) => a + exercises, 0)
  return (
    <>
      {parts.map((part, i) => {
        sum += part.exercises;
        return <Part key={part.id} part={parts[i]} />;
      })}
      <Total sum={sum} />
    </>
  );
};
export default Content;
