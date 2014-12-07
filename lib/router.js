Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('items'), Meteor.subscribe('comments')];
  }
});

Router.map(function() {
  this.route('itemsList', {
    path: '/'
  });

  this.route('itemPage', {
    path: '/items/:_id',
    data: function() {
      return Items.findOne(this.params._id);
    }
  });

  this.route('itemEdit', {
    path: '/items/:_id/edit',
    data: function() {
      return Items.findOne(this.params._id);
    }
  });

  this.route('itemSubmit', {
    path: '/submit'
  });
});

var requireLogin = function() {
  if(! Meteor.user()) {
    if (Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
    this.stop();
  } else {
    this.next();
  }
};

Router.before(requireLogin, {only: 'itemSubmit'});