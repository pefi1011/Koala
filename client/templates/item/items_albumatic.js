Template.itemsAlbumatic.helpers({

  getListType: function() {

    // TODO Vassil: better non static solution for this one (Quickfix)

    var str = document.URL;
    var n = str.lastIndexOf('/');
    var result = str.substring(n + 1);

    var listType = "";
    if (result == "interestedItems"){
      listType = "Du interessierst dich für:";
    } else if (result == "myItems") {
      listType = "Eigene Artikel:";
    } else {
      listType = "Alle Artikel:";
    }

    return listType;
  },


});
