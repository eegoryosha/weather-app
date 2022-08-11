import AbstractState from './AbastractState';
import { reactive } from 'vue';

export default class SettingsActiveState extends AbstractState {
    static instance: SettingsActiveState|undefined;
    static stateKey = 'settingsActive';
    public value = reactive({
        value: false
    });

    constructor() {
        super(SettingsActiveState.stateKey);

        if (SettingsActiveState.instance) {
            return SettingsActiveState.instance;
        }

        SettingsActiveState.instance = this;
        this.provideState(this.value);
    }


    getProvide(): {value: boolean}|undefined {
        return this.useState<boolean>();
    }
}
