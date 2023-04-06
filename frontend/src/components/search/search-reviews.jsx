// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';

// export const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState('');
//   const [sortBy, setSortBy] = useState('year');

//   const handleQueryChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleSortByChange = (event) => {
//     setSortBy(event.target.value);
//   };

//   const handleSearch = () => {
//     onSearch(query, sortBy);
//   };

//   return (
//     <div>
//       <TextField label="Search" value={query} onChange={handleQueryChange} />
//       <TextField
//         select
//         label="Sort By"
//         value={sortBy}
//         onChange={handleSortByChange}
//       >
//         <MenuItem value="year">Year</MenuItem>
//         <MenuItem value="term">Term</MenuItem>
//         <MenuItem value="usefulness">Usefulness</MenuItem>
//         <MenuItem value="interest">Interest</MenuItem>
//         <MenuItem value="difficulty">Difficulty</MenuItem>
//       </TextField>
//       <Button variant="contained" onClick={handleSearch}>
//         Search
//       </Button>
//     </div>
//   );
// };

