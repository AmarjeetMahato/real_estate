/// <reference types="vite/client" />


export interface types{
    id: number;
    title: string;
    images: string[];
    bedroom: number;
    bathroom?: number;
    price: number;
    address: string;
    latitude: number;
    longitude: number;
}
