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
    tearoffs: 8
  });

  var item2Id = Items.insert({
    userId: koala._id,
    author: koala.username,
    title: 'Serbe',
    description: 'gebraucht',
    location: 'Karlsruhe',
    tearoffs: 12
  });

  var item3Id = Items.insert({
    userId: panda._id,
    author: panda.username,
    title: 'Kaktus',
    description: '...autsch',
    location: 'München',
    tearoffs: 10
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
    body: 'Hat der Serbe gabrauchsspurren'
  });

  Comments.insert({
    itemId: item2Id,
    userId: panda._id,
    author: panda.username,
    submitted: now - 3 * 3600 * 1000,
    body: 'Seine rechte Elbogen ist arg verletzt... sonst sieht er wie neu aus!!!'
  });
}
