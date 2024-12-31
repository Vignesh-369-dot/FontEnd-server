import React from "react";

import { Input } from "@chakra-ui/react";

const STYLES = { searchInput: { height: 30 } };

const TableFilter = ({
  id,
  onChangeHandler,
  placeholder,
  searchLabel,
  searchValue,
  type,
}) => {
  const PROPS_FOR_INPUT = {
    onChange: onChangeHandler,
    placeholder,
    style: STYLES.searchInput,
    type,
    value: searchValue,
  };
  return (
    <div>
      <label className="mx-1 mb-0" for={id}>
        {searchLabel}
      </label>
      <Input {...PROPS_FOR_INPUT} />
    </div>
  );
};

TableFilter.defaultProps = {
  id: "",
  onChangeHandler: () => console.log("DEFAULT_PROP"),
  placeholder: "",
  searchLabel: "Search",
  searchValue: "",
  type: "text",
};

export default TableFilter;
