import { ComputedRef, Ref } from 'vue';
import WeatherResponse from '../Api/WeatherResponse';

export interface WeatherListInit {
    weatherList: Ref<WeatherResponse[]>;
    sortedWeatherList: ComputedRef<WeatherResponse[]>;
    addLocation: (weather: WeatherResponse) => Promise<void>;
    removeLocation: (weather: WeatherResponse) => void;
}
