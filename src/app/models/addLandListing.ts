export interface AddLandListing {
    cityId: number;
    listingTypeId: number;
    propertyTypeId: number;
    districtId: number;
    title: string;
    description: string;
    price: number;
    squareMeter: number;
    status: boolean;
    address: string;
    parcelNo: number;
    islandNo: number;
    sheetNo: number;
    floorEquivalent: boolean;
    images: File[]; 
  }
  