import { useState } from 'react'


const StatisticLine = ({statistic, value}) => {
  return (
    <tr>
      <td>{statistic}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  if (good + neutral + bad === 0 ){ //no feedback
    return(
      <p>No feedback given</p>
    )
  }
 
  return(  //some feedback
    <table>
      <tbody>
      <StatisticLine statistic="good" value={good} />
      <StatisticLine statistic="neutral" value={neutral} />
      <StatisticLine statistic="bad" value={bad} />
      <StatisticLine statistic="all" value={good + neutral + bad} />
      <StatisticLine statistic="average" value={(good - bad) / (good + neutral + bad)} />
      <StatisticLine statistic="positive" value={(good / (good + neutral + bad)) * 100 + " %"} />
      </tbody>
    </table>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  //setting states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


return (
    <div>
    <h1>give feedback</h1>
    <Button onClick={() => setGood(good + 1)} text='good'/>
    <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
    <Button onClick={() => setBad(bad + 1)} text='bad'/>
      
    <h1>Statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
)
}

export default App