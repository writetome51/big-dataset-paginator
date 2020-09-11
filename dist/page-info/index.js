import {errorIfNotInteger} from 'error-if-not-integer';
import {getRoundedUp} from '@writetome51/get-rounded-up-down';


export class PageInfo {

	constructor(__dataSource) {
		this.__dataSource = __dataSource;
	}


	setItemsPerPage(num) {
		errorIfNotInteger(num);
		if (num < 1) throw new Error('The number of items per page must be at least 1');

		this.__itemsPerPage = num;
	}


	getItemsPerPage() {
		return this.__itemsPerPage;
	}


	getTotalPages() {
		return getRoundedUp(this.__dataSource.dataTotal / this.getItemsPerPage());
	}
}
