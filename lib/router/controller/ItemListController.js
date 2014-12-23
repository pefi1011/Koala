//  We define a route controller here, so we can use it later in our routes
ItemsListController = RouteController.extend({
  // template: 'itemsList',
  template: 'itemsAlbumatic',
  increment: 9,
  itemsLimit: function() {
    return parseInt(this.params.itemsLimit) || this.increment;
  },

  items : function(){

    return Items.find({}, this.findOptions());
  },

  nextPath: function() {

    return Router.routes.itemsList.path({itemsLimit: this.itemsLimit() + this.increment});
  },

  findOptions: function() {
    return {sort: {submitted: -1, _id: -1}, limit: this.itemsLimit()};
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
  subscriptions: function(){
    this.itemsSub =  Meteor.subscribe('items', this.findOptions());
  }
});

MyItemsListController = ItemsListController.extend({
  subscriptions: function(){
    this.itemsSub =  Meteor.subscribe('myItems', this.findOptions(), Meteor.user()._id);
  }
});

InterestedItemsListController = ItemsListController.extend({
  subscriptions: function(){
    var interestedItems = Meteor.user().profile.interestedItems;
    var interestedItemsIds = (interestedItems) ? interestedItems : [];
    var a =this.findOptions();
    this.itemsSub =  Meteor.subscribe('interestedItems', this.findOptions(), interestedItemsIds);
  }
});
