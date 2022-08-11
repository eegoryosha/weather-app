import Json from '@/interfaces/Json';

export default class SimpleUtils {
    static getStringifyData(data: Json | Json[]): string {
        return typeof data == 'string' ? data : JSON.stringify(data);
    }
    static tryParseJSON<T>(data: string): T | null {
        try {
            const value = JSON.parse(data);

            if (value && typeof value === 'object') {
                return value;
            }
            return null;
        }
        catch (value) {
            return null;
        }
    }
    static getOrder(list: any[]): number {
        const lastElement = list[list.length - 1];

        if (lastElement.order && typeof lastElement.order == 'number') {
            return list.length ? (list[list.length - 1].order + 1) : 1;
        } else {
            return list.length + 1;
        }
    }
}
