Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
     Meteor.subscribe('notifications')
     ];
  }
});

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

  this.route('interestedItems', {
    path: '/interestedItems/:itemsLimit?',

    controller: InterestedItemsListController
  });

  this.route('myItems', {
    path: '/myItems/:itemsLimit?',

    controller: MyItemsListController
  });

  this.route('itemSubmit', {
    path: '/submit'
  });

  // This should be the last route because it matches almost everything
  this.route('itemsList', {
    path: '/:itemsLimit?',

    controller: AllItemsListController
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

// define the (usually global) loading template
Router.configure({
  loadingTemplate:"loading"
});

// add the dataNotFound plugin, which is responsible for
// rendering the dataNotFound template if your RouteController
// data function returns a falsy value
Router.plugin("dataNotFound",{
  notFoundTemplate: "noResults"
});

Router.route("/users/:userId" ,{
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

// TODO Vassil Quickfix
Router.route("/items/users/:userId" ,{
  name:"profiles",
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
