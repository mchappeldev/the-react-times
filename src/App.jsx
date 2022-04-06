import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'


import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const categories = ["Arts", 'Automobiles', 'Books', 'Business', 'Fashion', 'Food', 'Health', 'Home', 'Insider', 'Magazine', 'Movies', 'NYregion', 'Obituaries', 'Opinion', 'Politics', 'RealEstate', 'Science', 'Sports', 'SundayReview', 'Technology', 'Theater', 'T-Magazine', 'Travel', 'Upshot', 'US', 'World']
//Normally we wouldn't store an API Key like this in the front end code, but due to the restraints of this project, we are using it here.
const API_KEY = 'f6FfH5bEV1H6wCicaGGh88btsVSrAoKE';

function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [searchString, setSearchString] = useState('');
  const [searchQuantity, setSearchQuantity] = useState(0);
  const [articleRange, setArticleRange] = useState([0,9]);
  const [pageArray, setPageArray] = useState([]);

  useEffect(() => {
    fetch(`https://api.nytimes.com/svc/topstories/v2/${selectedCategory.toLowerCase()}.json?api-key=${API_KEY}`, {
    "method": "GET",
    "headers": {}
  })
  .then(response => {
    response.json().then(data => {
      const rawData = data.results.filter(article => article.title && article.multimedia);
      setArticles(rawData);
      setFilteredArticles(rawData);
      setDisplayedArticles(rawData.slice(articleRange[0],articleRange[1]));
      setSearchString('');
      setSearchQuantity(rawData.length);
      setPageArray(Array.from(Array(Math.ceil(rawData.length/9)).keys(), x => x + 1));
    });
  })
  .catch(err => {
    console.error(err);
  });
  }, [selectedCategory])

  const filterArticles = (input) => {
    setSearchString(input);
    const filterTest = articles.filter(article => article.title.toLowerCase().includes(input.toLowerCase()))
    setFilteredArticles(filterTest);
    setSearchQuantity(filteredArticles.length);
    setDisplayedArticles(filterTest.slice(0,9));
    setPageArray(Array.from(Array(Math.ceil(filterTest.length/9)).keys(), x => x + 1));
  }

 const selectPage = (i) => {
   const start = i * 9;
   const end = start + 9;
   setArticleRange([start,end]);
   setDisplayedArticles(filteredArticles.slice(start,end));
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
      <nav className='Nav'>
      {categories.map((category, i) =>{
        return <div obj={category} key={i} onClick={()=> setSelectedCategory(category)} className={category === selectedCategory ? 'selectedCategory' : 'unselectedCategory'}>{category} </div>
    })}
      </nav>
      <main className='Articles'>
      {displayedArticles.map((article, i) =>{
        return (
        <div key={i} className='Card'>
          <a href={article.short_url}>
          <div className='thumb' style={{backgroundImage: `url(${article.multimedia[1].url})`}}></div>
        <article>
          <h2>{article.title}</h2>
          <p>{article.abstract}</p>
          <span>{article.byline} {dayjs.tz(article.published_date, 'Pacific/Fiji').format('MM/DD/YYYY HH:mm A [FJT]')}</span>

        </article>
      </a>
      </div>
        );
    
    })}
        
      </main>
      <footer className='Footer'>Created by: Michael Chappel
      <div className='Pagination'>
     {pageArray.map((page,i) => {
       return (
          <div className='PageNumber' onClick={()=>selectPage(i)}>{page}</div>
       );
     })}
    </div>
    
    <p>Articles matching Results: {searchQuantity} of {articles.length} total</p>
</footer>
    </div>
  ) 
}
export default App