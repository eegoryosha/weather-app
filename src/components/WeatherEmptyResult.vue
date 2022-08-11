<template>
    <div class="weather-empty">
        <img src="@/assets/images/weather.svg">
        <div class="weather-empty__text">Empty :(</div>
    </div>
</template>

<style lang="scss" scoped>
    .weather-empty {
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 50%;
        img {
            width: 100%;
            margin-bottom: 12px;
        }

        &__text {
            text-align: center;
            font-weight: 700;
            text-transform: uppercase;
        }
    }
</style>
