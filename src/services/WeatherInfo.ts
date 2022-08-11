import type WeatherResponse from '@/interfaces/Api/WeatherResponse';

export default class WeatherInfo {
    static getWeatherImage(code: string): string {
        return 'https://openweathermap.org/img/wn/' + code + '@4x.png';
    }

    static getDayTime(seconds: number): string {
        const timestamp = seconds * 1000;
        const date = new Date(timestamp);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return hours + ':' + minutes;
    }

    static getSortWeatherList(list: WeatherResponse[]): WeatherResponse[] {
        return list.sort((a, b) => {
            if (a.order > b.order) {
                return 1;
            }
            return -1;
        });
    }
}
