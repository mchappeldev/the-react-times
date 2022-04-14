import { Link } from "react-router-dom";
import { SectionListProps } from "./../../Interfaces";

const SectionList = (props: SectionListProps) => {
  const categories = ["Arts", "Automobiles", "Books", "Business", "Fashion", "Food", "Health", "Home", "Insider", "Magazine", "Movies", "NYregion", "Obituaries", "Opinion", "Politics", "RealEstate", "Science", "Sports", "SundayReview", "Technology", "Theater", "T-Magazine", "Travel", "Upshot", "US", "World"];

  return (
    <nav className={props.menu ? "open" : ""}>
      {categories.map((category, i) => {
        return (
          <div key={i} className={category === props.selectedCategory ? "selected-category" : ""}>
            <Link to={`/${category}`} key={i}>
              {category}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default SectionList;
