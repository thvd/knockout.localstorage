knockout.localStorage
=====================
##Usage
```javascript
require(['knockout', 'knockout.localstorage'], function(ko, knockoutLocalStorageObservableFactory) {
  function ViewModel() {
    this.savedObservableInLocalStorage = knockoutLocalStorageObservableFactory.observable('my_key', {
      defaulValue: 'my_value' 
    });
    
    console.log(window.localStorage['my_key']);
    //output: 'my_value';
  }
  
  
  ko.applyBindings(new ViewModel());
});
```
