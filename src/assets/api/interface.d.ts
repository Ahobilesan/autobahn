export interface POST {
    body: string;
    id: number;
    title: string;
    userId: number;
    url?: string;
    thumbnailUrl?: string
}

export interface RESULT {
    error: boolean;
    data?: POST | POST[]
}