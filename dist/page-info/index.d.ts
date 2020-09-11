export declare class PageInfo {

	private __dataSource;
	private __itemsPerPage;


	constructor(
		__dataSource: {
			dataTotal: number;
		}
	);


	setItemsPerPage(num: number): void;


	getItemsPerPage(): number;


	getTotalPages(): number;
}
