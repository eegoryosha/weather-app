import SimpleUtils from '@/helpers/SimpleUtils';
import WeatherResponse from '@/interfaces/Api/WeatherResponse';
import { AddLocationInterfaceInit } from '@/interfaces/Hooks/AddLocationInterface';
import WeatherApi from '@/services/Api/WeatherApi';
import { ref, SetupContext } from 'vue';
import AbstractHook from './AbstractHook';

export default class AddLocationHook extends AbstractHook {
    setupContext: SetupContext;
    weatherList: WeatherResponse[];
    constructor(weatherList: WeatherResponse[], setupContext: SetupContext) {
        super();
        this.setupContext = setupContext;
        this.weatherList = weatherList;
    }

    initHook(): AddLocationInterfaceInit {
        const weatherApi = new WeatherApi();
        const location = ref('');
        const validationError = ref('');

        const addLocation = async () => {
            validationError.value = '';

            if (location.value.trim() == '') {
                validationError.value = 'cannot be is empty';

                return;
            }

            if (this.weatherList.length >= 7) {
                validationError.value = 'you can add a maximum of 7 locations';

                return;
            }

            const response = await weatherApi.getLocationWeather(location.value);
            if (!response.success || !response.data) {
                validationError.value = response.error?.message ?? 'Unknown error';

                return;
            }

            const isLocationExists = this.weatherList.find(el => el.sys.id == response.data?.sys.id);
            if (isLocationExists) {
                validationError.value = 'this location already exists';

                return;
            }

            response.data.order = SimpleUtils.getOrder(this.weatherList);
            location.value = '';

            this.setupContext.emit('addLocation', response.data);
        };

        return {
            location, validationError, addLocation
        };
    }
}
