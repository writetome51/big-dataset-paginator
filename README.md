# BigDatasetPaginator

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
let paginator = new BigDatasetPaginator(dataSource);

// Configure:
paginator.setItemsPerPage(10);
paginator.setItemsPerLoad(200);

// Show the first page:
await paginator.resetToFirstPage();
console.log(paginator.getCurrentPage()); // `[item1, item2, item3, item4,...]`

// Jump to different page:
await paginator.setCurrentPageNumber(5);
```
</details>


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    dataSource: {
    
        // The number of items `getLoad()` returns must match `itemsPerLoad`.  If
        // `isLastLoad` is true, it must only return the remaining items in the dataset
        // and ignore itemsPerLoad.
    
        getLoad: (
            loadNumber: number, itemsPerLoad: number, isLastLoad: boolean
        ) => Promise<any[]>;
    
        // `dataTotal`: number of items in entire dataset, not the load.
        // This must stay accurate after actions that change the total, such as searches.
    
        dataTotal: number;
    }
)
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
setItemsPerLoad(num): void

getItemsPerLoad(): number

setItemsPerPage(num): void

getItemsPerPage(): number

setCurrentPageNumber(num): Promise<void>
    // changes the page.

getCurrentPageNumber(): number

resetToFirstPage(): Promise<void>

getCurrentPage(): any[]

getTotalPages(): number
```
</details>


## Inheritance Chain

BigDatasetPaginator<--[AbstractBigDatasetPaginator](https://github.com/writetome51/abstract-big-dataset-paginator#abstractbigdatasetpaginator)


## Installation
`npm i  @writetome51/big-dataset-paginator`


## Loading
```ts
// If using TypeScript:
import { BigDatasetPaginator } from '@writetome51/big-dataset-paginator';
// If using ES5 JavaScript:
var BigDatasetPaginator = require('@writetome51/big-dataset-paginator').BigDatasetPaginator;
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
