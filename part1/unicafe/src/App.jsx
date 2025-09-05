import { useState } from 'react'

const PlusOneButton = ({ hook, value, text }) => {
    console.log('added to:', text, 'value:', value);
    return (
        <button onClick={() => hook(value + 1)}> {text} </button>
    )
}

const StatisticsLine = ({ text, value }) => {

    return (
    <tr>
            <td>{text}</td>
            <td>{value}</td>
    </tr>
    )

}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + bad + neutral
    //good 1, neutral 0, bad -1
    const average = (good - bad) / all
    const positive = good / all * 100

    if (all === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <table>
            <tbody>
                <StatisticsLine text='good' value={good}/>
                <StatisticsLine text='neutral' value={neutral}/>
                <StatisticsLine text='bad' value={bad}/>
                <StatisticsLine text='all' value={all}/>
                <StatisticsLine text='average' value={average}/>
                <StatisticsLine text='positive' value={positive}/>
                
            </tbody>
        </table>
    )
}
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <PlusOneButton hook={setGood} value={good} text='good' />
            <PlusOneButton hook={setNeutral} value={neutral} text='neutral' />
            <PlusOneButton hook={setBad} value={bad} text='bad' />

            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}



export default App
