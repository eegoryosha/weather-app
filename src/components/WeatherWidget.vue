<template>
    <div class="weather-widget">
        <weather-settings-switch/>
        <weather-settings
            v-if="settingsActive.value"
            :weatherList="sortedWeatherList"
            @addLocation="addLocation"
            @removeLocation="removeLocation"
            @onDrop="onDrop"
            @onDragStart="onDragStart"
        />
        <weather-location-list
            v-else
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
        const settingsActiveState = new SettingsActiveState();
        const settingsActive = settingsActiveState.value;
        const { weatherList, sortedWeatherList, addLocation, removeLocation } = new WeatherListHook().initHook();
        const { dragCard, onDragStart, onDrop } = new SortDrugAndDropHook(weatherList).initHook();
        new LoadInitialDataHook(weatherList).initHook();

        return {
            weatherList, dragCard, settingsActive, sortedWeatherList,
            addLocation, onDragStart, onDrop, removeLocation
        };
    }
});

</script>

<style lang="scss">
    @font-face {
        font-family: 'agency';
        src: url('../assets/fonts/agency/AGENCYR.TTF') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'agency';
        src: url('../assets/fonts/agency/AGENCYB.TTF') format('truetype');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }

    .weather-widget {
        box-sizing: border-box;
        font-family: agency;
        position: relative;
        width: 100%;
        max-width: 300px;
        min-height: 300px;
        border: 1px solid;
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

</style>
