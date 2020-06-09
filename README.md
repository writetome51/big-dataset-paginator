# AppPaginator

 A TypeScript/JavaScript class for pagination in a real-world web application. It  
 automatically batchinates the full dataset in case it's huge.  
 In the constructor you pass in a `dataSource` that returns data in batches that  
 contain multiple pages worth. (A batch is either the total amount of data you  
 want the app to have loaded in memory at once, or the total amount of data the  
 data source is willing to give you at once —— whichever is less. Tell  
 AppPaginator the batch size by setting the property `itemsPerBatch`.) When the  
 method `set_currentPageNumber(num)` is called, this class requests from  
 `dataSource` the batch that page is in. Then the items of the requested page  
 will be in the property `currentPage`.


## Basic Usage
<details>
<summary>view basic usage</summary>

```ts
// Get an instance (see constructor for dataSource details):
let appPaginator = new AppPaginator(dataSource);

// Make sure itemsPerPage has the value you want:
appPaginator.itemsPerPage = 10;

appPaginator.itemsPerBatch = 200;

// Show the first page:
await appPaginator.set_currentPageNumber(1);
console.log(appPaginator.currentPage); // `[item1, item2, item3, item4,...]`

// The user performs a search to narrow down the dataset.
// You want the paginator to react to this, so you do a reset:
await appPaginator.reset();
```
</details>


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    dataSource: {

        getBatch: (
            batchNumber: number, itemsPerBatch: number, isLastBatch: boolean
        ) => Promise<any[]>;
            // The number of items `getBatch()` returns must match `itemsPerBatch`.
            // If `isLastBatch` is true, it must only return the remaining items 
            // in the dataset and ignore itemsPerBatch.

        dataTotal: number;
            // `dataTotal`: number of items in entire dataset, not the batch.
            // This must stay accurate after actions that change the total, such 
            // as searches.
    }
)
```
</details>


## Properties
<details>
<summary>view properties</summary>

```ts
itemsPerPage: number
    // Default is 25.

itemsPerBatch: number
    // Total number of items the app can have loaded in memory.
    // If your data source doesn't allow you to request batches the size of multiple
    // pages, set this to same value as this.itemsPerPage.
    // NOTE: if this isn't evenly divisible by this.itemsPerPage, its value is 
    // lowered until it is.

currentPageNumber: number // read-only

currentPage: any[] // read-only
    // All items in the current page.

totalPages: number // read-only
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
async set_currentPageNumber(num): Promise<void>
    // updates this.currentPage

async resetToFirstPage(): Promise<void>
    // force-loads page 1.
    // Intended to be called after the order of the dataset changes (like 
    // after sorting), or after the total number of items changes (like after 
    // a search).
```
</details>


## Inheritance Chain

AppPaginator<--[AbstractAppPaginator](https://github.com/writetome51/abstract-app-paginator#abstractapppaginator)


## Installation
`npm i  @writetome51/app-paginator`


## Loading
```ts
// If using TypeScript:
import { AppPaginator } from '@writetome51/app-paginator';
// If using ES5 JavaScript:
var AppPaginator = require('@writetome51/app-paginator').AppPaginator;
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
