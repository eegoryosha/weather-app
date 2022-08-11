<template>
    <div class="weather-settings-button" @click="toggleSettingsActive">
        <img class="weather-settings-button__gear" v-if="!settingsActive.value" src="@/assets/images/settings.svg ">
        <img class="weather-settings-button__close" v-else src="@/assets/images/cross.svg ">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsActiveState from '@/services/State/SettingsActiveState';


export default defineComponent({
    name: 'WeatherSettingsSwitch',
    setup() {
        const settingsActiveState = new SettingsActiveState();
        const settingsActive = settingsActiveState.getProvide();

        const toggleSettingsActive = () => {
            if (!settingsActive) return;

            settingsActive.value = !settingsActive.value;
        };

        return {
            toggleSettingsActive, settingsActive
        };
    }
});
</script>

<style lang="scss" scoped>
    .weather-settings-button {
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
        img.weather-settings-button__close {
            width: 80%;
        }
        &:hover img.weather-settings-button__gear {
            transform: rotate(90deg) scale(1.1);
        }
    }



</style>
