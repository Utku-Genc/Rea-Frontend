export interface UpdateHouse {
    cityId: number;
    listingTypeId: number;
    propertyTypeId: number;
    districtId: number;
    title: string;
    description: string;
    price: number;
    squareMeter: number;
    typeId: number;
    roomCount: number;
    bathroomCount: number;
    livingRoomCount: number;
    floorCount: number;
    currentFloor: number;
    hasGarden: boolean;
    hasBalcony: boolean;
    hasElevator: boolean;
    hasParking: boolean;
    hasFurniture: boolean;
    isInGatedCommunity: boolean;
    buildingAge: number;
    address: string;
    houseListingId: number;
    status: boolean
  }
  