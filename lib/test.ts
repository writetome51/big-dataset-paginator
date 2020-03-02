import { AppPaginator } from './index';
import { getCountup } from '@writetome51/get-countup-countdown';
import { arraysMatch } from '@writetome51/arrays-match';

async function runTests(){


	// create a dataSource object:
	let dataSource = {
		dataTotal: 29,

		getBatch: async function (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) {
			let start = (batchNumber - 1) * itemsPerBatch + 1;
			let end = start + itemsPerBatch - 1;
			if (isLastBatch) end = this.dataTotal;

			return getCountup(start, end);
		}
	};


	let paginator = new AppPaginator(dataSource);

	// Test validation.

	let errorsTriggered = 0;
	try {
		paginator.itemsPerPage = 0;
	}
	catch (e) {
		++errorsTriggered;
	}
	try {
		paginator.itemsPerPage = -1;
	}
	catch (e) {
		++errorsTriggered;
	}
	try {
		// @ts-ignore
		paginator.itemsPerPage = '1';
	} catch (e) {
		++errorsTriggered;
	}
	if (errorsTriggered === 3) console.log('test 1 passed');
	else console.log('test 1 FAILED');


	errorsTriggered = 0;
	try {
		paginator.itemsPerBatch = 0;
	}
	catch (e) {
		++errorsTriggered;
	}
	try {
		paginator.itemsPerBatch = -1;
	}
	catch (e) {
		++errorsTriggered;
	}
	try {
		// @ts-ignore
		paginator.itemsPerBatch = '1';
	}
	catch (e) {
		++errorsTriggered;
	}
	if (errorsTriggered === 3) console.log('test 2 passed');
	else console.log('test 2 FAILED');


	errorsTriggered = 0;
	try {
		await paginator.set_currentPageNumber(0);
	}
	catch (e) {
		++errorsTriggered;
	}
	try {
		await paginator.set_currentPageNumber(-1);
	}
	catch (e) {
		++errorsTriggered;
	}
	try {
		// @ts-ignore
		await paginator.set_currentPageNumber('1');
	}
	catch (e) {
		++errorsTriggered;
	}

	if (errorsTriggered === 3) console.log('test 3 passed');
	else console.log('test 3 FAILED');


// Make sure itemsPerBatch can't be less than itemsPerPage:

	let errorTriggered = false;
	paginator.itemsPerPage = 2;
	try {
		paginator.itemsPerBatch = 1;
	} catch (e) {
		errorTriggered = true;
	}
	if (errorTriggered) console.log('test 4 passed');
	else console.log('test 4 FAILED');


// Make sure itemsPerBatch is kept evenly divisible by itemsPerPage:
	paginator.itemsPerPage = 2;
	paginator.itemsPerBatch = 3;
	let result1 = paginator.itemsPerBatch;
	paginator.itemsPerBatch = 23;
	let result2 = paginator.itemsPerBatch;

	if (result1 === 2 && result2 === 22) console.log('test 5 passed');
	else console.log('test 5 FAILED');


// Make sure totalPages is correct:
	let expectedResults = [15, 10, 8, 6, 5, 5, 4, 4, 3, 3, 3, 3, 3, 2];
	let actualResults = [];
	let itemsPerPageVariations = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	itemsPerPageVariations.forEach((itemsPerPage) => {
		paginator.itemsPerPage = itemsPerPage;
		actualResults.push(paginator.totalPages);
	});
	if (arraysMatch(expectedResults, actualResults)) console.log('test 6 passed');
	else console.log('test 6 FAILED');


	// Make sure there are no problems if itemsPerBatch is bigger than dataTotal:
	paginator.itemsPerPage = 10;
	paginator.itemsPerBatch = 40;
	await paginator.set_currentPageNumber(3);

	if (arraysMatch(paginator.currentPage, [21, 22, 23, 24, 25, 26, 27, 28, 29]) &&
		paginator.totalPages === 3) console.log('test 7 passed');
	else console.log('test 7 FAILED');


	// Make sure there are no problems if itemsPerPage is bigger than dataTotal:
	dataSource.dataTotal = 21;
	paginator.itemsPerPage = 25;
	await paginator.reset(); // currentPageNumber is now 1.

	if (arraysMatch(
		paginator.currentPage, getCountup(1, 21)
	))
		console.log('test 8 passed');
	else console.log('test 8 FAILED');


	dataSource.dataTotal = 77;
	await paginator.reset();
	let page1 = paginator.currentPage;

	await paginator.set_currentPageNumber(paginator.currentPageNumber + 1);

	let page2 = paginator.currentPage;

	await paginator.set_currentPageNumber(paginator.currentPageNumber + 1);

	let page3 = paginator.currentPage;

	await paginator.set_currentPageNumber(paginator.currentPageNumber + 1);

	let page4 = paginator.currentPage;

	if (arraysMatch(page1, getCountup(1, 25)) &&
		arraysMatch(page2, getCountup(26, 50)) &&
		arraysMatch(page3, getCountup(51, 75)) &&
		arraysMatch(page4, getCountup(76, 77))) console.log('test 9 passed');
	else console.log('test 9 FAILED');


	dataSource.dataTotal = 103;
	paginator.itemsPerBatch = 200;
	paginator.itemsPerPage = 11;
	await paginator.reset();

	page1 = paginator.currentPage;

	await paginator.set_currentPageNumber(paginator.currentPageNumber + 1);

	page2 = paginator.currentPage;

	await paginator.set_currentPageNumber(paginator.currentPageNumber + 1);

	page3 = paginator.currentPage;

	await paginator.set_currentPageNumber(paginator.currentPageNumber + 1);

	page4 = paginator.currentPage;

	await paginator.set_currentPageNumber(10);

	let page10 = paginator.currentPage;

	if (arraysMatch(page1, getCountup(1, 11)) &&
		arraysMatch(page2, getCountup(12, 22)) &&
		arraysMatch(page3, getCountup(23, 33)) &&
		arraysMatch(page4, getCountup(34, 44)) &&
		arraysMatch(page10, getCountup(100, 103))) console.log('test 10 passed');
	else console.log('test 10 FAILED');


	errorTriggered = false;
	try {
		await paginator.set_currentPageNumber(11);
	} catch (e) {
		errorTriggered = true;
	}
	if (errorTriggered) console.log('test 11 passed');
	else console.log('test 11 FAILED');


}


runTests();
