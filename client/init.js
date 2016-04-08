Meteor.startup(function() {
  Uploader.finished = function(index, file) {
    Uploads.insert(file);
    sAlert.info("Package saved!", {effect: 'bouncyflip', position: 'top-right', timeout: 3000, onRouteClose: true, stack: true, offset: '100px'});
  }
});
