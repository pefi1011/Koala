// chech that the userId owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};

round = function(number, decimals) {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
