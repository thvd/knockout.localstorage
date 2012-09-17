define(['jquery', 'knockout', 'knockout.mapping'], function($, ko, mapping) {
	return {
		// Used to store an observable in the localStorage.
		observable: function(key, properties) {
			if (!$.isPlainObject(properties)) {
				properties = {};
			}

			// Construct the observable.
			var observable = ko.observable((function() {
				// Get the initial observable value.
				var fromLocalStorage = window.localStorage[key];
				if (undefined === fromLocalStorage) {
					var defaultValue = properties.defaultValue;
					window.localStorage[key] = defaultValue;
					return defaultValue;
				}
				return ko.utils.parseJson(fromLocalStorage);
			}) ());
			observable.subscribe(function(newValue) {
				// On change, write the new value to the localStorage.
				window.localStorage[key] = ko.toJSON(newValue);
			});
			return observable;
		},
		// Used to store an observableArray in the localStorage.
		observableArray: function(key, properties) {
			if (!$.isPlainObject(properties)) {
				properties = {};
			}
			

			var observable;
			var fromLocalStorage = window.localStorage[key];

			// Get the initial observable value.
			if (undefined === fromLocalStorage || '' === fromLocalStorage || null === fromLocalStorage) {
				// First time, there is no value stored in the localStorage.
				var defaultValue = properties.defaultValue || [];
				window.localStorage[key] = defaultValue;
				fromLocalStorage = defaultValue;
			} else {
				fromLocalStorage = ko.utils.parseJson(fromLocalStorage);

				if ($.isPlainObject(properties.mapping)) {
					// Map all objects that in the array. Using the knockout.mapping plugin.
					observable = mapping.fromJS(fromLocalStorage, properties.mapping);
				}
			}

			// If `observable` isn't a observable object.
			if (!observable) {
				observable = ko.observableArray(fromLocalStorage);
			}
			
			observable.subscribe(function(newValue) {
				// On change, store the new value in the localStorage.
				window.localStorage[key] = ko.toJSON(newValue);
			});
			return observable;
		}
	};
});
