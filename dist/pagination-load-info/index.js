"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_class_1 = require("@writetome51/base-class");
const error_if_not_integer_1 = require("error-if-not-integer");
const get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
const has_value_no_value_1 = require("@writetome51/has-value-no-value");
const in_range_1 = require("@writetome51/in-range");
const not_1 = require("@writetome51/not");
/********************
 Gives information about a dataset too big to be loaded all at once that
 is stored in memory one load at-a-time, with the intention of paginating the load.
 *******************/
class PaginationLoadInfo extends base_class_1.BaseClass {
    constructor(__pageInfo) {
        super();
        this.__pageInfo = __pageInfo;
    }
    setItemsPerLoad(value) {
        this.__errorIfValueIsNotOneOrGreater(value, 'items per load');
        this.__checkValueOf_itemsPerLoad(value);
    }
    getItemsPerLoad() {
        this._errorIfPropertyHasNoValue('__itemsPerLoad', 'itemsPerLoad');
        this.__checkValueOf_itemsPerLoad();
        return this.__itemsPerLoad;
    }
    setCurrentLoadNumber(value) {
        if (value !== undefined) {
            if (not_1.not(in_range_1.inRange([1, this.getTotalLoads()], value))) {
                throw new Error(`You cannot set currentLoadNumber to a value outside the range 
				of totalLoads`);
            }
        }
        this.__currentLoadNumber = value;
    }
    getCurrentLoadNumber() {
        return this.__currentLoadNumber;
    }
    currentLoadIsLast() {
        return (this.getCurrentLoadNumber() === this.getTotalLoads());
    }
    getTotalLoads() {
        return get_rounded_up_down_1.getRoundedUp(this.__pageInfo.getTotalPages() / this.getPagesPerLoad());
    }
    getPagesPerLoad() {
        // Should not have to be rounded.  They will divide evenly.
        return (this.getItemsPerLoad() / this.__pageInfo.getItemsPerPage());
    }
    __errorIfValueIsNotOneOrGreater(value, property) {
        error_if_not_integer_1.errorIfNotInteger(value);
        if (value < 1)
            throw new Error(`The "${property}" must be at least 1.`);
    }
    __checkValueOf_itemsPerLoad(newValue = undefined) {
        let oldValue = this.__itemsPerLoad;
        if (has_value_no_value_1.hasValue(newValue))
            this.__itemsPerLoad = newValue;
        this.__ensure_itemsPerLoad_isCompatibleWith_itemsPerPage();
        // Whenever itemsPerLoad changes, there can no longer be a currentLoadNumber.  This would
        // cause logic errors.  It must be unset so the user is forced to reset it.
        if (oldValue !== this.__itemsPerLoad)
            this.__currentLoadNumber = undefined;
    }
    // If itemsPerLoad / itemsPerPage does not divide evenly, itemsPerLoad is decremented until
    // they do.  So, sometimes after assigning a value to either itemsPerPage or itemsPerLoad,
    // itemsPerLoad will change slightly.
    __ensure_itemsPerLoad_isCompatibleWith_itemsPerPage() {
        let itemsPerPage = this.__pageInfo.getItemsPerPage();
        if (has_value_no_value_1.hasValue(itemsPerPage)) {
            if (this.__itemsPerLoad < itemsPerPage) {
                throw new Error(`The items per load cannot be less than items per page`);
            }
            while ((this.__itemsPerLoad % itemsPerPage) !== 0)
                --this.__itemsPerLoad;
        }
    }
}
exports.PaginationLoadInfo = PaginationLoadInfo;
