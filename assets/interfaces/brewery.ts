export default interface Brewery {
    id: string;
    name: number;
    city: string;
    address: string;
    zipcode: string;
    location_lat: number;
    location_lng: number;
    open_on: string[];
    open_today: boolean;
    distance: number;
}