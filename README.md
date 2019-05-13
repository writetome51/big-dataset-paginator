# BaseClass

An abstract Typescript/Javascript class with properties and methods that maybe   
every class should have.


## Properties

#### className: string (read-only)


## Methods

```
protected   _createGetterAndOrSetterForEach(
		propertyNames: string[],
		configuration: IGetterSetterConfiguration
	   ) : void
    /*********************
    Use this method when you have a bunch of properties that need getter and/or 
    setter functions that all do the same thing. You pass in an array of string 
    names of those properties, and the method attaches the same getter and/or 
    setter function to each property.
    IGetterSetterConfiguration is this object:
    {
        get_setterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
        ) => Function,
	    // get_setterFunction takes the property name as first argument and 
	    // returns the setter function.  The setter function must take one 
	    // parameter and return void.
	    
        get_getterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
        ) => Function
	    // get_getterFunction takes the property name as first argument and 
	    // returns the getter function.  The getter function must return something.
    }
    *********************/ 
	   
	   
protected   _returnThis_after(voidExpression: any) : this
    // voidExpression is executed, then function returns this.
    // Even if voidExpression returns something, the returned data isn't used.


protected   _errorIfPropertyHasNoValue(
                property: string, // can contain dot-notation, i.e., 'property.subproperty'
                propertyNameInError? = ''
            ) : void
    // If value of this[property] is undefined or null, it triggers fatal error:
    // `The property "${propertyNameInError}" has no value.`
```

## Explanation of syntax in above code examples
 
Variable declaration: &nbsp; `varName: type`  
Function declaration: &nbsp; `functionName(...parameters): type_returned`  

When specifying a variable type must be a specific function:  
`varName: (...parameters) => type_returned`  

Optional parameter in a function:  
`parameterName? = (default_value)` &nbsp; or &nbsp; `parameterName?: type`  

Optional property in an object:  &nbsp; `propertyName?: type`  

Variable parsed inside a literal string:  
```
`This is a string containing the value of ${varName}`
```

## Installation
`npm i  @writetome51/base-class`


## Loading
```
// If using TypeScript:
import { BaseClass } from '@writetome51/base-class';
// If using ES5 JavaScript:
var BaseClass = require('@writetome51/base-class').BaseClass;
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
