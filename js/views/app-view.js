var app = app || {};

(function ($) {
	'use strict';

	// The top-level view of the app.
	app.AppView = Backbone.View.extend({

		el: '.app',

		// Template for the statistics of the clock records
		statsTemplate: _.template($('#stats-template').html()),

		events: {
			'click .submit': 'createOnSubmit',
		},

		// Load all records previously stored in local storage, along with any
		// new ones created
		initialize: function () {
			this.allCheckbox = this.$('.toggle-all')[0];
			this.$firstName = this.$('#firstName');
			this.$lastName = this.$('#lastName');
			this.$clockType = true;
			this.clockTime = 0;
			this.$footer = this.$('.footer');
			this.$main = this.$('.main');
			this.$list = $('.clockEvent-list');

			this.listenTo(app.clockEvents, 'add', this.addOne);
			this.listenTo(app.clockEvents, 'reset', this.addAll);
			this.listenTo(app.clockEvents, 'filter', this.filterAll);
			this.listenTo(app.clockEvents, 'all', _.debounce(this.render, 0));

			// Prevents the app view from being re-rendered for every model
			app.clockEvents.fetch({reset: true});
		},

		// Refresh the statistics since nothing else needs to be re-rendered
		render: function () {
			var clockInLength = app.clockEvents.clockIn().length;
			var clockOutLength = app.clockEvents.clockOut().length;

			if (app.clockEvents.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					total: app.clockEvents.length,
					clockIn: clockInLength,
					clockOut: clockOutLength
				}));

				this.$('.filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (app.clockEventFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}
		},

		// Add a single clock event
		addOne: function (clockEvent) {
			var view = new app.clockEventView({ model: clockEvent });
			this.$list.append(view.render().el);
		},

		// Add all clock events stored in localstorage
		addAll: function () {
			this.$list.html('');
			app.clockEvents.each(this.addOne, this);
		},

		filterOne: function (clockEvent) {
			clockEvent.trigger('visible');
		},

		filterAll: function () {
			app.clockEvents.each(this.filterOne, this);
		},

		// Generate the attributes for a new clock event record.
		newAttributes: function () {
			return {
				firstName: this.$firstName.val().trim(),
				lastName: this.$lastName.val().trim(),
				clockType: this.$clockType,
				clockTime: this.clockTime,
				order: app.clockEvents.nextOrder()
			};
		},

		// Add new data to records and reset info
		createOnSubmit: function (e) {
			if (this.$firstName.val().trim() && this.$lastName.val().trim()) {
				this.$clockType = this.$('#clockType').val() === 'true' ? true : false;
				//Set current Time for clockEvent
				let today = new Date();
				this.clockTime = today.toLocaleTimeString();;
				app.clockEvents.create(this.newAttributes());

				this.$firstName.val('');
				this.$lastName.val('');
			}
		}
	});
})(jQuery);
