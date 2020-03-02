import { AbstractAppPaginator } from '@writetome51/abstract-app-paginator';


/***************************
 AppPaginator is intended for a real-world web application.  It automatically batchinates the full
 dataset in case it's huge.
 In the constructor you pass in a `dataSource` that returns data in batches.  Each batch can
 contain multiple pages worth of data.  (A batch is either the total amount of data you want the
 app to have loaded in memory at once, or the total amount of data the data source is willing to
 give you at once —— whichever is less.  Tell AppPaginator the batch size by setting the property
 `itemsPerBatch`.)  When the property `currentPageNumber` is given a value, this class requests
 from dataSource the batch that page is in. Then it places the items of the requested page in the
 property `currentPage`.
 ***************************/

export declare class AppPaginator extends AbstractAppPaginator {

	constructor(
		dataSource: {

			getBatch: (
				batchNumber: number, itemsPerBatch: number, isLastBatch: boolean
			) => Promise<any[]>;

			dataTotal: number;

		}
	);

}
