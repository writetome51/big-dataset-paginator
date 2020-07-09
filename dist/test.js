"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const get_countup_countdown_1 = require("@writetome51/get-countup-countdown");
const arrays_match_1 = require("@writetome51/arrays-match");
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        // create a dataSource object:
        let dataSource = {
            dataTotal: 29,
            getLoad: function (loadNumber, itemsPerLoad, isLastLoad) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (loadNumber - 1) * itemsPerLoad + 1;
                    let end = start + itemsPerLoad - 1;
                    if (isLastLoad)
                        end = this.dataTotal;
                    return get_countup_countdown_1.getCountup(start, end);
                });
            }
        };
        let paginator = new index_1.BigDatasetPaginator(dataSource);
        // Test validation.
        let errorsTriggered = 0;
        try {
            paginator.setItemsPerPage(0);
        }
        catch (e) {
            ++errorsTriggered;
        }
        try {
            paginator.setItemsPerPage(-1);
        }
        catch (e) {
            ++errorsTriggered;
        }
        try {
            paginator.setItemsPerPage('1');
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
            paginator.setItemsPerLoad(0);
        }
        catch (e) {
            ++errorsTriggered;
        }
        try {
            paginator.setItemsPerLoad(-1);
        }
        catch (e) {
            ++errorsTriggered;
        }
        try {
            paginator.setItemsPerLoad('1');
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
            yield paginator.setCurrentPageNumber(0);
        }
        catch (e) {
            ++errorsTriggered;
        }
        try {
            yield paginator.setCurrentPageNumber(-1);
        }
        catch (e) {
            ++errorsTriggered;
        }
        try {
            yield paginator.setCurrentPageNumber('1');
        }
        catch (e) {
            ++errorsTriggered;
        }
        if (errorsTriggered === 3)
            console.log('test 3 passed');
        else
            console.log('test 3 FAILED');
        // Make sure itemsPerLoad can't be less than itemsPerPage:
        let errorTriggered = false;
        paginator.setItemsPerPage(2);
        try {
            paginator.setItemsPerLoad(1);
        }
        catch (e) {
            errorTriggered = true;
        }
        if (errorTriggered)
            console.log('test 4 passed');
        else
            console.log('test 4 FAILED');
        // Make sure itemsPerLoad is kept evenly divisible by itemsPerPage:
        paginator.setItemsPerPage(2);
        paginator.setItemsPerLoad(3);
        let result1 = paginator.getItemsPerLoad();
        paginator.setItemsPerLoad(23);
        let result2 = paginator.getItemsPerLoad();
        if (result1 === 2 && result2 === 22)
            console.log('test 5 passed');
        else
            console.log('test 5 FAILED');
        // Make sure totalPages is correct:
        let expectedResults = [15, 10, 8, 6, 5, 5, 4, 4, 3, 3, 3, 3, 3, 2];
        let actualResults = [];
        let itemsPerPageVariations = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        itemsPerPageVariations.forEach((itemsPerPage) => {
            paginator.setItemsPerPage(itemsPerPage);
            actualResults.push(paginator.getTotalPages());
        });
        if (arrays_match_1.arraysMatch(expectedResults, actualResults))
            console.log('test 6 passed');
        else
            console.log('test 6 FAILED');
        // Make sure there are no problems if itemsPerLoad is bigger than dataTotal:
        paginator.setItemsPerPage(10);
        paginator.setItemsPerLoad(30);
        yield paginator.setCurrentPageNumber(1);
        if (arrays_match_1.arraysMatch(paginator.getCurrentPage(), get_countup_countdown_1.getCountup(1, 10)) &&
            paginator.getTotalPages() === 3)
            console.log('test 7 passed');
        else
            console.log('test 7 FAILED');
        // Make sure there are no problems if itemsPerPage is bigger than dataTotal:
        dataSource.dataTotal = 21;
        paginator.setItemsPerPage(22);
        yield paginator.resetToFirstPage();
        if (arrays_match_1.arraysMatch(paginator.getCurrentPage(), get_countup_countdown_1.getCountup(1, 21)))
            console.log('test 8 passed');
        else
            console.log('test 8 FAILED');
        dataSource.dataTotal = 77;
        paginator.setItemsPerPage(25);
        paginator.setItemsPerLoad(25);
        yield paginator.resetToFirstPage();
        let page1 = paginator.getCurrentPage();
        yield paginator.setCurrentPageNumber(paginator.getCurrentPageNumber() + 1);
        let page2 = paginator.getCurrentPage();
        yield paginator.setCurrentPageNumber(paginator.getCurrentPageNumber() + 1);
        let page3 = paginator.getCurrentPage();
        yield paginator.setCurrentPageNumber(paginator.getCurrentPageNumber() + 1);
        let page4 = paginator.getCurrentPage();
        if (arrays_match_1.arraysMatch(page1, get_countup_countdown_1.getCountup(1, 25)) &&
            arrays_match_1.arraysMatch(page2, get_countup_countdown_1.getCountup(26, 50)) &&
            arrays_match_1.arraysMatch(page3, get_countup_countdown_1.getCountup(51, 75)) &&
            arrays_match_1.arraysMatch(page4, get_countup_countdown_1.getCountup(76, 77)))
            console.log('test 9 passed');
        else
            console.log('test 9 FAILED');
        dataSource.dataTotal = 103;
        paginator.setItemsPerLoad(200);
        paginator.setItemsPerPage(11);
        yield paginator.resetToFirstPage();
        page1 = paginator.getCurrentPage();
        yield paginator.setCurrentPageNumber(paginator.getCurrentPageNumber() + 1);
        page2 = paginator.getCurrentPage();
        yield paginator.setCurrentPageNumber(paginator.getCurrentPageNumber() + 1);
        page3 = paginator.getCurrentPage();
        yield paginator.setCurrentPageNumber(paginator.getCurrentPageNumber() + 1);
        page4 = paginator.getCurrentPage();
        yield paginator.setCurrentPageNumber(10);
        let page10 = paginator.getCurrentPage();
        if (arrays_match_1.arraysMatch(page1, get_countup_countdown_1.getCountup(1, 11)) &&
            arrays_match_1.arraysMatch(page2, get_countup_countdown_1.getCountup(12, 22)) &&
            arrays_match_1.arraysMatch(page3, get_countup_countdown_1.getCountup(23, 33)) &&
            arrays_match_1.arraysMatch(page4, get_countup_countdown_1.getCountup(34, 44)) &&
            arrays_match_1.arraysMatch(page10, get_countup_countdown_1.getCountup(100, 103)))
            console.log('test 10 passed');
        else
            console.log('test 10 FAILED');
        errorTriggered = false;
        try {
            yield paginator.setCurrentPageNumber(11);
        }
        catch (e) {
            errorTriggered = true;
        }
        if (errorTriggered)
            console.log('test 11 passed');
        else
            console.log('test 11 FAILED');
    });
}
runTests();
