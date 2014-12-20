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



});
