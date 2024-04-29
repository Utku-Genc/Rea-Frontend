export class HouseFilter {
    searchText: string  | null = '';
    roomCount: number | null = null;
    bathroomCount: number | null = null;
    livingRoomCount: number | null = null;
    listingTypeId: number | null = null;
    houseTypeId: number | null = null;
    cityId: number | null = null;
    districtId: number | null = null;
    maxPrice: number | null = null;
    minPrice: number | null = null;
    maxBuildAge: number | null = null;
    minSquareMeter: number | null = null;
    maxSquareMeter: number | null = null;
    hasGarden: boolean | null= false;
    hasElevator: boolean | null= false;
    hasFurniture: boolean | null= false;
    hasParking: boolean | null= false;
    hasBalcony: boolean | null= false;
    isInGatedCommunity: boolean | null= false
  }
  