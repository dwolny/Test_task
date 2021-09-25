export interface Vehicle {
    lat: number;
    lang: number;
    id: string;
    firstName: string;
    lastName: string;
    vin: string;
    tip: number,
    time: {
        hours?: number;
        minutes?: number;
        stopTime?: number;
    }
}