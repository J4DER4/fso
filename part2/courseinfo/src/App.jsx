const Exercise = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Course = ({course}) => {
  // course has parts, parts has exercises, sum all exercises
  return(
    <div>
      <h2>{course.name}</h2>
      
      {course.parts.map(part =>
      <Exercise key={part.id} name={part.name} exercises={part.exercises}/>
      )}
      <p><strong>
        <img src="https://img.icons8.com/ios/50/000000/checked-2.png" alt="checked" width="20" height="20"/>
        Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
      </strong></p>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
      <Course key={course.id} course={course}/>
      )}

    </div>
  )
}

export default App