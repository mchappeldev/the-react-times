import { FooterProps } from "./../../Interfaces";

const Footer = (props: FooterProps) => {
  const selectPage = (i: number) => {
    const start = i * 10;
    const end = start + 10;
    props.setDisplayedArticleRange([start, end]);
    props.setDisplayedArticles(props.filteredArticles.slice(start, end));
  };

  return (
    <footer>
      <p>Created by: Michael Chappel</p>
      <div className="pagination">
        {props.pageArray.map((page: number, i: number) => {
          return (
            <div className="page-number" onClick={() => selectPage(i)}>
              {page}
            </div>
          );
        })}
      </div>
      <p>
        Matching Results: {props.searchMatches} of {props.totalArticles} total
      </p>
    </footer>
  );
};

export default Footer;
