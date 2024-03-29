import React from "react";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const CarInventorySearchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    // Perform search action here
    console.log("Search submitted:", searchTerm);
  };

  return (
    <div>
      <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 ">
        SEE OUR INVENTORY
      </header>
      <div className="flex justify-center items-center">
        <TextField
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          onChange={handleChange}
          sx={{ width: 600 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default CarInventorySearchbar;
