export interface Multimedia {
  url: string;
}

export interface Article {
  title: string;
  abstract: string;
  multimedia: Array<Multimedia>;
  short_url: string;
  byline: string;
  published_date: string;
}

export interface CardProps {
  i: number;
  article: Article;
}

export interface ArticlesProps {
  displayedArticles: Array<Article>;
}

export interface FooterProps {
  filteredArticles: Array<Article>;
  searchMatches: number;
  pageArray: Array<number>;
  totalArticles: number;
  setDisplayedArticleRange(arr: Array<number>): any;
  setDisplayedArticles: any;
}

export interface SearchBarProps {
  onChange: any;
  placeholder: string;
  value: string;
  onClick: any;
}

export interface SectionListProps {
  menu: boolean;
  selectedCategory: string;
}
