Template.notification.helpers({
//TODO: Vassil quickfix
  notificationText : function() {
    var type = this.type;
    if (type == 'interest') {
      return "hat Interesse an deinem Artikel '" + this.itemTitle + "' geäußert.";
    } else if (type =='comment') {
      return "hat deinen Artikel '" + this.itemTitle + "' kommentiert.";
    }
    return "";
  }
});
