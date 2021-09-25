export interface Vehicle {
    lat: number;
    lang: number;
    id: string;
    driver: {
        firstName: string;
        lastName: string;
        cardNumber: number;
    }
    vehicle: {
        vin: string;
        avgFuel: number;
    }
    tip: number,
    time: {
        hours?: number;
        minutes?: number;
        stopTime?: number;
    },
    nextPause: {
        hours?: number;
        minutes?: number;
    }
}