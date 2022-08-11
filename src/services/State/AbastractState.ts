import { provide, inject } from 'vue';

interface stateInterface<T> {
    value: T;
}

abstract class AbstractState {
    readonly key:string;
    stateSymbol: symbol;

    protected constructor(key: string) {
        this.key = key;
        this.stateSymbol = Symbol(key);
    }

    useState<T>(): stateInterface<T>|undefined {
        return inject(this.stateSymbol);
    }

    provideState<T extends unknown>(value:T):void {
        return provide(this.stateSymbol, value);
    }
}

export default AbstractState;
