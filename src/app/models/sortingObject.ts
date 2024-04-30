export interface SortingObject {
    sortBy: string |null; // Sıralama yapılacak sütun adı
    sortDirection: SortDirection |null; // Sıralama yönü (artan veya azalan)
  }
  
  export enum SortDirection {
    Ascending = 0,
    Descending = 1
  }