export interface AddHouseListing {
  cityId: number;
  listingTypeId: number;
  propertyTypeId: number;
  districtId: number;
  title: string;
  description: string;
  price: number;
  squareMeter: number;
  status: boolean;
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
  images: File[]; 
}
