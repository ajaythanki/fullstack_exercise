/*
==================================================
Exercises 1.3.-1.5. starts
exercise: 1.1: course information step1
exercise: 1.2: course information step2
exercise: 1.3: course information step3
exercise: 1.4: course information step4
exercise: 1.5: course information step5
==================================================
*/

const Header = ({title}) => {
  console.log(title);

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
const Content = ({parts}) => {
  console.log(parts);
  return (
    parts.map(part => <p> {part.name} {part.exercises} </p>)
  );
};
const Total = ({parts}) => {
  console.log(parts);
  let sum = 0;
  parts.forEach(part => {
    sum += part.exercises
  });
  return <p>Number of exercises {sum}</p>;
};

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  );
};

function App() {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <>
      <Header title={course} />
      <Content parts={parts} />
      <Total parts={parts} />
      <Footer />
    </>
  );
}
export default App;

/*
==================================================
Exercises 1.1.-1.5. finish
exercise: 1.1: course information step1
exercise: 1.2: course information step2
exercise: 1.3: course information step3
exercise: 1.4: course information step4
exercise: 1.5: course information step5
==================================================
*/

/*
==================================================
component state, event handlers
==================================================
*/

// import React, { useState } from 'react'

// const Display = ({counter}) => <div>{counter}</div>

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// const App = () => {
//   const [ counter, setCounter ] = useState(0)
//   console.log('rendering with counter value', counter)

//   const increaseByOne = () => {
//     console.log('increasing, value before', counter)
//     setCounter(counter + 1)
//   }

//   const decreaseByOne = () => { 
//     console.log('decreasing, value before', counter)
//     setCounter(counter - 1)
//   }

//   const setToZero = () => {
//     console.log('resetting to zero, value before', counter)
//     setCounter(0)
//   }

//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button onClick={increaseByOne} text={'plus'}/>
//       <Button onClick={setToZero} text={'zero'}/>
//       <Button onClick={decreaseByOne} text={'minus'}/>
//     </div>
//   )
// }

// export default App

/*
==================================================
Complex state
==================================================
*/

// import React, { useState } from 'react'

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   })

//   const handleLeftClick = () => setClicks({...clicks, left: clicks.left+1})
//   const handleRightClick = () => setClicks({...clicks, right: clicks.right+1})

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   )
// }

// export default App
/*
==================================================
Complex state finish
==================================================
*/

/*
==================================================
Handling arrays, Conditional rendering 
==================================================
*/

// import React, { useState } from 'react'

// const History = ({allClicks}) => {

//   return <div>
//     {allClicks.length === 0 ? "the app is used by pressing the buttons" : `button press history: ${allClicks.join(' ')}`}
//   </div>
// }

// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text="left"/>
//       <Button onClick={handleRightClick} text="right"/>
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   )
// }

// export default App

/*
==================================================
Handling arrays, Conditional rendering finish
==================================================
*/