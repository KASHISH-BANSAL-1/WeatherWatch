import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/search.css';

const Search = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const apiKey = '23cec2d01085dedef5de9178b9e3fbdd';

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, []);

  const storeRecentSearch = (city) => {
    let searches = [...recentSearches];
    
    if (!searches.includes(city)) {
      searches.unshift(city);
      
      if (searches.length > 5) {
        searches.pop();
      }
      
      setRecentSearches(searches);
      localStorage.setItem('recentSearches', JSON.stringify(searches));
    }
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setError('');
      
      storeRecentSearch(city);

      navigate('/weather', { state: { data } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData();
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="search-container">
      <div className="app-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            aria-label="City name"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}

        <button className="history-button" onClick={toggleHistory}>
          {showHistory ? 'Hide History' : 'Show History'}
        </button>

        {showHistory && (
          <div className="recent-searches">
            <ul>
              {recentSearches.map((search, index) => (
                <li className='list' key={index} onClick={() => setCity(search)}>
                  {search}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
