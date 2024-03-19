import React, { useState, ChangeEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormData {
  email: string;
  password: string;
}

function App() {
  const { handleSubmit, register, formState: { errors },trigger } = useForm<FormData>(); // Specify the FormData interface for useForm

  const onSubmit = (data: FormData) => {
    alert(data.email + " " + data.password); // Access data.email and data.password instead of values.email and values.password
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await trigger(e.target.name as "email" | "password" ); // Trigger validation for the changed input
  };

  const customValidation = (value: string) => { // Custom validation function
    return value.length > 8 || "Password must be longer than 8 characters";
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
 
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
 
  const handleButtonClick = () => {
    setShowDatePicker(!showDatePicker);
  };
 
  const handleDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSelectedDate(new Date(inputValue));
  };

  return (
    <div className="App">
     <form onSubmit={handleSubmit(onSubmit)}>
       <h1>Register</h1>
       <div className="formInput">
         <label>Email</label>
         <input
           type="email"
           {...register("email", {
             required: "Required",
            //  pattern: {
            //    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //    message: "invalid email address"
            //  }
              pattern: {
                            value: /^[a-zA-Z\s-]$/,
                            message: "Only letters are allowed"
                          },
           })}
        
           onBlur={onChange}
         />
         {errors.email && errors.email.message}
       </div>
       <div className="formInput">
         <label>Password</label>
         <input
           type="password"
           {...register("password", {
             required: "Required",
           
             validate:{
              //move to function
                isLongEnough: customValidation

             }
           })}
           onBlur={onChange}
         />
         {errors.password && errors.password.message}
       </div>

       <div>
        <input
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString() : ''}
          onChange={handleDateInputChange}
          placeholder="Select a date"
        />
        <button onClick={handleButtonClick}>
          {showDatePicker ? 'Close' : 'Open'} Date Picker
        </button>
      </div>
      {showDatePicker && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableMonthYearDropdown
        />
      )}
    
       <button type="submit">Submit</button>
     </form>
    </div>
  );
}

export default App;
