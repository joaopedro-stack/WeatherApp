import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faXmark } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [weather, setweather] = useState()
  const [weather5Days, setweather5Days] = useState()
  const [show5Days, setShow5Days] = useState(false);
  const inputref = useRef()

  const proximosdias = () => {
    setShow5Days(prev => !prev);
  }

  const unsplashkey = 'Ptmb-E2uEGJsrVW3RkO22s0toOk7xqV2Q0vgFUFKuIs'

  async function imgfundo(query = 'nature') {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: { query },
        headers: {
          Authorization: `Client-ID ${unsplashkey}`,
        },
      })

      const imageUrl = response.data.urls.full

      const img = new Image()
      img.onload = async () => {
        document.body.style.backgroundImage = `url(${imageUrl})`
        await axios.get(response.data.links.download_location, {
          headers: {
            Authorization: `Client-ID ${unsplashkey}`,
          },
        })
      }
      img.src = imageUrl
    } catch (error) {
      console.error('Erro ao carregar imagem do Unsplash:', error)
    }
  }

  useEffect(() => {
    imgfundo()
  }, [])

  async function searchCity() {
    try {
      const city = inputref.current.value
      await imgfundo(city)
      const key = "81b7395175479f221a218965843a49ac"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
      const url5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

      const apiInfo = await axios.get(url)
      const apiInfo5Days = await axios.get(url5days)

      setweather(apiInfo.data)
      console.log(weather)
      setweather5Days(apiInfo5Days.data)

    } catch (error) {
      alert("Cidade não encontrada, tente novamente!")
    }
  }


  return (
    <>
      <div className='box'>
        <div className='inputs'>
          <input ref={inputref} type="text" onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchCity();
            }
          }} placeholder='Digite o nome da Cidade' />
          <button onClick={searchCity}>Buscar</button>
        </div>
      </div>

      <div className="arrow">
        <FontAwesomeIcon
          className='btn'
          onClick={proximosdias}
          icon={show5Days ? '' : faAngleUp}
        />
      </div>

      {weather && (
        <div className={`boxToday ${!show5Days ? 'ativaToday' : ''}`}>
          <WeatherInformations weather={weather} />
        </div>
      )}

      {weather5Days && (
        <div className='content'>
          <div className={`box5Days ${show5Days ? 'ativa' : 'inativa'}`}>
            <FontAwesomeIcon className='x' onClick={proximosdias} icon="fa-solid fa-xmark" />
            {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
          </div>
        </div>
      )}


    </>
  )
}

export default App
