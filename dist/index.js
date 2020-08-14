import {AbstractBigDatasetPaginator} from '@writetome51/abstract-big-dataset-paginator';
import {getInstance_CurrentPage} from '@writetome51/current-page';
import {PaginationLoadInfo} from './pagination-load-info/index.js';
import {PaginationPageInfo} from './pagination-page-info/index.js';


/***************************
 BigDatasetPaginator is intended for pagination where all the data to be paginated can't be
 loaded in memory at once. Instead of only requesting one page of data at-a-time from the data
 source, the paginator has the option of requesting multiple pages of data to make requests
 more efficient.  You configure this with the functions `setItemsPerPage()` and
 `setItemsPerLoad()`. (A load is either the total number of items you want the app to have
 in memory at once, or the total number of items your data source is willing to give you at
 once —— whichever is less.)
 In the constructor you pass in a `dataSource` that returns data one load at-a-time.  It must
 also contain a `dataTotal`.
 ***************************/

export class BigDatasetPaginator extends AbstractBigDatasetPaginator {

	constructor(dataSource) {
		super(
			function(dataSource) {
				this.__pageInfo = new PaginationPageInfo(dataSource);
				this.__loadInfo = new PaginationLoadInfo(this.__pageInfo);
				this.__currentPage = getInstance_CurrentPage({
					dataSource,
					pageInfo: this.__pageInfo,
					loadInfo: this.__loadInfo
				});
			},
			[dataSource]
		);
	}
}
