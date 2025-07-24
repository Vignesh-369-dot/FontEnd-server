import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';

function SearchBox({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setTerm(val);
    onSearch(val);
  };

  return (
    <Input
      placeholder="Search by name, company, role, country..."
      mb={4}
      value={term}
      onChange={handleChange}
    />
  );
}

export default SearchBox;
