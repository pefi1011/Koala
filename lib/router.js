Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  }
});

//  We define a route controller here, so we can use it later in our routes
ItemsListController = RouteController.extend({
  template: 'itemsList',
  increment: 5,
  itemsLimit: function() {
    return parseInt(this.params.itemsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1, _id: -1}, limit: this.itemsLimit()};
  },
  waitOn: function() {
    return Meteor.subscribe('items', this.findOptions());
  },
  data: function() {
    return {
      items: Items.find({}, this.findOptions()),
      nextPath: this.route.path({itemsLimit: this.itemsLimit() + this.increment})
    };
  }
});

Router.map(function() {

  this.route('itemPage', {
    path: '/items/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singleItem', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Items.findOne(this.params._id); }
  });

  this.route('itemEdit', {
    path: '/items/:_id/edit',
    waitOn: function() {
      return Meteor.subscribe('singleItem', this.params._id);
    },
    data: function() { return Items.findOne(this.params._id); }
  });

  this.route('itemSubmit', {
    path: '/submit'
  });

  this.route('itemsList', {
    path: '/:itemsLimit?',
    controller: ItemsListController
  });
});

var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
    this.stop();
  } else {
    this.next();
  }
};

Router.before(requireLogin, {
  only: 'itemSubmit'
});
