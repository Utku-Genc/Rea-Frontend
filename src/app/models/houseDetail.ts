export interface HouseDetail {
  id: number;
  listingId: number;
  title: string;
  description: string;
  date: string;
  price: number;
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
  cityName: string;
  districtName: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  houseTypeName: string;
  listingTypeName: string;
}
