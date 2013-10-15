
	// 制定路由规则
	var App = Backbone.Router.extend({
		routes: {
			'': 'index',
			'add': 'add',
			'world/:id': 'show',
			'save/:id': 'save',
			'delete/:id': 'del'
		},
		index: function() {
			console.log('index');
		},
		add: function() {
			console.log('add');
		},
		// 单独星球介绍
		show: function(id) {
			console.log('show');
		},
		// 保存和更新星球
		save: function(id) {
			console.log('save');
		},
		del: function(id) {
			console.log('del');
		}
	});