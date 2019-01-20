var app = app || {};

(function () {
	'use strict';

	// A collection of clockEvents (all records)
	var clockEvents = Backbone.Collection.extend({
		model: app.clockEvent,

		// Save all of the clockEvent items locally.
		localStorage: new Backbone.LocalStorage('clockEvents-backbone'),

		// Filter all records that are clock-in items.
		clockIn: function () {
			return this.where({clockType: true});
		},

		// Filter all records that are clock-out items.
		clockOut: function () {
			return this.where({clockType: false});
		},

		// Used to keep order in data by giving every record an id
		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 1;
		},

		// clockEvents are sorted by their original insertion order.
		comparator: 'order'
	});

	// Create the global collection
	app.clockEvents = new clockEvents();
})();
