//objects
const human = {
    name: {
        first: 'Peter',
        last: 'Parker'
        },
    age: 1,
    grades: [1, 2, 3],
    //function withn a object
    sayHello: function() {
        console.log('hello! My name is ' + this.name.first)
    }
}

// functions

const add = (a, b) => {
    return a + b
}

const square = x => {
    return x * x
}

human.growOlder = function() { //adding a function to an object
    this.age += 1
}

//mapping

const numbers = [1, 2, 3, 4, 5]
const squareNumbers = numbers.map(x => x * x)

//timeouts

setTimeout(human.sayHello, 1000) //timeout for 1 second, after 1 second it will call the function sayHello

//binding
    //binding sets the value of this in the function to the object that is passed to bind().
    //This is so that the function can access and will keep the object's properties
    //bind is permanent once it is set
setTimeout(human.sayHello.bind(human), 1000) 


//Classes

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    sayHello() {
        console.log('hello! My name is ' + this.name)
    }
}

const adam = new Person('Adam', 20)
const brian = new Person('Brian', 30)
adam.sayHello()

//BASELINES

    //main.jsx
    import ReactDOM from 'react-dom/client'
    import App from './App'

    ReactDOM.createRoot(document.getElementById('root')).render(<App />)

    //App.jsx
    import { useState } from 'react'

    const App = () => {

    return (
        <div>
        code here
        </div>
    )
    }

    export default App