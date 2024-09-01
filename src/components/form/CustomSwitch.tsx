import React from 'react';
import { Switch, FormControlLabel, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useField } from 'formik';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 25,
  padding: 0,
  marginLeft: 20,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(25px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#22007D',
        opacity: 1,
        border: 'none',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 21,
    height: 21,
    boxShadow: 'none',
  },
  '& .MuiSwitch-track': {
    borderRadius: 12.5,
    backgroundColor: '#b3b3b3',
    opacity: 1,
  },
}));

const CustomLabel = styled('span')(({ theme }) => ({
  marginLeft: 9, // Añade margen izquierdo de 9px
}));

interface Props {
  label: string;
  name: string;
  xs?: number;
}

export const CustomSwitchComponent = ({ label, name, xs = 15 }: Props) => {
  const [field, , helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.checked);
  };

  return (
    <Grid item xs={xs}>
      <FormControlLabel
        control={
          <CustomSwitch
            checked={field.value}
            onChange={handleChange}
          />
        }
        label={<CustomLabel>{label}</CustomLabel>} // Usa el componente CustomLabel
      />
    </Grid>
  );
};

export default CustomSwitchComponent;
