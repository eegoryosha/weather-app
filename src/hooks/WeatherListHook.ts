import WeatherResponse from '@/interfaces/Api/WeatherResponse';
import { WeatherListInit } from '@/interfaces/Hooks/WeatherListInterface';
import WeatherListLocalStorage from '@/services/LocalStorage/WeatherListLocalStorage';
import WeatherInfo from '@/services/WeatherInfo';
import { computed, ref, Ref } from 'vue';
import AbstractHook from './AbstractHook';

export default class WeatherListHook extends AbstractHook {
    constructor() {
        super();
    }


    initHook(): WeatherListInit  {
        const weatherListLocalStorage = new WeatherListLocalStorage();
        const weatherList: Ref<WeatherResponse[]> = ref([]);

        const sortedWeatherList = computed(() => {
            return WeatherInfo.getSortWeatherList(weatherList.value);
        });

        const addLocation = async (weather: WeatherResponse) => {
            weatherList.value.push(weather);

            weatherListLocalStorage.saveList(weatherList.value);
        };

        const removeLocation = (weather: WeatherResponse) => {
            weatherList.value = weatherList.value.filter(el => el.sys.id != weather.sys.id);

            weatherListLocalStorage.saveList(weatherList.value);
        };

        return {
            weatherList, sortedWeatherList, addLocation, removeLocation
        };
    }
}
