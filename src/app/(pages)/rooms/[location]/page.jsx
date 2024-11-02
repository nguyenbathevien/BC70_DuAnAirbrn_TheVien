import { getApiRoomByIdLocationAction } from '@/app/actions/service/roomApi';
import React from 'react';

const capitalizeWords = (str) => {
  return str
    .split('-')  
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  
    .join(' ');  
};
const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('-');
  return `${day}/${month}/${year}`;
};
const Location = async ({ params, searchParams }) => {
  const idLocation = params.location; 
  const selectedDate = searchParams.date ? JSON.parse(decodeURIComponent(searchParams.date)) : null;
  
  const locationSlug = searchParams.location ? decodeURIComponent(searchParams.location) : '';
  const locationName = capitalizeWords(locationSlug);  

  const getApiRoomLocation = await getApiRoomByIdLocationAction(idLocation);

  return (
    <div className="container">
      <h1>Danh sách phòng của {locationName} </h1>
      {selectedDate && (
        <p>
          Ngày đã chọn: {formatDate(selectedDate[0])} Đến {formatDate(selectedDate[1])}
        </p>
      )}
      <pre>{JSON.stringify(getApiRoomLocation, null, 2)}</pre>
    </div>
  );
};

export default Location;