Template.profile.helpers({
  fullname: function() {
    return this.profile.first_name + " " + this.profile.last_name;
  },

  rating: function() {
    return this.profile.rating;
  },

  memberSince: function() {
    return this.createdAt;
  },

  about : function() {
    return this.profile.about;
  },

  currentlyPosted: function() {
    return "myItems count";
  },

  userLocation: function() {
    return "user location";
  },

  firstStar: function() {
    return this.profile.rating > 0;
  },

  secondStar: function() {
    return this.profile.rating > 1;
  },

  thirdStar: function() {
    return this.profile.rating > 2;
  },

  fourthStar: function() {
    return this.profile.rating > 3;
  },

  fithStar: function() {
    return this.profile.rating > 4;
  },

  interestedInItemsCount: function() {
    var interestedItems = this.profile.interestedItems;
    return (interestedItems) ? interestedItems.length : 0;
  },

  offersItemsCount: function() {
    return this.profile.rating > 4;
  }

});
