import { useEffect, useState } from "react";

import { isValidObject, isValidString } from "../utility/Utils";

const useFilter = ({ searchData, searchValue }) => {
  const [filteredData, setFilteredData] = useState(searchData);

  useEffect(() => {
    if (!isValidString(searchValue)) {
      return;
    }
    handleFilter(searchValue);
  }, [searchValue]);

  const doesObjectContainValue = (objParam, valueParam) => {
    if (!isValidString(valueParam) || !isValidObject(objParam)) return;
    return Object.values(objParam).some((useObjValue) => {
      if (!isValidString(useObjValue)) return;
      return useObjValue.toLowerCase().includes(valueParam);
    });
  };

  const handleFilter = (searchValueParam) => {
    const searchValueLowerCased = searchValueParam.toLowerCase();
    const filteredItems = searchData.filter((item) => {
      return doesObjectContainValue(item, searchValueLowerCased);
    });
    setFilteredData(filteredItems);
  };

  return { filteredData };
};

export default useFilter;
