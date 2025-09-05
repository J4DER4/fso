import { useState, useEffect } from 'react'
import countryApi from './service/countryApi'
import './App.css'

const CountryDisplay = ({ search }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log('fetching:', search);

        if (!search) {
            setData(null)
            return
        }
        setLoading(true)

        countryApi
            .getCountry({ country: search })
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setData(null)
                setLoading(false)
            })
        console.log(search, 'Fetch done')

    }, [search])

    useEffect(() => {
        console.log('fetching weather');
        if (data && !weather) {
            const city = data.capital

            countryApi
                .getWeather({ city: city })
                .then(data => {
                    setWeather(data)
                })
                .catch(err => {
                    console.log(err)
                    setWeather(null)
                })

        } else {
            console.log('no data yet');
        }

        console.log('weather fetch done')
    }, [data])

    if (loading || !data || !weather) {
        return (
            <div>
                <p>Loading {search}...</p>
            </div>
        )
    }

    const name = data.name.common
    const capital = data.capital
    const area = data.area
    const languages = Object.values(data.languages)
    const img = data.flags.png
    const alt = data.flags.alt

    //weather
        const temp = weather.main.temp
        const wind = weather.wind.speed
        const weatherImageId = weather.weather[0].icon 
        const weatherImageUrl = 'https://openweathermap.org/img/wn/' + weatherImageId + '@2x.png'
        console.log(weatherImageUrl);

    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Area: {area}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map((lang, index) => <li key={index}>{lang}</li>)}
            </ul>
            <img src={img} alt={alt} />
            <h2>weather in {capital}</h2>
            <p>Temperature {temp} Celsius</p>
            <img src={weatherImageUrl} alt="weather icon"/>
            <p>wind {wind}</p>

        </div>
    )
}

const CountryNamesDisplay = ({ countryNames, search, setSearch }) => {

    if (!search) {
        return (
            <div>
                <p>Start by typing a name of a country</p>
            </div>
        )
    }

    const namesToDisplay = countryNames.filter(name =>
        name.toLowerCase().includes(search.toLowerCase())
    )

    if (namesToDisplay.length === 0) {
        return (
            <div>
                <p>No matching country found</p>
            </div>
        )
    }

    if (namesToDisplay.length === 1) {
        return (
            <CountryDisplay search={namesToDisplay[0]} />
        )
    }

    if (namesToDisplay.length > 10) {
        return (
            <div>
                <p>Too many names to display! Refine the search</p>
            </div>
        )
    }

    return ( // under 10 searches
        <div>
            <ul>
                {namesToDisplay.map(name => (
                    <li key={name}>
                        {name}
                        <button onClick={() => setSearch(name)}>show</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const App = () => {

    const [search, setSearch] = useState('')
    const [countryNames, setCountryNames] = useState(null)

    const handleSearch = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value)
    }

    const countryNamesHook = () => {
        console.log("Fetching country names");
        countryApi
            .getAllCountries()
            .then(data => {
                const names = data.map(country => country.name.common)
                setCountryNames(Object.values(names).sort())
            })
            .catch(err => {
                console.log(err)
                setCountryNames(null)
            })
    }
    // useEffect(countryNamesHook, [])
    if (!countryNames) {
        countryNamesHook()
    }



    return (
        <div>
            Find countries
            <input onChange={handleSearch} value={search} />
            <CountryNamesDisplay countryNames={countryNames} search={search} setSearch={setSearch} />
        </div>
    )
}
export default App
