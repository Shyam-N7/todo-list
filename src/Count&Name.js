import React, { useState } from 'react'

const CountandName = () => {

    const [count, setCount] = useState(5)

    function increaseCount() {
        setCount(previous => previous + 1)
    }

    function decreaseCount() {
        setCount(previous => previous - 1)
    }

    const [name, setName] = useState('Earn')

    function handleNames() {
        const array = ['Earn','Grow','Give']
        const integer = Math.floor(Math.random() * array.length)
        setName(() => array[integer])
    }

  return (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={increaseCount}>Increase</button>
        <button onClick={decreaseCount}>Decrease</button>
    
        <h2>Lets {name} money</h2>
        <button onClick={handleNames}>Change Name</button>
    </div>
  )
}

export default CountandName