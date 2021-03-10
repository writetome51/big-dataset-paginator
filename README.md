# BigDatasetPaginator

 A TypeScript/JavaScript class intended for pagination where all the data to  
 be paginated can't be loaded in memory at once. Instead of only requesting  
 one page of data at-a-time from the source, the paginator has the option of  
 requesting multiple pages of data to make requests more efficient.  You  
 configure this with the functions `setItemsPerPage()` and `setItemsPerLoad()`.  
 (A load is either the total number of items you want the app to have in  
 memory at once, or the total number of items your data source is willing to  
 give you at once —— whichever is less.)  
 In the constructor you pass in a `dataSource` that returns data one load  
 at-a-time.  It must also contain a `dataTotal`.


## Basic Usage
<details>
<summary>view basic usage</summary>

```ts
// Get an instance (see constructor for dataSource details):
let paginator = new BigDatasetPaginator(dataSource);

// Configure:
paginator.setItemsPerPage(10);
paginator.setItemsPerLoad(200);

// itemsPerLoad / itemsPerPage must divide evenly.  If they don't,
// itemsPerLoad will automatically lower until they do:
paginator.setItemsPerPage(15);
paginator.getItemsPerLoad(); // --> 195

// Show the first page:
await paginator.setCurrentPageNumber(1, {reload:true});
console.log(paginator.getCurrentPage()); // '[item1, item2, item3, item4,...]'

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
    
        // The number of items 'getLoad()' returns must match 'itemsPerLoad'.  If
        // 'isLastLoad' is true, it must only return the remaining items in the dataset
        // and ignore itemsPerLoad.
    
        getLoad: (
            loadNumber: number, itemsPerLoad: number, isLastLoad: boolean
        ) => Promise<any[]>;
    
        // 'dataTotal': number of items in entire dataset, not the load.
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
    // After setting this, if itemsPerLoad / itemsPerPage don't divide 
    // evenly, itemsPerLoad will lower to the closest number that will.

getItemsPerLoad(): number

setItemsPerPage(num): void
    // After setting this, if itemsPerLoad / itemsPerPage don't divide 
    // evenly, itemsPerLoad will lower to the closest number that will.

getItemsPerPage(): number

getTotalPages(): number

setCurrentPageNumber(num, option? = {reload: false}): Promise<void>
    // Changes the page.
    // Set 'option.reload' to true if page data must be reloaded, 
    // for any reason, from the 'dataSource'.


getCurrentPageNumber(): number

getCurrentPage(): any[]
```
</details>


## Inheritance Chain

BigDatasetPaginator<--[AbstractBigDatasetPaginator](https://github.com/writetome51/abstract-big-dataset-paginator#abstractbigdatasetpaginator)


## Installation
`npm i  @writetome51/big-dataset-paginator`


## Loading
```js
import { BigDatasetPaginator } from '@writetome51/big-dataset-paginator';
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
