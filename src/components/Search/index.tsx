import { SearchIcon } from "../../assect/img/1index";
import "./Search.css";

type SearchProps = {
  value?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

function Search({
  value = "",
  type = "text",
  placeholder = "",
  onChange,
  ...props
}: SearchProps) {
  return (
    <div className="wrapper_search">
      <input
        spellCheck={false}
        className="text-box_search"
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        {...props}
      />
      <img src={SearchIcon} alt="" className="icon_search" />
    </div>
  );
}

export default Search;
