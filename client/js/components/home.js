app.cmp.Home = {
	controller: function(args) {
		var ctrl = {
			message: m.prop('This is the home page..')
		};
		return ctrl;
	},
	view: function(ctrl, args) {
		return m('div', [
			m('h2.center', ctrl.message())
		]);
	}
};
