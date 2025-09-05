const Header = (p) => {
    return (
        <h1>{p.course}</h1>
    )
}

const Part = ({ name, exercise }) => {
    return (
        <p> {name} {exercise} </p>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {
                parts.map((p, index) =>(
                <Part key={index} name={p.name} exercise={p.exercises}/>
                ))
            }
        </div>
    )
}

const Total = (p) => {
    return (
        <p> Number of exercises {p.total} </p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10,
        }
        , {
            name: 'Using props to pass data',
            exercises: 7,
        }
        , {
            name: 'State of a component',
            exercises: 14,
        }
    ]

    console.log(parts[0])
    const totalSum = parts.reduce((sum, p) => sum + p.exercises, 0)
    return (
        <div>
            <Header course={course} />
            <Content parts={parts}/>
            <Total total={ totalSum}/>
        </div>
    )
}

export default App
