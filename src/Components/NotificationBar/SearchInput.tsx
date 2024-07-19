import axios from 'axios';
import React, { useState, useEffect } from 'react'

export const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
    
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchQuery(value);
      handleSearch();  // Trigger search directly when input changes
      console.log(value, "searchQuery");
    };
  
    const handleSearch = async () => {
      try {
        // const response = await axios.get("http://localhost:3000/home/api/users/search?keyword=${searchQuery}");
        // setSearchResults(response.data.data);
        console.log('Search Query:', searchQuery);
        // console.log('Search Results:', response.data.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    
    useEffect(() => {
      // Fetch search results when the search query changes
      if (searchQuery.trim() !== '') {
        handleSearch();
      }
    }, [searchQuery]);

  return (
    <div className="search-input">
        <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
        />
    </div>
  )
}
