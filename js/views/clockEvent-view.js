var app = app || {};

(function ($) {
	'use strict';

	// clockEvent Item View
	app.clockEventView = Backbone.View.extend({
		tagName:  'li',

		// Cache the template for a single item.
		template: _.template($('#item-template').html()),

		// The clockEventView listens for changes to its model and re-renders
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		render: function () {
			if (this.model.changed.id !== undefined) {
				return;
			}

			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('clockIn', this.model.get('clockType'));
			this.toggleVisible();
			return this;
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		//Don't show item if we are filtering it out
		isHidden: function () {
			return !this.model.get('clockType') ?
				app.clockEventFilter === 'clockIn' :
				app.clockEventFilter === 'clockOut';
		}
	});
})(jQuery);
