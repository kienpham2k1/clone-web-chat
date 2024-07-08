export interface PageableProp {
    pageNo: number;
    pageSize: number;
    sortDirection: 'asc' | 'desc';
    sortBy: string;
}
