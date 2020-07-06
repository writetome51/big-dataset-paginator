import { AbstractBigDatasetPaginator } from '@writetome51/abstract-big-dataset-paginator';
/***************************
 BigDatasetPaginator is intended for pagination where all the data to be
 paginated can't be loaded in memory at once. Instead of only requesting
 one page of data at-a-time from the data source, the paginator has the
 option of requesting a bigger load, determined by the function
 `setItemsPerLoad()`.
 In the constructor you pass in a `dataSource` that returns data in loads.  Each load can
 contain multiple pages worth of data.  (A load is either the total amount of data you want the
 app to have loaded in memory at once, or the total amount of data the data source is willing to
 give you at once —— whichever is less.  Tell AppPaginator the load size with `setItemsPerLoad()`)
 ***************************/
export declare class BigDatasetPaginator extends AbstractBigDatasetPaginator {
    constructor(dataSource: {
        getLoad: (loadNumber: number, itemsPerLoad: number, isLastLoad: boolean) => Promise<any[]>;
        dataTotal: number;
    });
}
