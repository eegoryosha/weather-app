interface Response<T> {
    success: boolean;
    time: number;
    data?: T;
    error?: {
        message: string
        status: number
    };
}

export interface BadResponse {
    success: false,
    time: number,
    error: {
        message: string,
        status: number
    }
}

export default Response;
