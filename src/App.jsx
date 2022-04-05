import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

const categories = ["Arts", 'Automobiles', 'Books', 'Business', 'Fashion', 'Food', 'Health', 'Home', 'Insider', 'Magazine', 'Movies', 'NYregion', 'Obituaries', 'Opinion', 'Politics', 'RealEstate', 'Science', 'Sports', 'SundayReview', 'Technology', 'Theater', 'T-Magazine', 'Travel', 'Upshot', 'US', 'World']
const API_KEY = 'f6FfH5bEV1H6wCicaGGh88btsVSrAoKE';
//Put this in environment variable

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [searchString, setSearchString] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuantity, setSearchQuantity] = useState(0);

  useEffect(() => {
    console.log(selectedCategory);
    fetch(`https://api.nytimes.com/svc/topstories/v2/${selectedCategory.toLowerCase()}.json?api-key=${API_KEY}`, {
    "method": "GET",
    "headers": {}
  })
  .then(response => {
    response.json().then(data => {
      let newArr = data.results.filter(article => article.title && article.multimedia);
      setArticles(newArr);
      setFilteredArticles(newArr);
      setSearchString('');
      setSearchQuantity(newArr.length);
    });
  })
  .catch(err => {
    console.error(err);
  });
  }, [selectedCategory])

  const filterArticles = (input) => {
    setSearchString(input);
    setFilteredArticles(articles.filter(article => article.title.toLowerCase().includes(input.toLowerCase())));
    setSearchQuantity(filteredArticles.length);
  }

 

  return (
    <div className="App">
      <header className="Header">
        <h1>The React Times</h1>
        <div className='BottomRule' />
        <div className='BottomRule' />

      </header>
      <input onChange={e => filterArticles(e.target.value)} className='Search' placeholder='Search...' value={searchString}>
      </input>
      <h2>Total Articles: {searchQuantity}</h2>
      <nav className='Nav'>
      {categories.map(function(category, i){
        return <div obj={category} key={i} onClick={()=> setSelectedCategory(category)} className={category === selectedCategory ? 'selectedCategory' : ''}>{category} </div>
    })}
      </nav>
      <main className='Articles'>
      {filteredArticles.map(function(article, i){
        return (
        // <div obj={article} key={i} >{article}</div>
        <div className='Card'>
          <a href={article.short_url}>
            {/* If multimedia does not exist, insert quality duck pic */}
          <div className='thumb' style={{backgroundImage: `url(${article.multimedia[1].url})`}}></div>
        <article>
          <h2>{article.title}</h2>
          <p>{article.abstract}</p>
          <span>{article.byline}</span>
        </article>
      </a>
      </div>
        );
    
    })}
        
      </main>
      <footer className='Footer'>Created by: Michael Chappel</footer>
    </div>
  )

  
  
}

export default App
