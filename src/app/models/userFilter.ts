export class UserFilter {
      searchText: string | null = '';      
      firstName: string | null = '';
      lastName: string | null = '';
      email: string | null = '';
      userId: number | null = null;
      status !: boolean | null;
      roleIds!: number[];
      minRegisterDate!: Date | null; 
      maxRegisterDate!: Date | null;
};

