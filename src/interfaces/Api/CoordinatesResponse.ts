import Json from '../Json';

interface CoordinatesResponse extends Json {
    country: string,
    lat: number,
    lon: number,
    name: string,
    state: string,
    local_names: {
        [key: string]: string
    }
}

export default CoordinatesResponse;
