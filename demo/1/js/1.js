<<<<<<< HEAD
$(function() {
	// 定义模型
	var User = Backbone.Model.extend({
		defaults: {
			id: 0,
			username: 'xxx',
			age: 0
		}
	});

	// 定义集合。是User模型的集合
	var UserList = Backbone.Collection.extend({
		model: User,
		url: 'js/users.json'
	});

	// 定义视图，用于显示用户列表中的一个条目
	var UserItemView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#user-item-tpl').html()),				// 绑定模板
		events: {
			'click a': 'showUser'
		},
		initialize: function() {
			this.userInfoView = new UserInfoView({model: this.model});	// 实例化User详情类，并和单条目视图共享同一个模型
		},
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		showUser: function() {
			this.userInfoView.render();									// 渲染User详情视图
		}
	});
	// 定义视图，用于显示用户列表
	var UserListView = Backbone.View.extend({
		el: $('.left'),
		initialize: function() {
			var self = this;
			this.$myList = this.$el.find('.myList');
			this.$myList.innerHTML = '';							// 清空User列表
			self.userList = new UserList();					// 实例化User集合
			self.userList.on('reset', this.addAll, this);	// reset事件
			self.userList.on('all', this.render, this);		// all 事件
			// self.userList.on('add', this.addAll, this);

			self.userList.fetch({							// 获取服务器数据，会触发reset事件
				success: function(collection, response){
					if(collection.length === 0) {
						self.render();
					}else {
						// collection.reset(response);
					}
				}, error: function() {
					console.log('error');
				}, reset:true
			});
		},
		render: function() {
			this.$el.find('h4').html('总人数:' + this.userList.length);
		},
		addAll: function() {
			var that = this;
			this.userList.each(function(user) {
				that.addOne(user);
			});
			this.$el.append(this.el);			// 添加到页面内
		},
		addOne: function(user) {
			var userItem = new UserItemView({model: user});			// 实例化单条视图
			this.$myList.append(userItem.render().el);
		}
	});

	// 显示User详情视图
	// 与UserItemView共享同一个User模型
	var UserInfoView = Backbone.View.extend({
		el: $('.right'),
		template: _.template($('#user-info-tpl').html()),
		events: {
			'click .update': 'updateUser',
			'click .delete': 'deleteUser'
		}
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		updateUser: function() {},
		deleteUser: function() {
			
		}
	});
	
	new UserListView();
	
});







	
=======

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
>>>>>>> beb671a4c3dbfa05a576aee677260401e340ac05
