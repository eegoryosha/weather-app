import LocalStorageEnums from '@/enums/LocalStorageEnums';
import WeatherResponse from '@/interfaces/Api/WeatherResponse';
import AbstractLocalStorage from './AbstractLocalStorage';

export default class WeatherListLocalStorage extends AbstractLocalStorage {
    constructor() {
        super(LocalStorageEnums.WEATHER_LIST);
    }

    saveList(list: WeatherResponse[]): void {
        this.setStorage(list);
    }
    getList(): WeatherResponse[] | null {
        return this.getStorage<WeatherResponse[]>();
    }
}
