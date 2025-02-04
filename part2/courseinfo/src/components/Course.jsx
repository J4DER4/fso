import Exercise from './Exercise';

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

  export default Course;