import CoordinatesResponse from '@/interfaces/Api/CoordinatesResponse';
import WeatherResponse from '@/interfaces/Api/WeatherResponse';
import Response from '@/interfaces/Response';
import ApiInterface from './ApiInterface';

interface WeatherApiInterface extends ApiInterface {
    getCoordinates(location: string): Promise<Response<CoordinatesResponse[]>>,
    getWeather(lat: number, lon: number): Promise<Response<WeatherResponse>>,
    getLocationWeather(location: string): Promise<Response<WeatherResponse>>,
    getUserWeather(): Promise<Response<WeatherResponse>>
}


export default WeatherApiInterface;
