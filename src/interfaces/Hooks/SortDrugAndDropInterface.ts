import { Ref } from 'vue';
import WeatherResponse from '../Api/WeatherResponse';

export interface SortDrugAndDropInit {
    dragCard: Ref<WeatherResponse | null>;
    onDragStart: (item: WeatherResponse) => void;
    onDrop: (dropCard: WeatherResponse) => void;
}
