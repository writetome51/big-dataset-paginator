import { AbstractAppPaginator } from '@writetome51/abstract-app-paginator';


/***************************
 AppPaginator is intended for a real-world web application.  It automatically
 batchinates the full dataset in case it's huge.
 ***************************/


export declare class AppPaginator extends AbstractAppPaginator {

	constructor(
		dataSource: {
			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
			dataTotal: number;
		}
	);
}
