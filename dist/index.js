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
var pagination_page_info_1 = require("@writetome51/pagination-page-info");
var pagination_batch_info_1 = require("@writetome51/pagination-batch-info");
var batch_loader_1 = require("@writetome51/batch-loader");
var page_loader_1 = require("@writetome51/page-loader");
var batch_to_page_translator_1 = require("@writetome51/batch-to-page-translator");
var FullDatasetPaginator_1 = require("../FullDatasetPaginator");
/***************************
 AppPaginator is intended for a real-world web application.  It automatically
 batchinates the full dataset in case it's huge.
 ***************************/
var AppPaginator = /** @class */ (function (_super) {
    __extends(AppPaginator, _super);
    function AppPaginator(dataSource) {
        return _super.call(this, dataSource, function (dataSource) {
            var batchPaginator = new array_paginator_1.ArrayPaginator();
            this.__pageInfo = new pagination_page_info_1.PaginationPageInfo(dataSource, batchPaginator);
            this.__batchInfo = new pagination_batch_info_1.PaginationBatchInfo(this.__pageInfo);
            var bch2pgTranslator = new batch_to_page_translator_1.BatchToPageTranslator(this.__pageInfo, this.__batchInfo);
            var getBatch = new batch_loader_1.GetBatch(dataSource, this.__batchInfo, bch2pgTranslator);
            var pageLoader = new page_loader_1.PageLoader(batchPaginator, bch2pgTranslator, getBatch);
            this.__fullDatasetPaginator = new FullDatasetPaginator_1.FullDatasetPaginator(pageLoader);
        }) || this;
    }
    return AppPaginator;
}(abstract_app_paginator_1.AbstractAppPaginator));
exports.AppPaginator = AppPaginator;
