//Standard Imports
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useArticleFetch, useDisplayedArticles } from "./hooks";
import "./App.css";

//Components
import Articles from "./components/Articles/Articles";
import SectionList from "./components/SectionList/SectionList";
import SearchBar from "./components/SearchBar/SearchBar";
import Footer from "./components/Footer/Footer";

//Interfaces
import { Article } from "./Interfaces";

function App() {
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [displayedArticleRange, setDisplayedArticleRange] = useState([0, 10]);
  let { selectedCategory = "Home" } = useParams();

  const handleMenu = () => {
    setCategoryMenu(!categoryMenu);
  };

  const { articles, filteredArticles, displayedArticles, searchString, searchMatches, pageArray, setDisplayedArticles, setSearchString, setFilteredArticles, setSearchMatches, setPageArray } = useArticleFetch(selectedCategory);

  useDisplayedArticles(setDisplayedArticles, articles, displayedArticleRange);

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
