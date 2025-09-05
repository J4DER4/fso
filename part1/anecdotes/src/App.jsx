import { useState } from 'react'

const AnecdoteChangeButton = ({ hook, len }) => {
    const handleClick = () => {
        const randNum = Math.floor(Math.random() * len)
        hook(randNum)
    }
    return (
        <button onClick={handleClick}> next anecdote </button>
    )

}

const AnecdoteVoteButton = ({ hook, selected, voteArray }) => {
    const handleVote = () => {
        const copy = [...voteArray]
        copy[selected] += 1
        hook(copy)
    }
    return (
        <button onClick={handleVote}>vote</button>
    )
}

const BestAnecdote = ({ voteArray, anecdotes }) => {
    const findBestIdx = () => {
        const max = Math.max(...voteArray)
        return voteArray.indexOf(max)
    }
    console.log(findBestIdx());
    return (
        <p>{anecdotes[findBestIdx()]}</p>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [voteArray, setVoteArray] = useState(new Array(anecdotes.length).fill(0))
    console.log(voteArray)

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <br />
            has {voteArray[selected]} votes
            <br />
            <AnecdoteVoteButton hook={setVoteArray} selected={selected} voteArray={voteArray}/>

            <AnecdoteChangeButton hook={setSelected} len={anecdotes.length} />

            <h1>Anecdote with most votes</h1>
            <BestAnecdote voteArray={voteArray} anecdotes={anecdotes} />

        </div>
    )
}


export default App
