
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
			// console.log('index');
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

	// 星球的列表视图
	var WorldList = Backbone.View.extend({
		

	});
	// 单个星球视图
	var WorldView = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			console.log('WorldView');
		}
	});

	// 实例化视图，能自动调用render
	var w = new WorldView();

	// 星球的模型
	var World = Backbone.Model.extend({
		defaults: {
			name: 'undefined',
			desc: ''
		},
		initialize: function() {
			this.on('change:name change:desc', this.display, this);
		},
		display: function() {
			console.log(this.get('name'), this.get('desc'));
		}
	});

	// 星球的集合
	var Worlds = Backbone.Collection.extend({

	});