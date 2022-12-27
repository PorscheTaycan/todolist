import React, { useState } from 'react';
import './Form.css';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Form = ({ value, onChange, onCreate, onKeyPress, getTitleList, pickerDate, setPickerDate }) => {

  return (
    <div className="form">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={pickerDate}
          onChange={setPickerDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <input className="customInput" value={value} onChange={onChange} onKeyPress={onKeyPress} />
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
      <div className="create-button" onClick={getTitleList}>
        가져오기
      </div>
    </div>

  );
};

export default Form;