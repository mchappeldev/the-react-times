import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

const categories = ["arts", 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world']

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="Header">
        <h1>The React Times</h1>
        <div className='BottomRule' />
        <div className='BottomRule' />

      </header>
      <div className='Search'>Search...
      </div>
      <nav className='Nav'>
      {categories.map(function(category, i){
        return <div obj={category} key={i} >{category}</div>;
    })}
      </nav>
      <main className='Articles'>
        <div className='Card item-1'><a href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045" class="card">
            <div className='thumb'></div>
            <article>
              <h2>How to Conduct Remote Usability Testing</h2>
              <span>Harry Brignull</span>
            </article>
          </a></div>
        <div className='Card'>
        <a href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045" class="card">
            <div className='thumb'></div>
            <article>
              <h2>How to Conduct Remote Usability Testing</h2>
              <span>Harry Brignull</span>
            </article>
          </a>
        
        </div>
        <div className='Card'><article>Hello World!</article></div>
        <div className='Card'><article>Hello World!</article></div>
        <div className='Card'><article>Hello World!</article></div>
        <div className='Card'><article>Hello World!</article></div>
        <div className='Card'><article>Hello World!</article></div>
        <div className='Card'><article>Hello World!</article></div>
      </main>
      <footer className='Footer'>Created by: Michael Chappel</footer>
    </div>
  )
}

export default App
