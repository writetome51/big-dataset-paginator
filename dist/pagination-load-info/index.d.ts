import { BaseClass } from '@writetome51/base-class';


/********************
 Gives information about a dataset too big to be loaded all at once that
 is stored in memory one load at-a-time, with the intention of paginating the load.
 *******************/

export declare class PaginationLoadInfo extends BaseClass {

	private __pageInfo;
	private __itemsPerLoad;
	private __currentLoadNumber;


	constructor(
		__pageInfo: {
			getItemsPerPage: () => number;
			getTotalPages: () => number;
		}
	);


	setItemsPerLoad(value: number): void;


	getItemsPerLoad(): number;


	setCurrentLoadNumber(value: number): void;


	getCurrentLoadNumber(): number | undefined;


	currentLoadIsLast(): boolean;


	getTotalLoads(): number;


	getPagesPerLoad(): number;


	private __errorIfValueIsNotOneOrGreater;
	private __checkValueOf_itemsPerLoad;
	private __ensure_itemsPerLoad_isCompatibleWith_itemsPerPage;

}
