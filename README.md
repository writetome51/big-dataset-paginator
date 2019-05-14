# AppPaginator




## Constructor

```
dataSource: {

    getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
        // The number of items `getBatch()` returns must match `itemsPerBatch`.  If
        // `isLastBatch` is true, it must only return the remaining items in the dataset
        // and ignore itemsPerBatch.

    dataTotal: number;
        // `dataTotal`: number of items in entire dataset, not the batch.
        // This must stay accurate after actions that change the total, such as searches.
}
```


## Properties

```
itemsPerBatch: number
    // Total number of items the app can have loaded in memory.  Set this to 
    // highest number that does not negatively affect app performance.
    // If your data source doesn't allow you to request batches the size of multiple
    // pages, set this to same value as this.itemsPerPage.

itemsPerPage: number
    // Default is 25.

currentPageNumber: number
    // Setting this automatically updates this.currentPage

currentPage: any[] // read-only
    // All items in the current page.

totalPages: number // read-only
```


## Methods

```
reset() : void
    // reloads the first batch and sets this.currentPageNumber to 1.
    // Intended to be called after the order of the dataset changes (like 
    // after sorting), or after the total number of items changes (like after 
    // a search).
```


## Inheritance Chain

AppPaginator<--[AbstractAppPaginator](https://github.com/writetome51/abstract-app-paginator#abstractapppaginator)


## Installation
`npm i  @writetome51/app-paginator`


## Loading
```
// If using TypeScript:
import { AppPaginator } from '@writetome51/app-paginator';
// If using ES5 JavaScript:
var AppPaginator = require('@writetome51/app-paginator').AppPaginator;
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
