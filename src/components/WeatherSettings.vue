<template>
    <div class="weather-settings">
        <div class="weather-settings__body">
            <div class="weather-settings__list">
                <weather-settings-title>Settings</weather-settings-title>
                <weather-settings-list>
                    <weather-settings-card
                        v-for="weather in weatherList"
                        :key="weather.name"

                        :weather="weather"

                        @removeLocation="$emit('removeLocation', weather)"
                        @drop.prevent="$emit('onDrop', weather)"
                        @dragstart.stop="$emit('onDragStart', weather)"
                        @dragover.prevent
                    />
                </weather-settings-list>
            </div>

            <div class="weather-settings__add">
                <weather-settings-title>Add location:</weather-settings-title>
                <weather-location-add :weatherList="weatherList" @addLocation="(value) => $emit('addLocation', value)"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import WeatherLocationAdd from '@/components/WeatherLocationAdd.vue';
import WeatherSettingsCard from '@/components/WeatherSettingsCard.vue';
import WeatherSettingsList from '@/components/WeatherSettingsList.vue';
import WeatherSettingsTitle from '@/components/WeatherSettingsTitle.vue';
import type WeatherResponse from '@/interfaces/Api/WeatherResponse';

export default defineComponent({
    name: 'WeatherSettings',
    components: {
        WeatherSettingsCard,WeatherSettingsList,
        WeatherSettingsTitle,
        WeatherLocationAdd
    },
    props: {
        weatherList: {
            type: Array as () => WeatherResponse[],
            required: true
        },
    },
});
</script>

<style lang="scss" scoped>
    .weather-settings {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #519CEA;
        &__title {
            font-weight: 700;
            font-size: 25px;
            margin-bottom: 18px;
        }
        &__body {
            padding: 10px;
        }
        &__button {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            img {
                width: 100%;
                transition: 0.3s;
            }
            img.weather-settings__close {
                width: 80%;
            }
            &:hover img.weather-settings__gear {
                transform: rotate(90deg) scale(1.1);
            }
        }
        &__add {
            position: absolute;
            bottom: 26px;
            width: calc(100% - 20px);
        }
        &__list {
            padding-bottom: 100px;
        }
    }
</style>
