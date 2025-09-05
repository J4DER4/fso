import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/"
const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all/"

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='
const api_key = import.meta.env.VITE_WEATHER_API


const getCountry = ({ country }) => {
    const request = axios.get(baseUrl + country)
    return (
        request.then(res => res.data)
    )
}

const getAllCountries = () => {
    const request = axios.get(allUrl)
    return (
        request.then(res => res.data)
    )
}

const getWeather = ({ city }) => {
    const testurl2 = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + api_key + '&units=metric'
    const request = axios.get(testurl2)
    return (
        request.then(res => res.data)
    )
}





export default { getCountry, getAllCountries, getWeather }
