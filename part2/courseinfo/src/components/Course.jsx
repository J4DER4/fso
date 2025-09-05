const Part = ({ name, exercises }) => {
    return (
        <li>{name} {exercises}</li>
    )
}
const TotalExercises = ({ parts }) => {
    const totalSum = parts.reduce((sum, p) => sum + p.exercises, 0)
    return (
        <p > <strong> Number of exercises  {totalSum} </strong></p>
    )
}
const Course = ({ course }) => {


    return (
        <div>
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map(part =>
                    <Part key={part.id} name={part.name} exercises={part.exercises} />
                )}
            </ul>
            <TotalExercises parts={course.parts} />

        </div>

    )

}

export default Course
