export interface AddHouseListingResponse {
    houseListingId: number
    listingId: number
    typeId: number,
    roomCount: number,
    bathroomCount: number,
    livingRoomCount: number,
    floorCount: number,
    currentFloor: number,
    hasGarden: boolean,
    hasBalcony: boolean,
    hasElevator: boolean,
    hasParking: boolean,
    hasFurniture: boolean,
    isInGatedCommunity: boolean,
    buildingAge: number,
    address: string
}