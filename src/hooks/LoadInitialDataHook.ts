import SimpleUtils from '@/helpers/SimpleUtils';
import WeatherResponse from '@/interfaces/Api/WeatherResponse';
import WeatherApi from '@/services/Api/WeatherApi';
import WeatherListLocalStorage from '@/services/LocalStorage/WeatherListLocalStorage';
import { Ref } from 'vue';
import AbstractHook from './AbstractHook';

export default class LoadInitialDataHook extends AbstractHook {
    weatherList: Ref<WeatherResponse[]>;
    constructor(weatherList: Ref<WeatherResponse[]>) {
        super();
        this.weatherList = weatherList;
    }

    initHook(): void  {
        const weatherListLocalStorage = new WeatherListLocalStorage();
        const weatherApi = new WeatherApi();
        const storageList = weatherListLocalStorage.getList();

        if (storageList) {
            this.weatherList.value = storageList;
        } else {
            weatherApi.getUserWeather().then(response => {
                if (!response.success || !response.data) return;

                response.data.order = SimpleUtils.getOrder(this.weatherList.value);
                this.weatherList.value.push(response.data);
            });
        }
    }
}
