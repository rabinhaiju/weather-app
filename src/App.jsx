import React, { useEffect, useState } from 'react';
import { API_KEY } from './Components/Api';

const App = () => {
  const [city,setCity] = useState('Kathmandu');
  const [weatherData,setWeatherData] = useState(null);
  const [inputCity,setInputCity] = useState('')

  const KEY = API_KEY

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const fullyear = currentDate.getFullYear();
  const formatedDate = `${month} ${day}, ${fullyear}`;
  


  const getApi=async(cityName)=>{
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert(`Error fetching the API: ${error.message}`);
    }
  };

  useEffect(()=>{
    getApi(city)
  },[city])

  const handleInputSearch =(e)=>{
    setInputCity(e.target.value)
  }

  const GetWeatherData=()=>{
   setCity(inputCity)
    
  }


  return (
    <div className='bg-blue-900 h-[100vh] flex justify-center items-center'>
      <div className='text-white h-[600px] w-[400px] bg-slate-700 flex flex-col items-center pt-[40px]'>
        <p className='text-xl font-bold py-3'>{formatedDate}</p>
        {weatherData ? (
          <>
            <h3 className='text-3xl font-bold'>{weatherData.name}</h3>
            <img className='h-[200px] w-[200px] rounded-full my-6' src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
            <p className='text-6xl font-bold'>{Math.round(weatherData.main.temp)}°C</p>
            <p className='text-2xl font-bold py-6'>{weatherData.weather[0].description}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div>
          <input value={inputCity} onChange={handleInputSearch}  className='py-1 px-4 text-black' type="text" placeholder='Enter the city' />
          <button onClick={GetWeatherData}  className='bg-gray-400 text-black py-1 px-3 font-bold'>Get</button>
        </div>
      </div>
    </div>
  );
};

export default App;
