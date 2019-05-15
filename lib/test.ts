import { AppPaginator } from './index';
import { getCountup } from '@writetome51/get-countup-countdown';
import { arraysMatch } from '@writetome51/arrays-match';


let datatotal = 29;

// create a dataSource object:
let dataSource = {
	dataTotal: datatotal,

	getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => {

		let start = (batchNumber - 1) * itemsPerBatch + 1;
		let end = start + itemsPerBatch - 1;
		if (isLastBatch) end = datatotal;

		return getCountup(start, end);
	}
};


let paginator = new AppPaginator(dataSource);

// Test validation-checking.

let errorsTriggered = 0;
try {
	paginator.itemsPerPage = 0;
} catch (e) {
	++errorsTriggered;
}
try {
	paginator.itemsPerPage = -1;
} catch (e) {
	++errorsTriggered;
}
try {
	paginator.itemsPerPage = '1';
} catch (e) {
	++errorsTriggered;
}
if (errorsTriggered === 3) console.log('test 1 passed');
else console.log('test 1 FAILED');


errorsTriggered = 0;
try {
	paginator.itemsPerBatch = 0;
} catch (e) {
	++errorsTriggered;
}
try {
	paginator.itemsPerBatch = -1;
} catch (e) {
	++errorsTriggered;
}
try {
	paginator.itemsPerBatch = '1';
} catch (e) {
	++errorsTriggered;
}
if (errorsTriggered === 3) console.log('test 2 passed');
else console.log('test 2 FAILED');


errorsTriggered = 0;
try {
	paginator.currentPageNumber = 0;
} catch (e) {
	++errorsTriggered;
}
try {
	paginator.currentPageNumber = -1;
} catch (e) {
	++errorsTriggered;
}
try {
	paginator.currentPageNumber = '1';
} catch (e) {
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


paginator.itemsPerPage = 9;
paginator.itemsPerBatch = 9;
paginator.currentPageNumber = 12;

console.log(paginator.currentPage);
console.log(paginator.totalPages);






