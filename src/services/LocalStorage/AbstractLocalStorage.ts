import LocalStorageEnums from '@/enums/LocalStorageEnums';
import Json from '@/interfaces/Json';
import SimpleUtils from '@/helpers/SimpleUtils';

abstract class AbstractLocalStorage {
    private storageKey: LocalStorageEnums;
    constructor(storageKey: LocalStorageEnums) {
        this.storageKey = storageKey;
    }

    getKey(): LocalStorageEnums {
        return this.storageKey;
    }
    setStorage(data: Json | Json[]): void {
        localStorage.setItem(this.getKey(), SimpleUtils.getStringifyData(data));
    }
    getStorage<T>():T | null {
        const data = localStorage.getItem(this.getKey());

        if (data) {
            return SimpleUtils.tryParseJSON<T>(data);
        }
        return null;
    }
}

export default AbstractLocalStorage;
