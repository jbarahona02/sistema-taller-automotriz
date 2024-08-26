import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';

const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 50,   // Reduced width of the switch container
    height: 25,  // Reduced height of the switch container
    padding: 0,
    display: 'flex',
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(25px)',  // Adjusted position for the thumb when checked
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#22007D',
          opacity: 1,
          border: 'none',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: 21,  // Smaller width for the thumb (white circle)
      height: 21, // Smaller height for the thumb (white circle)
      boxShadow: 'none',
    },
    '& .MuiSwitch-track': {
      borderRadius: 12.5, // Adjusted border radius to fit the smaller switch
      backgroundColor: '#b3b3b3',
      opacity: 1,
    },
  }));

interface Props {
	label: string;
	value: boolean;
}

export const CustomSwitchComponent = ({...props}: Props) => {
  

  const handleChange = () => {
    console.log("");
  };

  return (
    <FormControlLabel
      control={
        <CustomSwitch
          checked={props.value}
          onChange={handleChange}
        />
      }
      label={props.label}
    />
  );
};

export default CustomSwitchComponent;
