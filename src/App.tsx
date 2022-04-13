import { useState, useEffect } from "react";
import "./App.css";
import { Link, Outlet, useParams } from "react-router-dom";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

//Normally we wouldn't store an API Key like this in the front end code, but due to the restraints of this project, we are using it here.
const API_KEY = "f6FfH5bEV1H6wCicaGGh88btsVSrAoKE";
const categories = ["Arts", "Automobiles", "Books", "Business", "Fashion", "Food", "Health", "Home", "Insider", "Magazine", "Movies", "NYregion", "Obituaries", "Opinion", "Politics", "RealEstate", "Science", "Sports", "SundayReview", "Technology", "Theater", "T-Magazine", "Travel", "Upshot", "US", "World"];

interface Multimedia {
  url: string;
}

interface Article {
  title: string;
  abstract: string;
  multimedia: Array<Multimedia>;
  short_url: string;
  byline: string;
  published_date: string;
}

function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [displayedArticleRange, setDisplayedArticleRange] = useState([0, 10]);
  const [searchString, setSearchString] = useState("");
  const [searchMatches, setSearchMatches] = useState(0);
  const [pageArray, setPageArray] = useState<number[]>([]);
  const [categoryMenu, setCategoryMenu] = useState(false);
  let { selectedCategory = "Home" } = useParams();

  const handleMenu = () => {
    setCategoryMenu(!categoryMenu);
  };

  useEffect(() => {
    fetch(`https://api.nytimes.com/svc/topstories/v2/${selectedCategory.toLowerCase()}.json?api-key=${API_KEY}`, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.json().then((data) => {
          const rawData = data.results.filter((article: Article) => article.title && article.multimedia);
          setArticles(rawData);
          setFilteredArticles(rawData);
          setDisplayedArticles(rawData.slice(displayedArticleRange[0], displayedArticleRange[1]));
          setSearchString("");
          setSearchMatches(rawData.length);
          setPageArray(Array.from(Array(Math.ceil(rawData.length / 10)).keys(), (x) => x + 1));
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedCategory, displayedArticleRange]);

  const filterArticles = (input: string) => {
    setSearchString(input);
    const results = articles.filter((article: Article) => article.title.toLowerCase().includes(input.toLowerCase()) || article.abstract.toLowerCase().includes(input.toLowerCase()));
    setFilteredArticles(results);
    setSearchMatches(results.length);
    setDisplayedArticles(results.slice(0, 9));
    setPageArray(Array.from(Array(Math.ceil(results.length / 10)).keys(), (x) => x + 1));
  };

  const selectPage = (i: number) => {
    const start = i * 10;
    const end = start + 10;
    setDisplayedArticleRange([start, end]);
    setDisplayedArticles(filteredArticles.slice(start, end));
  };

  return (
    <div className="app">
      <header>
        <h1>The React Times</h1>
        <div className="bottom-rule" />
      </header>
      <div className="filters">
        <input onChange={(e) => filterArticles(e.target.value)} placeholder="Search..." value={searchString}></input>
        <svg onClick={handleMenu} xmlns="http://www.w3.org/2000/svg" className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <nav className={categoryMenu ? "open" : ""}>
        {categories.map((category, i) => {
          return (
            <div className={category === selectedCategory ? "selected-category" : ""}>
              <Link to={`/${category}`} key={i}>
                {category}
              </Link>
            </div>
          );
        })}
      </nav>
      <main className="articles">
        {displayedArticles.map((article: Article, i) => {
          return (
            <div key={i} className="card">
              <a href={article.short_url}>
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(${article.multimedia[1].url})`,
                  }}
                ></div>
                <article>
                  <h2>{article.title}</h2>
                  <p>{article.abstract}</p>

                  <h3>
                    {article.byline} {dayjs.tz(article.published_date, "Pacific/Fiji").format("MM/DD/YYYY HH:mm A [FJT]")}
                  </h3>
                </article>
              </a>
            </div>
          );
        })}
      </main>
      <footer>
        <p>Created by: Michael Chappel</p>
        <div className="pagination">
          {pageArray.map((page, i) => {
            return (
              <div className="page-number" onClick={() => selectPage(i)}>
                {page}
              </div>
            );
          })}
        </div>
        <p>
          Matching Results: {searchMatches} of {articles.length} total
        </p>
      </footer>
    </div>
  );
}
export default App;
