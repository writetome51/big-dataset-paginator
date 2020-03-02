"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_app_paginator_1 = require("@writetome51/abstract-app-paginator");
const array_paginator_1 = require("@writetome51/array-paginator");
const batch_to_page_translator_1 = require("@writetome51/batch-to-page-translator");
const get_page_batch_1 = require("@writetome51/get-page-batch");
const page_loader_1 = require("@writetome51/page-loader");
const pagination_batch_info_1 = require("@writetome51/pagination-batch-info");
const pagination_page_info_1 = require("@writetome51/pagination-page-info");
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
class AppPaginator extends abstract_app_paginator_1.AbstractAppPaginator {
    constructor(dataSource) {
        super(dataSource, 
        // This setup function specifies all the interface requirements and handles dependency
        // injection.  All the instances created are singletons to be shared.
        function (dataSource) {
            let batchPaginator;
            batchPaginator = new array_paginator_1.ArrayPaginator();
            let pageInfo;
            pageInfo = new pagination_page_info_1.PaginationPageInfo(dataSource, batchPaginator);
            this.__pageInfo = pageInfo;
            let batchInfo;
            batchInfo = new pagination_batch_info_1.PaginationBatchInfo(this.__pageInfo);
            this.__batchInfo = batchInfo;
            let bch2pgTranslator = new batch_to_page_translator_1.BatchToPageTranslator(this.__pageInfo, this.__batchInfo);
            let getPageBatch;
            getPageBatch = new get_page_batch_1.GetPageBatch(dataSource, this.__batchInfo, bch2pgTranslator);
            let pageLoader;
            pageLoader = new page_loader_1.PageLoader(batchPaginator, bch2pgTranslator, getPageBatch);
            this.__pageLoader = pageLoader;
        });
    }
}
exports.AppPaginator = AppPaginator;
