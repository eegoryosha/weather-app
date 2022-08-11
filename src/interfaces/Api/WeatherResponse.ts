import Json from '../Json';

interface WeatherResponse extends Json {
    order: number,
    base: string,
    clouds: {
        all: number
    },
    cod: number,
    coord: {
        lon: number,
        lat: number
    },
    dt: number,
    id: number,
    name: string,
    timezone: number,
    visibility: number,
    rain: {
        [key: string]: number
    },
    snow: {
        [key: string]: number
    },
    main: {
        feels_like: number,
        grnd_level: number,
        humidity: number,
        pressure: number,
        sea_level: number,
        temp: number,
        temp_max: number,
        temp_min: number
    },
    sys: {
        country: string,
        id: number,
        sunrise: number,
        sunset: number,
        type: number
    },
    wind: {
        deg: number,
        gust: number,
        speed: number
    },
    weather: Weather[]
}

interface Weather extends Json {
    description: string,
    icon: string,
    id: number,
    main: string
}

export default WeatherResponse;
