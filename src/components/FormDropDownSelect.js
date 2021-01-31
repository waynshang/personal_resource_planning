import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { isPresent } from '../Common';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormDropDownSelect(props) {
  const classes = useStyles();
  const [menuItem, setMenuItem] = React.useState(null);
  const [optionValue, setOptionValue] = React.useState('');

  const {label, title, options, helperText, disabled, error, readOnly,required, handleChange, value, noneOption } = props
  // const options = [{value,label,disabled}]
  useEffect(() =>{
    setMenuItem(
      options?.map((opt, index)=>{
        return <MenuItem key={index} disabled={opt.disabled} value={opt.value || null}>{opt.label || ''}</MenuItem>
      }) || null
    )
    }, [options])

  useEffect(() =>{
    setOptionValue(value)
  }, [value])

  return (
      <FormControl className={classes.formControl} disabled = {disabled || false} required= {required || false} error= {error || false}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value ={optionValue}         
          onChange={handleChange}
          // renderValue={(value) => `⚠️  - ${value}`}
          inputProps={{ readOnly }}
        >
          {noneOption &&
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          }
          {menuItem}
        </Select>
        {isPresent(helperText) && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
      )
  }