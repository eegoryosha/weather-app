<template>
    <weather-widget></weather-widget>
</template>

<script lang="ts">
import WeatherWidget from '@/components/WeatherWidget.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'WeatherLocationCard',
    components: {
        WeatherWidget
    },
});

</script>
