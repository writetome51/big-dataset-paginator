"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_big_dataset_paginator_1 = require("@writetome51/abstract-big-dataset-paginator");
const current_page_1 = require("@writetome51/current-page");
const pagination_load_info_1 = require("./pagination-load-info");
const pagination_page_info_1 = require("./pagination-page-info");
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
class BigDatasetPaginator extends abstract_big_dataset_paginator_1.AbstractBigDatasetPaginator {
    constructor(dataSource) {
        super(function (dataSource) {
            this.__pageInfo = new pagination_page_info_1.PaginationPageInfo(dataSource);
            this.__loadInfo = new pagination_load_info_1.PaginationLoadInfo(this.__pageInfo);
            this.__currentPage = current_page_1.getInstance_CurrentPage({ dataSource, pageInfo: this.__pageInfo, loadInfo: this.__loadInfo });
        }, [dataSource]);
    }
}
exports.BigDatasetPaginator = BigDatasetPaginator;
