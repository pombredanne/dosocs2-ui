// To Search for users, use Meteor.users cursor

// MongoDB collections for uploads
Uploads = new Mongo.Collection('uploads');

// Ref: matb33:collection-hooks
// Information before uploads are performed
// Forcing ownership for an upload before upload is performed
Uploads.before.insert(function(userId, doc){
  doc.userId = userId;
  doc.uploadedAt = new Date();
});

Uploads.helpers({
  currentuser: function(){
    return Meteor.users.findOne({_id: this.userId});
  },
  GenuploadedTime: function(){
    return moment(this.uploadedAt).fromNow();
  }
});



// Insert update actions
// Forced ownership is used for deletion of a package
Uploads.allow({
  insert: function (userId, doc) {
    return doc.userId === userId;
  },
  update: function (userId, doc, fields, modifier) {
    return doc.userId === userId;
  }
});
