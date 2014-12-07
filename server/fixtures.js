if (Items.find().count() === 0) {

  var pandaId = Accounts.createUser({
    username: 'pandaa',
    email: 'panda@zoo.de',
    password: 'pandaa',
    profile: {
    first_name: 'Lazy',
    last_name: 'Ninja',
    company: 'Karlsruher Zoo',
    }
  });

  var pandaId = Accounts.createUser({
    username: 'Tigerrr',
    email: 'tigerrr@zoo.de',
    password: 'Tigerrr',
    profile: {
    first_name: 'Shin',
    last_name: 'Kann',
    company: 'Karlsruher Zoo',
    }
  });

  var koalaId = Accounts.createUser({
    username: 'koalaa',
    email: 'koalaa@zoo.de',
    password: 'koalaa',
    profile: {
    first_name: 'Lazy',
    last_name: 'Ninja',
    company: 'Karlsruher Zoo',
    }
  });

  var koala = Meteor.users.findOne(koalaId);
  var panda = Meteor.users.findOne(pandaId);

  var now = new Date().getTime();

  var item1Id = Items.insert({
    userId: koala._id,
    author: koala.username,
    title: 'Ferd',
    description: '...umfallt',
    location: 'Stuttgart',
    tearoffs: 8,
    commentsCount: 1
  });

  var item2Id = Items.insert({
    userId: koala._id,
    author: koala.username,
    title: 'Schrank',
    description: 'gebraucht',
    location: 'Karlsruhe',
    tearoffs: 12,
    commentsCount: 2
  });

  var item3Id = Items.insert({
    userId: panda._id,
    author: panda.username,
    title: 'Kaktus',
    description: '...autsch',
    location: 'München',
    tearoffs: 10,
    commentsCount: 0
  });


  Comments.insert({
    itemId: item1Id,
    userId: koala._id,
    author: koala.username,
    submitted: now - 5 * 3600 * 1000,
    body: 'Wie oft fällt denn der Ferd um?'
  });

  Comments.insert({
    itemId: item2Id,
    userId: koala._id,
    author: koala.username,
    submitted: now - 3 * 3600 * 1000,
    body: 'Hat der Schrank gabrauchsspurren'
  });

  Comments.insert({
    itemId: item2Id,
    userId: panda._id,
    author: panda.username,
    submitted: now - 3 * 3600 * 1000,
    body: 'Die Tür fehlt.. sonst sieht er wie neu aus!!!'
  });

  for (var i = 0; i<20; i++ ) {
    Items.insert({
      userId: koala._id,
      author: koala.username,
      title: 'Test' + i,
      description: 'test',
      location: 'test',
      tearoffs: 12,
      commentsCount: 0
    });
  }
}
