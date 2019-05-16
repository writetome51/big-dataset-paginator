"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var get_countup_countdown_1 = require("@writetome51/get-countup-countdown");
var arrays_match_1 = require("@writetome51/arrays-match");
// create a dataSource object:
var dataSource = {
    dataTotal: 29,
    getBatch: function (batchNumber, itemsPerBatch, isLastBatch) {
        var start = (batchNumber - 1) * itemsPerBatch + 1;
        var end = start + itemsPerBatch - 1;
        if (isLastBatch)
            end = this.dataTotal;
        return get_countup_countdown_1.getCountup(start, end);
    }
};
var paginator = new index_1.AppPaginator(dataSource);
// Test validation-checking.
var errorsTriggered = 0;
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
    paginator.itemsPerPage = '1';
}
catch (e) {
    ++errorsTriggered;
}
if (errorsTriggered === 3)
    console.log('test 1 passed');
else
    console.log('test 1 FAILED');
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
    paginator.itemsPerBatch = '1';
}
catch (e) {
    ++errorsTriggered;
}
if (errorsTriggered === 3)
    console.log('test 2 passed');
else
    console.log('test 2 FAILED');
errorsTriggered = 0;
try {
    paginator.currentPageNumber = 0;
}
catch (e) {
    ++errorsTriggered;
}
try {
    paginator.currentPageNumber = -1;
}
catch (e) {
    ++errorsTriggered;
}
try {
    paginator.currentPageNumber = '1';
}
catch (e) {
    ++errorsTriggered;
}
if (errorsTriggered === 3)
    console.log('test 3 passed');
else
    console.log('test 3 FAILED');
// Make sure itemsPerBatch can't be less than itemsPerPage:
var errorTriggered = false;
paginator.itemsPerPage = 2;
try {
    paginator.itemsPerBatch = 1;
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 4 passed');
else
    console.log('test 4 FAILED');
// Make sure itemsPerBatch is kept evenly divisible by itemsPerPage:
paginator.itemsPerPage = 2;
paginator.itemsPerBatch = 3;
var result1 = paginator.itemsPerBatch;
paginator.itemsPerBatch = 23;
var result2 = paginator.itemsPerBatch;
if (result1 === 2 && result2 === 22)
    console.log('test 5 passed');
else
    console.log('test 5 FAILED');
// Make sure totalPages is correct:
var expectedResults = [15, 10, 8, 6, 5, 5, 4, 4, 3, 3, 3, 3, 3, 2];
var actualResults = [];
var itemsPerPageVariations = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
itemsPerPageVariations.forEach(function (itemsPerPage) {
    paginator.itemsPerPage = itemsPerPage;
    actualResults.push(paginator.totalPages);
});
if (arrays_match_1.arraysMatch(expectedResults, actualResults))
    console.log('test 6 passed');
else
    console.log('test 6 FAILED');
// Make sure there are no problems if itemsPerBatch is bigger than dataTotal:
paginator.itemsPerPage = 10;
paginator.itemsPerBatch = 40;
paginator.currentPageNumber = 3;
if (arrays_match_1.arraysMatch(paginator.currentPage, [21, 22, 23, 24, 25, 26, 27, 28, 29]) &&
    paginator.totalPages === 3)
    console.log('test 7 passed');
else
    console.log('test 7 FAILED');
// Make sure there are no problems if itemsPerPage is bigger than dataTotal:
dataSource.dataTotal = 21;
paginator.itemsPerPage = 25;
paginator.reset(); // currentPageNumber is now 1.
if (arrays_match_1.arraysMatch(paginator.currentPage, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]))
    console.log('test 8 passed');
else
    console.log('test 8 FAILED');
dataSource.dataTotal = 77;
paginator.reset();
var page1 = paginator.currentPage;
++paginator.currentPageNumber;
var page2 = paginator.currentPage;
++paginator.currentPageNumber;
var page3 = paginator.currentPage;
++paginator.currentPageNumber;
var page4 = paginator.currentPage;
if (arrays_match_1.arraysMatch(page1, get_countup_countdown_1.getCountup(1, 25)) &&
    arrays_match_1.arraysMatch(page2, get_countup_countdown_1.getCountup(26, 50)) &&
    arrays_match_1.arraysMatch(page3, get_countup_countdown_1.getCountup(51, 75)) &&
    arrays_match_1.arraysMatch(page4, get_countup_countdown_1.getCountup(76, 77)))
    console.log('test 9 passed');
else
    console.log('test 9 FAILED');
