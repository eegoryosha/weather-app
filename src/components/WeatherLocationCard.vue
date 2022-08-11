<template>
    <div class="weather-location-card">
        <div class="weather-location-card__location">{{ weather.name }}, {{ weather.sys.country }}</div>
        <div class="weather-location-card__weather">
            <div class="weather-location-card__image">
                <img :src="image">
            </div>
            <div class="weather-location-card__temperature">{{ Math.round(weather.main.temp) }} °C</div>
        </div>
        <div class="weather-location-card__detailed-info">
            Feels like {{ Math.round(weather.main.feels_like) }}°C {{ weather.weather[0].description }}
        </div>
        <div class="weather-location-card__other-info">
            <div class="weather-location-card__info icon-navigation">{{ weather.wind.speed.toFixed(1) }}m/s</div>
            <div class="weather-location-card__info icon-compass">{{ weather.main.pressure }}hPa</div>
            <div class="weather-location-card__info">Humidity: {{ weather.main.humidity }}%</div>
            <div class="weather-location-card__info">Visibility: {{ (weather.visibility / 1000).toFixed(1) }}km</div>
            <div class="weather-location-card__info">Min: {{ Math.round(weather.main.temp_min) }} °C</div>
            <div class="weather-location-card__info">Max: {{ Math.round(weather.main.temp_max) }} °C</div>
        </div>
    </div>
</template>

<script lang="ts">
import type WeatherResponse from '@/interfaces/Api/WeatherResponse';
import WeatherInfo from '@/services/WeatherInfo';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
    name: 'WeatherLocationCard',
    components: {

    },
    props: {
        weather: {
            type: Object as () => WeatherResponse,
            required: true
        }
    },
    setup(props) {
        const image = computed(() => WeatherInfo.getWeatherImage(props.weather.weather[0].icon));

        return {
            image
        };
    }
});

</script>

<style lang="scss" scoped>
    .weather-location-card {
        width: 100%;
        border: 1px solid;
        padding: 10px;
        font-size: 20px;

        &__location {
            font-weight: 700;
            font-size: 25px;
        }
        &__weather {
            display: flex;
            align-items: center;
        }
        &__temperature {
            font-size: 30px;
            font-weight: 700;
        }
        &__other-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
        &__detailed-info {
            margin-bottom: 24px;
        }
        &__image {
            width: 150px;
            height: 150px;
            img {
                width: 100%;
            }
        }
    }
</style>
