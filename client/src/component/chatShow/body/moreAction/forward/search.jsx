import React, { useEffect } from "react";
import { useDebounce } from "../../../../../helper/use-debounce";

const Search = ({ setQuery }) => {
  const [text, setText, { signal, debouncing }] = useDebounce("");

  useEffect(() => {
    setQuery(text);
  }, [signal]);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <input
      onChange={handleChangeText}
      placeholder="Tìm kiếm người và nhóm."
      type="text"
      className="modalChangeName_input"
    />
  );
};

export default React.memo(Search);
