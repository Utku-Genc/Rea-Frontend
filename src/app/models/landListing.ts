export interface LandListing {
    id: number;
    parcelNo: number;
    islandNo: number;
    sheetNo: number;
    floorEquivalent: boolean;
    address: string;
    listingId: number;
    title: string;
    description: string;
    cityName: string;
    districtName: string;
    listingTypeName: string;
    price: number;
    date: string
    squareMeter: number;
    imagePath: string;
}
