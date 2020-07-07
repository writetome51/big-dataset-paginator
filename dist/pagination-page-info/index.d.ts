export declare class PaginationPageInfo {

	private __dataSource;
	private __itemsPerPage;


	constructor(
		__dataSource: {
			dataTotal: number;
		}
	);


	setItemsPerPage(num: any): void;

	getItemsPerPage(): number;

	getTotalPages(): number;

}
