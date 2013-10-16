
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
	var worldTpl = '<li>Name: <%= name %> Desc: <%= desc %></li>';
	var WorldView = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		template: _.template(worldTpl),
		// template: _.template($('#aTpl').html()),				// 会在实例化之前执行
		render: function() {
			console.log(this.template);
			// 模拟的数据
			// 把数据绑定到模板中
			// this.template($('#aTpl').html());
			// var tpl = worldTpl({name: 'mackxu', desc: 'this is a desc aaaaaa'});
			var tpl = this.template({name: 'mackxu', desc: 'this is a desc'});
			// 添加到页面中
			this.$el.append(tpl);
			return this;
		}
	});

	$(function() {
		// 实例化视图，能自动调用render
		var w = new WorldView({el : '.worlds'});
	});
	

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