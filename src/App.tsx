//Standard Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

//Components
import Articles from "./components/Articles/Articles";
import SectionList from "./components/SectionList/SectionList";
import SearchBar from "./components/SearchBar/SearchBar";
import Footer from "./components/Footer/Footer";

//Interfaces
import { Article } from "./Interfaces";

//Normally we wouldn't store an API Key like this in the front end code, but due to the restraints of this project, we are using it here.
const API_KEY = "f6FfH5bEV1H6wCicaGGh88btsVSrAoKE";

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
          setDisplayedArticles(rawData.slice(0, 10));
          setSearchString("");
          setSearchMatches(rawData.length);
          setPageArray(Array.from(Array(Math.ceil(rawData.length / 10)).keys(), (x) => x + 1));
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedCategory]);

  useEffect(() => {
    setDisplayedArticles(articles.slice(displayedArticleRange[0], displayedArticleRange[1]));
  }, [displayedArticleRange, articles]);

  const filterArticles = (input: string) => {
    setSearchString(input);
    const results = articles.filter((article: Article) => article.title.toLowerCase().includes(input.toLowerCase()) || article.abstract.toLowerCase().includes(input.toLowerCase()));
    setFilteredArticles(results);
    setSearchMatches(results.length);
    setDisplayedArticles(results.slice(0, 10));
    setPageArray(Array.from(Array(Math.ceil(results.length / 10)).keys(), (x) => x + 1));
  };

  return (
    <div className="app">
      <header>
        <h1>The React Times</h1>
        <div className="bottom-rule" />
      </header>
      <SearchBar onChange={(e: React.ChangeEvent<any>) => filterArticles(e.target.value)} placeholder="Search..." value={searchString} onClick={handleMenu} />
      <SectionList menu={categoryMenu} selectedCategory={selectedCategory} />
      <Articles displayedArticles={displayedArticles} />
      <Footer searchMatches={searchMatches} filteredArticles={filteredArticles} pageArray={pageArray} totalArticles={articles.length} setDisplayedArticleRange={setDisplayedArticleRange} setDisplayedArticles={setDisplayedArticles} />
    </div>
  );
}
export default App;
