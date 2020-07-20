import { errorIfNotInteger } from 'error-if-not-integer';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';


export class PaginationPageInfo {

	private __itemsPerPage: number;


	constructor(
		private __dataSource: {

			// dataTotal: number of items in entire dataset.
			// This must stay accurate after any actions that change the total, such as searches.

			dataTotal: number;
		}
	) {
	}


	setItemsPerPage(num): void {
		errorIfNotInteger(num);
		if (num < 1) throw new Error('The number of items per page must be at least 1');

		this.__itemsPerPage = num;
	}


	getItemsPerPage(): number {
		return this.__itemsPerPage;
	}


	getTotalPages(): number {
		return getRoundedUp(this.__dataSource.dataTotal / this.getItemsPerPage());
	}


}
