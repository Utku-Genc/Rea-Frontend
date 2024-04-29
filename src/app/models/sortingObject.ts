export interface SortingObject {
    sortBy: string; // Sıralama yapılacak sütun adı
    sortDirection: SortDirection; // Sıralama yönü (artan veya azalan)
  }
  
  export enum SortDirection {
    Ascending = 'Ascending',
    Descending = 'Descending'
  }