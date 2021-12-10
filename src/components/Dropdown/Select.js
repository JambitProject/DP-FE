import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Sdiv} from 'components';

export function BasicSelect({searchType, setSearchType, label="값"}) {
  

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    
      
        <FormControl sx={{width:"100%"}}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchType}
            
            onChange={handleChange}
          >
            <MenuItem value={"STACK"}>기술스택</MenuItem>
            <MenuItem value={"TITLE"}>{"제목, 닉네임"}</MenuItem>
          </Select>
        </FormControl>
     
    
  );
}