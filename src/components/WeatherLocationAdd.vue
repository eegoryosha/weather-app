<template>
    <div class="weather-add">
        <div class="weather-add__input">
            <input class="weather-add__input-add" v-model="location" type="text">
            <div class="weather-add__error" v-if="validationError != ''">{{ validationError }}</div>
        </div>

        <div class="weather-add__button-add" @click="addLocation">
            <img src="@/assets/images/add.svg">
        </div>
    </div>
</template>

<script lang="ts">
import type WeatherResponse from '@/interfaces/Api/WeatherResponse';
import { defineComponent, ref } from 'vue';
import AddLocationHook from '@/hooks/AddLocationHook';

export default defineComponent({
    name: 'WeatherLocationAdd',
    props: {
        weatherList: {
            type: Array as () => WeatherResponse[],
            required: true
        },
    },
    setup(props, context) {
        const { location, validationError, addLocation } = new AddLocationHook(props.weatherList, context).initHook();

        return {
            addLocation, location, validationError,
        };
    },

});
</script>

<style lang="scss" scoped>
    .weather-add {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        &__button-add {
            height: 30px;
            cursor: pointer;
            img {
                height: 100%;
            }
        }
        &__input {
            width: 100%;
            margin-right: 10px;
            position: relative;
        }
        &__input-add {
            height: 30px;
            width: 100%;
            margin-bottom: 4px;
        }
        &__error {
            font-weight: 300;
            font-size: 13px;
            color: #fcdcdc;
            position: absolute;
            bottom: -19px;
        }
    }
</style>
