"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
class PaginationPageInfo {
    constructor(__dataSource) {
        this.__dataSource = __dataSource;
    }
    setItemsPerPage(value) {
        if (value < 1)
            throw new Error('The number of items per page must be at least 1');
        this.__itemsPerPage = value;
    }
    getItemsPerPage() {
        return this.__itemsPerPage;
    }
    getTotalPages() {
        return get_rounded_up_down_1.getRoundedUp(this.__dataSource.dataTotal / this.getItemsPerPage());
    }
}
exports.PaginationPageInfo = PaginationPageInfo;
