Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('uploads', function() {
  return Uploads.find();
});
