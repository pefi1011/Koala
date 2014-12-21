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

  currentlyPosted: function() {
    return "myItems count";
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
  }

});
