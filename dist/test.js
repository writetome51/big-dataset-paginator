"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var get_countup_countdown_1 = require("@writetome51/get-countup-countdown");
var datatotal = 509;
// create a dataSource object:
var dataSource = {
    dataTotal: datatotal,
    getBatch: function (batchNumber, itemsPerBatch, isLastBatch) {
        var start = (batchNumber - 1) * itemsPerBatch + 1;
        var end = start + itemsPerBatch - 1;
        if (isLastBatch)
            end = datatotal;
        return get_countup_countdown_1.getCountup(start, end);
    }
};
var paginator = new index_1.AppPaginator(dataSource);
paginator.itemsPerPage = 10;
paginator.itemsPerBatch = 10;
paginator.currentPageNumber = 51;
console.log(paginator.currentPage);
console.log(paginator.totalPages);
//console.log(paginator.);
/******************************************************

 // batchInfo.itemsPerBatch must be set before doing anything else:
 batchInfo.itemsPerBatch = 10;


 // Start by testing the method getBatchNumberContainingPage():


 // Make sure the minimum value gets correct result:
 let batchNumber = bch2pgTranslator.getBatchNumberContainingPage(1);
 if (batchNumber === 1) console.log('test 1 passed');
 else console.log('test 1 FAILED');

 // Make sure the maximum value gets correct result:
 batchNumber = bch2pgTranslator.getBatchNumberContainingPage(5);
 if (batchNumber === 5) console.log('test 2 passed');
 else console.log('test 2 FAILED');

 // Make sure 1 below minimum value triggers error.
 let errorTriggered = false;
 try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(0);
} catch (e) {
    errorTriggered = true;
}
 if (errorTriggered) console.log('test 3 passed');
 else console.log('test 3 FAILED');

 // Make sure 1 above maximum value triggers error.
 errorTriggered = false;
 try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(6);
} catch (e) {
    errorTriggered = true;
}
 if (errorTriggered) console.log('test 4 passed');
 else console.log('test 4 FAILED');

 // Make sure negative number triggers error.
 errorTriggered = false;
 try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(-1);
} catch (e) {
    errorTriggered = true;
}
 if (errorTriggered) console.log('test 5 passed');
 else console.log('test 5 FAILED');


 // Now test the same function using different values of data total, items per page and items per batch:

 dataSource.dataTotal = 1021;
 pageInfo.itemsPerPage = 13;
 batchInfo.itemsPerBatch = 26;

 // Make sure the minimum value gets correct result:
 batchNumber = bch2pgTranslator.getBatchNumberContainingPage(1);
 if (batchNumber === 1) console.log('test 6 passed');
 else console.log('test 6 FAILED');

 // Make sure the maximum value gets correct result:
 batchNumber = bch2pgTranslator.getBatchNumberContainingPage(79);
 if (batchNumber === 40) console.log('test 7 passed');
 else console.log('test 7 FAILED');

 // Make sure 1 below minimum value triggers error.
 errorTriggered = false;
 try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(0);
} catch (e) {
    errorTriggered = true;
}
 if (errorTriggered) console.log('test 8 passed');
 else console.log('test 8 FAILED');

 // Make sure 1 above maximum value triggers error.
 errorTriggered = false;
 try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(80);
} catch (e) {
    errorTriggered = true;
}
 if (errorTriggered) console.log('test 9 passed');
 else console.log('test 9 FAILED');


 ******************************************/
