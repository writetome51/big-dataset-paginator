import {BaseClass} from '@writetome51/base-class';
import {errorIfNotInteger} from 'error-if-not-integer';
import {getRoundedUp} from '@writetome51/get-rounded-up-down';
import {hasValue} from '@writetome51/has-value-no-value';
import {inRange} from '@writetome51/in-range';
import {not} from '@writetome51/not';


/********************
 Gives information about a dataset too big to be loaded all at once that
 is stored in memory one load at-a-time, with the intention of paginating the load.
 *******************/

export class PaginationLoadInfo extends BaseClass {

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
			if (not(inRange([1, this.getTotalLoads()], value))) {
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
		return getRoundedUp(this.__pageInfo.getTotalPages() / this.getPagesPerLoad());
	}


	getPagesPerLoad() {
		// Should not have to be rounded.  They will divide evenly.
		return (this.getItemsPerLoad() / this.__pageInfo.getItemsPerPage());
	}


	__errorIfValueIsNotOneOrGreater(value, property) {
		errorIfNotInteger(value);
		if (value < 1) throw new Error(`The "${property}" must be at least 1.`);
	}


	__checkValueOf_itemsPerLoad(newValue = undefined) {
		let oldValue = this.__itemsPerLoad;
		if (hasValue(newValue)) this.__itemsPerLoad = newValue;
		this.__ensure_itemsPerLoad_isCompatibleWith_itemsPerPage();

		// Whenever itemsPerLoad changes, there can no longer be a currentLoadNumber.  This would
		// cause logic errors.  It must be unset so the user is forced to reset it.

		if (oldValue !== this.__itemsPerLoad) this.__currentLoadNumber = undefined;
	}


	// If itemsPerLoad / itemsPerPage does not divide evenly, itemsPerLoad is decremented until
	// they do.  So, sometimes after assigning a value to either itemsPerPage or itemsPerLoad,
	// itemsPerLoad will change slightly.

	__ensure_itemsPerLoad_isCompatibleWith_itemsPerPage() {
		let itemsPerPage = this.__pageInfo.getItemsPerPage();
		if (hasValue(itemsPerPage)) {
			if (this.__itemsPerLoad < itemsPerPage) {
				throw new Error(`The items per load cannot be less than items per page`);
			}
			while ((this.__itemsPerLoad % itemsPerPage) !== 0) --this.__itemsPerLoad;
		}
	}

}
