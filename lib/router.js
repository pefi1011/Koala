Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
     Meteor.subscribe('notifications')

     ];
  }
});


// Item List Controller and children classes START
// TODO move to own class

//  We define a route controller here, so we can use it later in our routes
ItemsListController = RouteController.extend({
  template: 'itemsList',
  increment: 10,
  itemsLimit: function() {
    return parseInt(this.params.itemsLimit) || this.increment;
  },

  subscriptions: function(){
    this.itemsSub =  Meteor.subscribe('items', this.findOptions());
  },

  items : function(){

    return Items.find({}, this.findOptions());
  },

  nextPath: function() {

    return Router.routes.itemsList.path({itemsLimit: this.itemsLimit() + this.increment});
  },

  data: function() {

    var hasMore = this.items().count() === this.itemsLimit();

    return {
      items: this.items(),
      ready: this.itemsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
      };
  }
});

AllItemsListController = ItemsListController.extend({
  findOptions: function() {
    return {sort: {submitted: -1, _id: -1}, limit: this.itemsLimit()};
  },
});

AllItemsListController = ItemsListController.extend({
  findOptions: function() {
    return {sort: {submitted: -1, _id: -1}, limit: this.itemsLimit()};
  },
});

// Item List Controller and children classes START
// TODO move to own class

Router.map(function() {

  this.route('itemPage', {
    path: '/items/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singleItem', this.params._id),
        Meteor.subscribe('comments', this.params._id),
        Meteor.subscribe('photos', this.params._id)
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

    controller: AllItemsListController
  });

  // this.route('userProfile', {
  //   path: '/profile/:username',
  //   controller: ProfileController
  // });

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


// define the (usually global) loading template
Router.configure({
  loadingTemplate:"loading"
});

// add the dataNotFound plugin, which is responsible for
// rendering the dataNotFound template if your RouteController
// data function returns a falsy value
Router.plugin("dataNotFound",{
  notFoundTemplate: "dataNotFound"
});

Router.route("/users/:userId",{
  name:"profile",
  //TODO put this in ProfileController,
  data: function() {
    return Meteor.users.findOne({_id: this.params.userId});
  },
  waitOn: function() {
    return [
    Meteor.subscribe('userProfile', this.params.userId)
    ];
  }
});
