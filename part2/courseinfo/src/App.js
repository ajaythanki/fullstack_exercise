// import Notes from "./components/Notes"

// const App = ({ notes }) => {

//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map(note => <Notes key={note.id} note={note.content}/>)}
//       </ul>
//     </div>
//   )
// }

// export default App

/*
==================================================
Exercises 2.1.-2.5. starts
exercise: 2.1: course information step6
exercise: 2.2: Course information step7
exercise: 2.3*: Course information step8
exercise: 2.4: Course information step9
exercise: 2.5: separate module course
==================================================
*/

import Courses from "./components/Courses";

const App = () => {
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return courses.map((course)=><Courses key={course.id} course={course} />);
};

export default App;
