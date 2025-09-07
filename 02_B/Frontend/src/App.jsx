import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setjokes] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/jokes").then((res)=>{
      setjokes(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])

  return (
    <>
     <h1>Full Stack</h1>
     <p>Jokes:{jokes.length} </p>

     {
      jokes.map((joke, index)=>{
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>

      })
     }
    </>
  )
}

export default App