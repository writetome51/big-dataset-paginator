"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_app_paginator_1 = require("@writetome51/abstract-app-paginator");
var array_paginator_1 = require("@writetome51/array-paginator");
var batch_to_page_translator_1 = require("@writetome51/batch-to-page-translator");
var get_page_batch_1 = require("@writetome51/get-page-batch");
var page_loader_1 = require("@writetome51/page-loader");
var pagination_batch_info_1 = require("@writetome51/pagination-batch-info");
var pagination_page_info_1 = require("@writetome51/pagination-page-info");
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
var AppPaginator = /** @class */ (function (_super) {
    __extends(AppPaginator, _super);
    function AppPaginator(dataSource) {
        return _super.call(this, dataSource, 
        // This setup function specifies all the interface requirements and handles dependency
        // injection.  All the instances created are singletons to be shared.
        function (dataSource) {
            var batchPaginator;
            batchPaginator = new array_paginator_1.ArrayPaginator();
            var pageInfo;
            pageInfo = new pagination_page_info_1.PaginationPageInfo(dataSource, batchPaginator);
            this.__pageInfo = pageInfo;
            var batchInfo;
            batchInfo = new pagination_batch_info_1.PaginationBatchInfo(this.__pageInfo);
            this.__batchInfo = batchInfo;
            var bch2pgTranslator = new batch_to_page_translator_1.BatchToPageTranslator(this.__pageInfo, this.__batchInfo);
            var getPageBatch;
            getPageBatch = new get_page_batch_1.GetPageBatch(dataSource, this.__batchInfo, bch2pgTranslator);
            var pageLoader;
            pageLoader = new page_loader_1.PageLoader(batchPaginator, bch2pgTranslator, getPageBatch);
            this.__pageLoader = pageLoader;
        }) || this;
    }
    return AppPaginator;
}(abstract_app_paginator_1.AbstractAppPaginator));
exports.AppPaginator = AppPaginator;
