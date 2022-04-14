import { SearchBarProps } from "./../../Interfaces";

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className="filters">
      <input onChange={props.onChange} placeholder={props.placeholder} value={props.value}></input>
      <svg onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </div>
  );
};

export default SearchBar;
