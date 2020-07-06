export declare class PaginationPageInfo {
    private __dataSource;
    private __itemsPerPage;
    constructor(__dataSource: {
        dataTotal: number;
    });
    setItemsPerPage(value: number): void;
    getItemsPerPage(): number;
    getTotalPages(): number;
}
