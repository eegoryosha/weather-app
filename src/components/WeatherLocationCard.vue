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
import { defineComponent, computed } from 'vue';
import type WeatherResponse from '@/interfaces/Api/WeatherResponse';
import WeatherInfo from '@/services/WeatherInfo';

export default defineComponent({
    name: 'WeatherLocationCard',
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
        border-bottom: 1px solid #9ac6f1;
        padding: 10px;
        font-size: 16px;

        &__location {
            font-weight: 700;
            font-size: 25px;
            width: calc(100% - 25px);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
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
            background: #70B0EF;
            padding: 10px 10px;
            border-radius: 10px;
        }
        &__info {
            line-height: 130%;
        }
        &__detailed-info {
            margin-bottom: 12px;
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
