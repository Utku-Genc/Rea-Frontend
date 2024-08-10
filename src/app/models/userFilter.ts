export class UserFilter {
      searchText: string | null = '';      
      firstName: string | null = '';
      lastName: string | null = '';
      email: string | null = '';
      userId: number | null = null;
      status !: boolean;
      roleIds!: number[];
      minRegisterDate!: number; 
      maxRegisterDate!: number;
}