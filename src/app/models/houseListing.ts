export interface HouseListing {
    id: number;
    listingId: number;
    houseTypeName: string;
    listingTypeName: string;
    title: string;
    description: string;
    bathroomCount: number;
    livingRoomCount: number;
    roomCount: number;
    price: number;
    cityName: string;
    districtName: string;
    imagePath: string;
    date: string;
    squareMeter: number;
    buildingAge: number;
    hasGarden: boolean;
    hasElevator: boolean;
    hasFurniture: boolean;
    hasParking: boolean;
    hasBalcony: boolean;
    isInGatedCommunity: boolean;
  }
  