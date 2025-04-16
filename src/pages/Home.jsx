import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const images = [
    { src: "img1.jpg", title: "hello1" },
    { src: "img2.jpg", title: "hello2" },
    { src: "img3.jpg", title: "hello3" }
  ]

  const [inx, setInx] = useState(0); 
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setInx(prev => prev === images.length - 1 ? 0 : prev + 1);  
    }, 5000);
    const API_KEY = '7668bf5132553e87b03d887c824cfe5d';
    const CITY = 'ansan';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

    const fetchWeather = async () => {
      try {
        const res = await axios.get(URL);
        console.log(res.data);
        setWeather(
          {
            temp: res.data.main.temp,
            description: res.data.weather[0].description,
            icon: res.data.weather[0].icon,
          }
        )
      } catch (error) {
        console.error('fetching Error!:', error);
      }
    }
    fetchWeather(); 
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className='home-container'>
      {
        images.map((img, idx) => (
          <div
            key={idx} 
            className={`slide ${inx === idx ? 'active' : '' }`}
            style= {{ backgroundImage: `url(${process.env.Public_URL}/images/${img.src})`}}
            >
              <h1 className={`slide-title ${inx === idx ? 'title-show' : ''}`}>
                {img.title}
              </h1>
          </div>
        ))
      }
      {
        weather && (
          <div className='weather'>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt={weather.description}
              referrerPolicy='no-referrer' 
              />
            <div>{weather.temp}℃</div>
            <div>{weather.description}</div>
          </div>
        )
      }
    </div>
  )
}

export default Home