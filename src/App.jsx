import { useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

function App() {
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const dateBuilder = () => {
        let d = new Date();
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    const fetchWeather = async (e) => {
        if (e.key === 'Enter') {
            const response = await fetch(
                `${BASE_URL}weather?q=${e.target.value}&appid=${API_KEY}&units=imperial`
            );
            const data = await response.json();
            setWeather(data);
            setLoading(false);
        }
    };
    return (
        <>
            <main id='main'>
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Search...'
                        onKeyDown={fetchWeather}
                    />
                </div>
                {typeof weather.main != 'undefined' && !loading && (
                    <div className='weather-wrap'>
                        <div className='location-box'>
                            <div className='location'>
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className='date'>
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className='weather-box'>
                            <div className='temp'>
                                {Math.round(weather.main.temp)}°f
                            </div>
                            <div className='weather'>
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
