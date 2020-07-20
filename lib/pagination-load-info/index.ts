import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'error-if-not-integer';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { hasValue } from '@writetome51/has-value-no-value';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';


/********************
 Gives information about a dataset too big to be loaded all at once that
 is stored in memory one load at-a-time, with the intention of paginating the load.
 *******************/


export class PaginationLoadInfo extends BaseClass {

	private __itemsPerLoad: number;
	private __currentLoadNumber: number;


	constructor(
		private __pageInfo: { getItemsPerPage: () => number, getTotalPages: () => number }
	) {
		super();
	}


	setItemsPerLoad(value) {
		this.__errorIfValueIsNotOneOrGreater(value, 'items per load');
		this.__checkValueOf_itemsPerLoad(value);
	}


	getItemsPerLoad(): number {
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


	getCurrentLoadNumber(): number | undefined {
		return this.__currentLoadNumber;
	}


	currentLoadIsLast(): boolean {
		return (this.getCurrentLoadNumber() === this.getTotalLoads());
	}


	getTotalLoads(): number {
		return getRoundedUp(this.__pageInfo.getTotalPages() / this.getPagesPerLoad());
	}


	getPagesPerLoad(): number {
		// Should not have to be rounded.  They will divide evenly.
		return (this.getItemsPerLoad() / this.__pageInfo.getItemsPerPage());
	}


	private __errorIfValueIsNotOneOrGreater(value, property): void {
		errorIfNotInteger(value);
		if (value < 1) throw new Error(`The "${property}" must be at least 1.`);
	}


	private __checkValueOf_itemsPerLoad(newValue = undefined) {
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

	private __ensure_itemsPerLoad_isCompatibleWith_itemsPerPage(): void {

		let itemsPerPage = this.__pageInfo.getItemsPerPage();

		if (hasValue(itemsPerPage)) {
			if (this.__itemsPerLoad < itemsPerPage) {
				throw new Error(
					`The items per load cannot be less than items per page`
				);
			}
			while ((this.__itemsPerLoad % itemsPerPage) !== 0) --this.__itemsPerLoad;
		}

	}


}
