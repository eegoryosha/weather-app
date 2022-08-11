import { Ref } from 'vue';

export interface AddLocationInterfaceInit {
    location: Ref<string>;
    validationError: Ref<string>;
    addLocation: () => Promise<void>;
}
