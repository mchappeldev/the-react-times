import { useState, useEffect } from "react";
//Interfaces
import { Article } from "./Interfaces";

const API_KEY = process.env.REACT_APP_API_KEY;

export function useArticleFetch(selectedCategory: string) {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchMatches, setSearchMatches] = useState(0);
  const [pageArray, setPageArray] = useState<number[]>([]);

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

  return { articles, filteredArticles, displayedArticles, searchString, searchMatches, pageArray, setDisplayedArticles, setSearchString, setFilteredArticles, setSearchMatches, setPageArray };
}

export function useDisplayedArticles(setDisplayedArticles: any, articles: Array<Article>, displayedArticleRange: any) {
  useEffect(() => {
    setDisplayedArticles(articles.slice(displayedArticleRange[0], displayedArticleRange[1]));
  }, [displayedArticleRange, articles, setDisplayedArticles]);
}
