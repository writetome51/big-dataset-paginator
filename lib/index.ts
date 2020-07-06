import { AbstractBigDatasetPaginator } from '@writetome51/abstract-big-dataset-paginator';
import { ArrayPaginator } from '@writetome51/array-paginator';
import { CurrentPage } from './current-page/lib';
import { LoadToPageTranslator } from './load-to-page-translator/lib';
import { PageLoadAccess } from './page-load-access/lib';
import { PaginationLoadInfo } from './pagination-load-info/lib';
import { PaginationPageInfo } from './pagination-page-info/lib';


/***************************
 BigDatasetPaginator is intended for a real-world web application.
 In the constructor you pass in a `dataSource` that returns data in loads.  Each load can
 contain multiple pages worth of data.  (A load is either the total amount of data you want the
 app to have loaded in memory at once, or the total amount of data the data source is willing to
 give you at once —— whichever is less.  Tell AppPaginator the load size with `setItemsPerLoad()`)
 ***************************/

export class BigDatasetPaginator extends AbstractBigDatasetPaginator {


	constructor(
		dataSource: {

			// The number of items `getLoad()` returns must match `itemsPerLoad`.  If
			// `isLastLoad` is true, it must only return the remaining items in the dataset
			// and ignore itemsPerLoad.

			getLoad: (
				loadNumber: number, itemsPerLoad: number, isLastLoad: boolean
			) => Promise<any[]>;

			// `dataTotal`: number of items in entire dataset, not the load.
			// This must stay accurate after actions that change the total, such as searches.

			dataTotal: number;
		}
	) {
		super(
			// This setup function specifies all the interface requirements and handles dependency
			// injection.  All the instances created are singletons to be shared.

			function (dataSource): void {

				let pageInfo: {
					setItemsPerPage: (num) => void,
					getItemsPerPage: () => number,
					getTotalPages: () => number
				};
				pageInfo = new PaginationPageInfo(dataSource);
				this.__pageInfo = pageInfo;


				let loadInfo: {
					setItemsPerLoad: (num) => void;
					getItemsPerLoad: () => number;
					setCurrentLoadNumber: (num) => void;
					getCurrentLoadNumber: () => number | undefined;
					currentLoadIsLast: () => boolean;
					getTotalLoads: () => number;
					getPagesPerLoad: () => number;
				};
				loadInfo = new PaginationLoadInfo(this.__pageInfo);
				this.__loadInfo = loadInfo;


				let load2pgTranslator = new LoadToPageTranslator(this.__pageInfo, this.__loadInfo);

				let pageLoadAccess: {
					getLoadContainingPage: (pageNumber) => Promise<any[]>;
					getRefreshedLoadContainingPage: (pageNumber) => Promise<any[]>;
				};
				pageLoadAccess = new PageLoadAccess(
					dataSource, this.__loadInfo, load2pgTranslator
				);

				let loadPaginator: {
					getPage: (pageNumber) => any[],
					data: any[]
				};
				loadPaginator = new ArrayPaginator();

				let currentPage: {
					get(): any[];
					set(pageNumber): Promise<void>;
					reset(pageNumber): Promise<void>;
				};
				currentPage = new CurrentPage(
					loadPaginator, load2pgTranslator, pageLoadAccess
				);
				this.__currentPage = currentPage;

			},

			[dataSource]
		);
	}


}
