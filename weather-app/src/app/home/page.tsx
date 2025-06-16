"use client"
import assets from 'assets'
import React, { ChangeEvent, useEffect, useState,KeyboardEvent} from 'react'
import styles from "./page.module.css"
import Image, { StaticImageData } from 'next/image'
import { WeatherDetails } from 'organisum'
import { IWeatherResponse } from 'model/weather'


const HomeScreen = () => {
    const api_key = "bf2b7306279e3abf8d43d99e7cce462b"
    const [text,setText] = useState("Chennai")
    const [icon,setIcon] = useState<string | StaticImageData>(assets.snow)
    const [temp,setTemp] = useState(0)
    const [city,setCity] = useState("Chennai")
    const [country,setCountry] = useState("IN")
    const [lat,setLat] = useState(0)
    const [long,setLong] = useState(0)
    const [humidity,setHumidity] = useState(0)
    const [wind,setWind] = useState(0)
    const [loading,setLoading] = useState(false)
    const [cityNotFound,setCityNotFound] = useState(false)
    const [error,setError] = useState("")

    const weatherIconMap: { [key: string]: StaticImageData } ={
    "01d":assets.sunny,
    "01n":assets.sunny,
    "02d":assets.cloud,
    "02n":assets.cloud,
    "03d":assets.rainy_day,
    "03n":assets.rainy_day,
    "04d":assets.rainy_day,
    "04n":assets.rainy_day,
    "09d":assets.heavy_rain,
    "09n":assets.heavy_rain,
    "010d":assets.heavy_rain,
    "010n":assets.heavy_rain,
    "013n":assets.snow,
    "013d":assets.snow,
}

const search = async() =>{
  setLoading(true)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`
 
  try{
   const  res = await fetch(url) 
   const data:IWeatherResponse  = await res.json();
   if(data.cod === "404"){
    console.error(data.message)
    setCityNotFound(true)
    setLoading(false)
    return
   }
   setHumidity(data.main.humidity)
   setLat(data.coord.lat)
   setLong(data.coord.lon)
   setWind(data.wind.speed)
   setTemp(Math.floor(data.main.temp))
   setCity(data.name)
   setCountry(data.sys.country)
   const weatherIconCode = data.weather[0].icon;
   setIcon(weatherIconMap[weatherIconCode])
   setCityNotFound(false)
  }
  catch(error){
  console.log(error)
  setError("An error occurred while fetching weather data")
  }finally{
    setLoading(false)
  }
}

  const handleCity = (e:ChangeEvent<HTMLInputElement>)=>{
      setText(e.target.value)
    }

    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) =>{
      if(e.key === "Enter"){
         search()
      }
    }

    useEffect(()=>{
      search()
    },[])

  return (
    <section className={styles.main}>
    <section className={styles.container}>
      <section className={styles.input_container}>
         <input className={styles.cityinput} type='text' placeholder='search city' value={text} onChange={handleCity} onKeyDown={handleKeyDown}></input>
         <section className={styles.seerch_icon}>
           <Image src={assets.search} alt="Search" width={20} height={20} onClick={()=>search()}/>
         </section>
      </section>
      {loading && <section className={styles.loading_message}>Loading</section>}
      {error && <section className={styles.error_message}>{error}</section>}
      {cityNotFound && <section className={styles.city_not_found}>City Not Found</section>}
      {!loading &&  !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city}  country={country} lat={lat} long={long} wind={wind} humidity={humidity}/>}
    </section>
    </section>
  )
}

export default HomeScreen