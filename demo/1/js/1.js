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
	// 定义视图，用于显示用户列表
	var UserListView = Backbone.View.extend({
		el: $('.left'),
		events: {
			'click #J_add': 'addUser'
		},
		initialize: function() {
			var self = this;
			this.$myList = this.$el.find('.myList');
			this.$myList.innerHTML = '';					// 清空User列表
			self.userList = new UserList();					// 实例化User集合
			self.userList.on('reset', this.addAll, this);	// reset事件
			self.userList.on('all', this.render, this);		// all 事件
			self.userList.on('add', this.addOne, this);
			self.userList.on('remove', this.addAll, this);

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
			// self.userList.create({username: 'ccc', age: 20});
			self.db = window.localStorage;
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
			var userItem = new UserItemView({model: user, collection: this.userList});		// 实例化单条视图
			this.$myList.append(userItem.render().el);
		},
		removeUser: function() {				// 当从集合中删除模型时

		},
		addUser: function() {
			var userSaveView = new UserSaveView({collection: this.userList});
		}

	});
	// 定义视图，用于显示用户列表中的一个条目
	var UserItemView = Backbone.View.extend({
		// 视图是一个li标签
		tagName: 'li',
		template: _.template($('#user-item-tpl').html()),				// 绑定模板
		events: {
			'click .myList-item': 'showUser',
			'click #J_itemDelete': 'destory'
		},
		initialize: function() {
			// 实例化User详情类，并和单条目视图共享同一个模型
			this.userInfoView = new UserInfoView({model: this.model, collection: this.collection});	
			this.model.on('destory', this.remove, this);
			this.model.on('change', this.render, this);					// 重新渲染本条目(局部渲染)
		},
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));		// 渲染条目
			return this;
		},
		showUser: function() {
			this.userInfoView.render();									// 渲染User详情视图
		},
		destory: function() {				// 销毁单个条目模型
			// this.model.destory();			// 向服务器发送delete请求
			this.collection.remove(this.model);							// 在客户端删除
		},
		remove: function() {				// 当模型销毁时也删除元素
			this.$el.remove();
		}
	});

	// 显示User详情视图
	// 与UserItemView共享同一个User模型
	var UserInfoView = Backbone.View.extend({
		el: $('.right'),
		template: _.template($('#user-info-tpl').html()),
		events: {
			'click #J_infoUpdate': 'updateUser',
			'click #J_infoDelete': 'destory'
		},
		initialize: function() {
			this.model.on('destory', this.removeUser, this);			// 在多处为模型添加相同事件, 这样会同时触发
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		updateUser: function() {},
		destory: function() {
			// this.model.destory();			// 向服务器发送delete请求
			this.collection.remove(this.model);							// 在客户端删除
		},
		removeUser: function() {
			this.el.innerHTML = '';
		}
	});

	var UserSaveView = Backbone.View.extend({
		el: $('.right'),
		events: {
			'click #J_save': 'saveUser'
		},
		template: _.template($('#user-save-tpl').html()),
		initialize: function() {
			this.render();
			this.$input = this.$el.find('input');
		},
		render: function() {
			this.$el.html(this.model ? this.template(this.model.toJSON()) : this.template());
		},
		userAttrs: function() {
			var user = {};
			$.each(this.$input, function() {
				this.value && (user[this.name] = this.value);
			});
			return user;
		},
		saveUser: function() {
			var user = this.userAttrs();
			this.model ? this.updateUser(user) : this.addUser(user);
		},
		addUser: function(user) {
			this.collection.create(user);
		},
		updateUser: function(user) {
			this.model.save(user);
		}
	});
	
	new UserListView();
	
});
