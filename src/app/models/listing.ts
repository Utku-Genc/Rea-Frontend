export interface Listing {
  id: number;
  title: string;
  description: string;
  cityName: string;
  districtName: string;
  listingTypeName: string;
  propertyTypeName: string;
  price: number;
  date: string; // İlanın eklenme tarihi
  squareMeter: number;
  imagePath: string;
  status: boolean;
}
