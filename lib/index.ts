import { AbstractAppPaginator } from '@writetome51/abstract-app-paginator';
import { ArrayPaginator } from '@writetome51/array-paginator';
import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
import { GetPageBatch } from '@writetome51/get-page-batch';
import { PageLoader } from '@writetome51/page-loader';
import { PaginationBatchInfo } from '@writetome51/pagination-batch-info';
import { PaginationPageInfo } from '@writetome51/pagination-page-info';

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

export class AppPaginator extends AbstractAppPaginator {


	constructor(
		dataSource: {

			// The number of items `getBatch()` returns must match `itemsPerBatch`.  If
			// `isLastBatch` is true, it must only return the remaining items in the dataset
			// and ignore itemsPerBatch.

			getBatch: (
				batchNumber: number, itemsPerBatch: number, isLastBatch: boolean
			) => Promise<any[]>;

			// `dataTotal`: number of items in entire dataset, not the batch.
			// This must stay accurate after actions that change the total, such as searches.

			dataTotal: number;
		}

	) {
		super(
			dataSource,

			// This setup function specifies all the interface requirements and handles dependency
			// injection.  All the instances created are singletons to be shared.

			function (dataSource): void {

				let batchPaginator: {
					currentPage: any[], currentPageNumber: number, itemsPerPage: number, data: any[]
				};
				batchPaginator = new ArrayPaginator();


				let pageInfo: { itemsPerPage: number, totalPages: number };
				pageInfo = new PaginationPageInfo(dataSource, batchPaginator);
				this.__pageInfo = pageInfo;


				let batchInfo: {
					itemsPerBatch: number, pagesPerBatch: number, currentBatchNumber: number,
					currentBatchNumberIsLast: boolean
				};
				batchInfo = new PaginationBatchInfo(this.__pageInfo);
				this.__batchInfo = batchInfo;


				let bch2pgTranslator = new BatchToPageTranslator(this.__pageInfo, this.__batchInfo);


				let getPageBatch: {
					containingPage: (pageNumber) => Promise<any[]>,
					byForce_containingPage: (pageNumber) => Promise<any[]>
				};
				getPageBatch = new GetPageBatch(
					dataSource, this.__batchInfo, bch2pgTranslator
				);


				let pageLoader: {
					loadPage: (pageNumber) => Promise<void>,
					forceLoadPage: (pageNumber) => Promise<void>,
					loadedPage: any[]
				};
				pageLoader = new PageLoader(
					batchPaginator, bch2pgTranslator, getPageBatch
				);
				this.__pageLoader = pageLoader;

			}
		);
	}


}
