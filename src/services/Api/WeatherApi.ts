import type UserApiInterface from '@/interfaces/Api/classes/UserApiInterface';
import type WeatherApiInterface from '@/interfaces/Api/classes/WeatherApiInterface';
import type CoordinatesResponse from '@/interfaces/Api/CoordinatesResponse';
import type WeatherResponse from '@/interfaces/Api/WeatherResponse';
import type Response from '@/interfaces/Response';
import type { BadResponse } from '@/interfaces/Response';
import BaseApi from './BaseApi';
import UserApi from './UserApi';

export default class WeatherApi extends BaseApi implements WeatherApiInterface {
    private url = 'https://api.openweathermap.org';
    private apiKey = 'c33ff002abddc89ee53b042f06e2dc0e'
    private user: UserApiInterface;

    constructor() {
        super();

        this.user = new UserApi();
    }

    async getCoordinates(location: string): Promise<Response<CoordinatesResponse[]>>  {
        return this.request<CoordinatesResponse[]>(this.url + '/geo/1.0/direct?units=metric&q=' + location + '&limit=1&appid=' + this.apiKey);
    }

    async getWeather(lat: number, lon: number): Promise<Response<WeatherResponse>> {
        return this.request<WeatherResponse>(this.url + '/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + this.apiKey);
    }

    async getLocationWeather(location: string): Promise<Response<WeatherResponse>> {
        const locationCoordinatesResponse = await this.getCoordinates(location);
        if (locationCoordinatesResponse.success && locationCoordinatesResponse.data && locationCoordinatesResponse.data.length > 0) {
            const coordinates = locationCoordinatesResponse.data[0];
            return this.getWeather(coordinates.lat, coordinates.lon);
        }

        locationCoordinatesResponse.success = false;
        locationCoordinatesResponse.error = {
            message: 'location not found',
            status: 0
        };
        return locationCoordinatesResponse as BadResponse;
    }

    async getUserWeather(): Promise<Response<WeatherResponse>> {
        const userDataResponse = await this.user.getUserLocation();

        if (userDataResponse.success && userDataResponse.data) {
            const userCoordinates = userDataResponse.data;
            return this.getWeather(userCoordinates.latitude, userCoordinates.longitude);
        }

        return userDataResponse as BadResponse;
    }
}
