import { useState } from "react";
import DetailCard from "./components/DetailCard";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
function App() {
  
  const API_KEY = process.env.REACT_APP_API_KEY

  const [noData, setNoData] = useState('Nenhum Local')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Local Desconhecido')
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.svg`)

  const handleChange = input => {
    const {value} = input.target
    setSearchTerm(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  const getWeather = async (location) => {
    setWeatherData([])

    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`

    try {
      let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${how_to_search}&appid=867b55f39685b3f76f9271185c821f3a&units=metric&cnt=5&exclude=hourly,minutely`)
      let data = await res.json()
      if(data.cod != 200) {
        setNoData('Location Not Found')
        return
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.list[0].weather[0]["icon"]}.svg`)
    } catch (error) {
      console.log('Erro encontrado :'+error)
    }
  }

  const myIP = (location) => {
    const {latitude, longitude} = location.coords
    getWeather([latitude, longitude])
  }

  return (
    <div className="bg-teal-900 flex items-center justify-center w-full h-full py-10">
      <div className="flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
          {/* form card section  */}
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3 className="my-auto mr-auto text-xl text-white font-bold shadow-md py-1 px-3 
            rounded-md bg-black bg-opacity-70">Previsões do Tempo </h3>
            <div className="flex p-2 text-gray-100 bg-black bg-opacity-70 rounded-lg">
            <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-2/3">
            <h1 className="text-white text-2xl mt-2">Sua previsão diaria </h1>
            <hr className="h-1 bg-white w-1/6 rounded-full my-4" />
            <form noValidate onSubmit={handleSubmit} className="flex justify-center w-full">
              <input type="text" 
                placeholder="Procure por um local ..." 
                className="relative rounded-xl py-2 px-3 w-2/3 bg-black bg-opacity-60 text-white placeholder-gray-200"
                onChange={handleChange} 
                required />
                <button type="submit" className="z-10">
                  <i className="fa fa-search text-white -ml-10 border-l my-auto z-10 cursor-pointer p-3" 
                  aria-hidden="true" type="submit"></i>
                </button>
              <i className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white" aria-hidden="true" onClick={() => {
                navigator.geolocation.getCurrentPosition(myIP)
              }}></i>
            </form>
          </div>
        </div>
        {/* info card section  */}
        <div className="w-2/4 p-5">
          <Header />
          <div className="flex flex-col my-35">
            {/* card jsx  */}
            {weatherData.length === 0 ? 
              <div className="container p-4 flex items-center justify-center  mb-auto">
                <h1 className="text-gray-300 text-2xl font-bold uppercase">{noData}</h1>
              </div> :
              <>
                <h1 className="text-3xl text-gray-800 mt-auto mb-4">Hoje</h1>
                <DetailCard weather_icon={weatherIcon} data={weatherData} />
                <h1 className="text-3xl text-gray-800 mb-4 mt-10">Mais da {city}</h1>
                <ul className="grid grid-cols-2  gap-2">
                  {weatherData.list.map( (days, index) => {
                    if(index > 0){
                    return (
                      <SummaryCard key={index} day={days} />
                    )
                  }
                  })}
                </ul>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;