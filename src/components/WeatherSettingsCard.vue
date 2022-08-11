<template>
    <div
        class="weather-settings-card"
        ref="card"
        :draggable="isDraggable"
        @mousedown.stop="changeDraggableActive(false)"
    >
        <div class="weather-settings-card__body">
            <div class="weather-settings-card__burger" @mousedown.stop="changeDraggableActive(true)">
                <img src="@/assets/images/burger.svg" draggable="false">
            </div>
            <div class="weather-settings-card__name">{{ weather.name }}, {{ weather.sys.country }}</div>
        </div>

        <div class="weather-settings-card__trash" @click="removeLocation">
            <img src="@/assets/images/trash.svg" draggable="false">
        </div>
    </div>
</template>

<script lang="ts">
import type WeatherResponse from '@/interfaces/Api/WeatherResponse';
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';

export default defineComponent({
    name: 'WeatherSettingCard',
    components: {

    },
    props: {
        weather: {
            type: Object as () => WeatherResponse,
            required: true
        }
    },
    setup(props, { emit }) {
        const card: Ref<HTMLElement | null> = ref(null);
        const isDraggable: Ref<boolean> = ref(false);

        const changeDraggableActive = (value: boolean) => {
            isDraggable.value = value;
        };

        const removeLocation = () => {
            emit('removeLocation', props.weather);
        };

        return {
            changeDraggableActive, card, isDraggable, removeLocation
        };
    }
});

</script>

<style lang="scss" scoped>
    .weather-settings-card {
        display: flex;
        justify-content: space-between;
        background-color: #EDEBE9;
        padding: 8px 10px;
        margin-bottom: 12px;
        width: 100%;

        &__body {
            display: flex;
            align-items: center;
        }
        &__name {
            font-size: 20px;
        }
        &__burger {
            width: 22px;
            margin-right: 10px;
            cursor: move;
        }
        &__trash {
            width: 18px;
            cursor: pointer;
        }
        &__burger, &__trash {
            display: flex;
            img {
                width: 100%;
            }
        }
    }
</style>
