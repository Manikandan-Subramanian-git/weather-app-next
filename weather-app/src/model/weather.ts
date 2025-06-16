export interface IWeatherResponse {
  coord: ICoord
  weather: IWeather[]
  base: string
  main: IMain
  visibility: number
  wind: IWind
  clouds: IClouds
  dt: number
  sys: ISys
  timezone: number
  id: number
  name: string
  cod: string
  message:string
}

export interface ICoord {
  lon: number
  lat: number
}

export interface IWeather {
  id: number
  main: string
  description: string
  icon: string
}

export interface IMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

export interface IWind {
  speed: number
  deg: number
  gust: number
}

export interface IClouds {
  all: number
}

export interface ISys {
  country: string
  sunrise: number
  sunset: number
}
