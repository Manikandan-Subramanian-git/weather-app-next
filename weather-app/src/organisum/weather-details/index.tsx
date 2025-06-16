import React, { Fragment } from 'react'
import Image, { StaticImageData } from 'next/image'
import styles from "./styles.module.css"
import assets from 'assets'

interface PropsWeatherDetails{
    icon:StaticImageData | string,
    temp:number,
    city:string,
    country:string,
    lat:number,
    long:number,
    humidity:number,
    wind:number
}

export const WeatherDetails = ({icon,temp,city,country,lat,long,wind,humidity}:PropsWeatherDetails) => {
  return (
    <Fragment>
    <section className={styles.image}>
        <Image src={icon} alt={""} />
    </section>
    <section className={styles.temp}>{temp}°C</section>
    <section className={styles.location}>{city}</section>
    <section className={styles.country}>{country}</section>
    <section className={styles.cord}>
        <section>
            <span className={styles.lat}>latitude</span>
            <span>{lat}</span>
        </section>
        <section>
            <span className={styles.long}>latitude</span>
           <span>{long}</span>
        </section>   
    </section>
    <section className={styles.data_conteiner}>
          <section className={styles.element}>
             <Image src={assets.humidity} alt='humidity' width={60} height={60}/>
             <section className={styles.data}>
                <section className={styles.humidity_percentage}>{humidity}%</section>
                <section className={styles.text}>Humidity</section>
             </section>
          </section>
          <section className={styles.element}>
             <Image src={assets.heavy_rain} alt='wind' width={60} height={60}/>
             <section className={styles.data}>
                <section className={styles.humidity_percentage}>{wind}km/h</section>
                <section className={styles.text}>Wind</section>
             </section>
          </section>
    </section>
   
    </Fragment>
  )
}

