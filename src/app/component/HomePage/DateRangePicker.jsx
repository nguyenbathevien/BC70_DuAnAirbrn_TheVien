import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const DateRangePicker = ({ onDateChange }) => {
  const presets = [
    { label: "Today", value: [moment(), moment()] },
    { label: "Yesterday", value: [moment().subtract(1, 'days'), moment().subtract(1, 'days')] },
    { label: "This Week", value: [moment().startOf('week'), moment().endOf('week')] },
    { label: "Last Week", value: [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')] },
    { label: "This Month", value: [moment().startOf('month'), moment().endOf('month')] },
    { label: "Last Month", value: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')] }
  ];

  const handleDateChange = (dates, dateStrings) => {
    if (onDateChange) {
      const formattedDates = dateStrings.map(date => moment(date).format("DD-MM-YYYY"));
      onDateChange(formattedDates); 
    }
  };

  return (
    <div className="date-range-picker">
      {/* <RangePicker presets={presets} onChange={handleDateChange}/> */}
      <DatePicker.RangePicker presets={presets} onChange={handleDateChange} defaultValue={[null, null]}/>
    </div>
  );
};

export default DateRangePicker;
