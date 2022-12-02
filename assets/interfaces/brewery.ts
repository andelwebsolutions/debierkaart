export default interface Brewery {
    id: string;
    name: number;
    city: string;
    address: string;
    zipcode: string;
    $location_lat: number;
    location_lng: number;
    openOn: string[];
    distance: number;
}