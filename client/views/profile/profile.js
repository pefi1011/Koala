Template.profile.helpers({
  fullname: function() {
    return this.profile.first_name + " " + this.profile.last_name;
  },

  rating: function() {
    return this.profile.rating;
  },

  usersince: function() {
    return this.profile.createdAt;
  },



});
