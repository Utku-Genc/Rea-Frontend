export class ListingFilter {
    searchText: string | null = '';
    cityId: number | null = null;
    districtId: number | null = null;
    maxPrice: number | null = null;
    minPrice: number | null = null;
    minSquareMeter: number | null = null;
    maxSquareMeter: number | null = null;
    listingTypeId: number | null = null;
    listingStatus: boolean | null = null;
    propertyTypeId: number | null = null; // Arsa, ev gibi türler için
    date: Date | null = null; // İlanın eklenme tarihi
}
