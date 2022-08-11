<template>
    <div class="weather-widget">
        <weather-settings-switch/>
        <transition name="show-settings" >
            <weather-settings v-if="settingsActive.value"
                :weatherList="sortedWeatherList"
                @addLocation="addLocation"
                @removeLocation="removeLocation"
                @onDrop="onDrop"
                @onDragStart="onDragStart"
            />
        </transition>
        <weather-location-list
            class="weather-widget__locations custom-scroll"
            :class="{
                'weather-widget__settings-opened': settingsActive.value,
            }"
        >
            <weather-location-card
                v-for="weather in sortedWeatherList"
                :key="weather.name"
                :weather="weather"
            />
        </weather-location-list>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherSettingsSwitch from '@/components/WeatherSettingsSwitch.vue';
import WeatherLocationCard from '@/components/WeatherLocationCard.vue';
import WeatherLocationList from '@/components/WeatherLocationList.vue';
import WeatherSettings from '@/components/WeatherSettings.vue';
import SettingsActiveState from '@/services/State/SettingsActiveState';
import SortDrugAndDropHook from '@/hooks/SortDrugAndDropHook';
import LoadInitialDataHook from '@/hooks/LoadInitialDataHook';
import WeatherListHook from '@/hooks/WeatherListHook';

export default defineComponent({
    name: 'WeatherWidget',
    components: {
        WeatherLocationCard, WeatherSettings,
        WeatherLocationList, WeatherSettingsSwitch
    },
    setup() {
        const settingsActiveState = new SettingsActiveState();                                                      // global settings active flag
        const settingsActive = settingsActiveState.value;                                                           // reactive flag
        const { weatherList, sortedWeatherList, addLocation, removeLocation } = new WeatherListHook().initHook();   // list of weather locations
        const { dragCard, onDragStart, onDrop } = new SortDrugAndDropHook(weatherList).initHook();                  // drag and drop actions
        new LoadInitialDataHook(weatherList).initHook();                                                            // load initial data for widget

        return {
            weatherList, dragCard, settingsActive, sortedWeatherList,
            addLocation, onDragStart, onDrop, removeLocation
        };
    }
});

</script>

<style lang="scss">
    $background: #519CEA;
    $light-background: #70B0EF;
    $text: #fff;

    @font-face {
        font-family: 'helvetica';
        src: url('../assets/fonts/helvetica/helvetica_light.otf') format('otf');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'helvetica';
        src: url('../assets/fonts/helvetica/helvetica_regular.otf') format('otf');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'helvetica';
        src: url('../assets/fonts/helvetica/helvetica_bold.otf') format('otf');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }
    input {
        border: none;
        &:focus-visible {
            border: none;
            outline: none;
        }
    }
    .weather-widget {
        box-sizing: border-box;
        font-family: helvetica;
        position: relative;
        width: 100%;
        max-width: 300px;
        min-height: 300px;
        background: $background;
        color: $text;

        &__locations {
            overflow-x: hidden;
            overflow-y: auto;
            max-height: 625px;
        }
        &__settings-opened {
            overflow-y: hidden;
        }
        & * {
           box-sizing: border-box;
        }
    }
    .icon-navigation {
        position: relative;
        padding-left: 20px;
        &::before {
            content: '';
            background: url('../assets/images/navigation.svg') center (center / contain) no-repeat;
            width: 15px;
            height: 15px;
            position: absolute;
            left: 0px;
        }
    }
    .icon-compass {
        position: relative;
        padding-left: 20px;
        &::before {
            content: '';
            background: url('../assets/images/compass.svg') center (center / contain) no-repeat;
            width: 15px;
            height: 15px;
            position: absolute;
            left: 0px;
        }
    }
    .custom-scroll {
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar-track {
            background: #eaeaea;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background: #cdcdcd;
        }
        &::-webkit-scrollbar {
            width: 7px;
            height: 0;
        }
    }

    .show-settings-enter-active {
        transition: all 0.3s ease-out;
    }

    .show-settings-leave-active {
        transition: all 0.3s ease-out;
    }

    .show-settings-enter-from,
    .show-settings-leave-to {
        transform: translateX(-100px);
        opacity: 0;
    }
</style>
