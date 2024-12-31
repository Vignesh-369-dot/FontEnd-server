import React, { useEffect, useState } from "react";

import { Badge, Button, HStack } from "@chakra-ui/react";

import { getUserListAPI } from "../../api-store";
import { USER_LIST_COLUMNS } from "../../script/tableColumns";

import DataTable from "../../components/custom/table-data";
import TableFilter from "../../components/custom/table-filter";
import useFilter from "../../hooks/useFilter";

const STATIC_DATA = {
  id: 209,
  firstName: "Added user",
  lastName: "Added",
  maidenName: "Smith",
  age: 28,
  gender: "female",
  email: "emily.johnson@x.dummyjson.com",
  phone: "+81 965-431-3024",
  username: "emilys",
  password: "emilyspass",
  birthDate: "1996-5-30",
  image: "https://dummyjson.com/icon/emilys/128",
  bloodGroup: "O-",
  height: 193.24,
  weight: 63.16,
  eyeColor: "Green",
  hair: {
    color: "Brown",
    type: "Curly",
  },
  ip: "42.48.100.32",
  address: {
    address: "626 Main Street",
    city: "Phoenix",
    state: "Mississippi",
    stateCode: "MS",
    postalCode: "29112",
    coordinates: {
      lat: -77.16213,
      lng: -92.084824,
    },
    country: "United States",
  },
  macAddress: "47:fa:41:18:ec:eb",
  university: "University of Wisconsin--Madison",
  bank: {
    cardExpire: "03/26",
    cardNumber: "9289760655481815",
    cardType: "Elo",
    currency: "CNY",
    iban: "YPUXISOBI7TTHPK2BR3HAIXL",
  },
  company: {
    department: "Engineering",
    name: "Dooley, Kozey and Cronin",
    title: "Sales Manager",
    address: {
      address: "263 Tenth Street",
      city: "San Francisco",
      state: "Wisconsin",
      stateCode: "WI",
      postalCode: "37657",
      coordinates: {
        lat: 71.814525,
        lng: -161.150263,
      },
      country: "United States",
    },
  },
  ein: "977-175",
  ssn: "900-590-289",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
  crypto: {
    coin: "Bitcoin",
    wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
    network: "Ethereum (ERC20)",
  },
  role: "admin",
};

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [errorAPI, setErrorAPI] = useState(false);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userList, setUserList] = useState({});

  const handleGetUserData = async (currentPageValue) => {
    setLoading(true);
    setErrorAPI(false);
    getUserListAPI(limit, currentPageValue)
      .then((res) => {
        setUserList(res);
      })
      .catch((err) => {
        console.log(err);
        setErrorAPI(true);
        setUserList();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetUserData(currentPage);
  }, []);

  const { users = [], total = 0 } = userList || {};

  const { filteredData = [] } = useFilter({ searchData: users, searchValue });
  const tableData = searchValue.length ? filteredData : users;

  const tablePageCount = searchValue.length
    ? Math.ceil(filteredData.length / 10)
    : Math.ceil(total / 10) || 10;

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
    handleGetUserData(page);
  };

  const handleAddStaticData = () => {
    const updatedUsers = [...users, STATIC_DATA];
    setUserList((prev) => ({
      ...prev,
      users: updatedUsers,
    }));
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUserList((prev) => ({
      ...prev,
      users: updatedUsers,
    }));
  };

  const column = USER_LIST_COLUMNS(handleDeleteUser);

  return (
    <div>
      <HStack wrap="wrap" justify="space-between" className="user-header">
        <h6>
          User list <Badge variant={"solid"}>Total : {total} users</Badge>
        </h6>
        <HStack wrap="wrap" justify="space-between">
          <TableFilter
            id="purchase-list-search"
            onChangeHandler={handleSearchChange}
            searchValue={searchValue}
            placeholder="Search"
          />

          <Button size={"xs"} onClick={() => handleAddStaticData()}>
            Add
          </Button>
          <Button size={"xs"} onClick={() => handleGetUserData(currentPage)}>
            Refresh
          </Button>
        </HStack>
      </HStack>
      <div className="user-table">
        <DataTable
          columns={column}
          data={tableData}
          isLoading={loading}
          isError={errorAPI}
          currentPage={currentPage}
          handlePagination={handlePagination}
          total={tablePageCount}
        />
      </div>
    </div>
  );
};

export default UserPage;
