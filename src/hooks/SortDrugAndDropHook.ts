import WeatherResponse from '@/interfaces/Api/WeatherResponse';
import { SortDrugAndDropInit } from '@/interfaces/Hooks/SortDrugAndDropInterface';
import WeatherListLocalStorage from '@/services/LocalStorage/WeatherListLocalStorage';
import { ref, Ref } from 'vue';
import AbstractHook from './AbstractHook';

export default class SortDrugAndDropHook extends AbstractHook {
    weatherList: Ref<WeatherResponse[]>;
    constructor(weatherList: Ref<WeatherResponse[]>) {
        super();
        this.weatherList = weatherList;
    }

    initHook(): SortDrugAndDropInit  {
        const weatherListLocalStorage = new WeatherListLocalStorage();
        const dragCard: Ref<WeatherResponse | null> = ref(null);

        const onDragStart = (item: WeatherResponse) => {
            dragCard.value = item;
        };
        const onDrop = (dropCard: WeatherResponse) => {
            this.weatherList.value = this.weatherList.value.map((el: WeatherResponse) => {
                if (!dragCard.value) return;

                if (el.name == dropCard.name) {
                    return {...el, order: dragCard.value.order};
                }
                if (el.name == dragCard.value.name) {
                    return {...el, order: dropCard.order};
                }

                return el;
            }) as WeatherResponse[];

            weatherListLocalStorage.saveList(this.weatherList.value);
        };

        return {
            dragCard, onDragStart, onDrop
        };
    }
}
