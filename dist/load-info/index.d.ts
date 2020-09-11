export declare class LoadInfo {

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
