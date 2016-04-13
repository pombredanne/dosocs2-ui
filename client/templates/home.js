
Template['home'].helpers({
  spdxdoc: function(){
    console.log(Session.get("spdxdoc"));
    return Session.get("spdxdoc");
  }
});


Template['uploadedInfo'].helpers({
  src: function() {
    return 'file_icon.png';
  }
});


Template['uploadedInfo'].events({
  'click .deleteUpload':function() {
    sAlert.warning("File deleted", {effect: 'bouncyflip', position: 'top-right', timeout: 3000, onRouteClose: true, stack: true, offset: '100px'})
    Meteor.call('deleteFile', this._id);
  },
  'click .SPDXGenerate':function(event, template) {
    event.preventDefault();
    sAlert.info("SPDX Generation in progress", {effect: 'bouncyflip', position: 'top-right', onRouteClose: true, stack: true, offset: '100px'});
    Meteor.call('generateSPDX', this._id, function(err, response){
        if(err){
          sAlert.error("Error in scanning " + this._id, {effect: 'bouncyflip', position: 'top-right', timeout: 3000, onRouteClose: true, stack: true, offset: '100px'});

        }
        if(response){
          sAlert.success("Scanning completed, navigate down for resutls", {effect: 'bouncyflip', position: 'top-right', timeout: 3000, onRouteClose: true, stack: true, offset: '100px'});
          Session.set("spdxdoc", response);
        }
    });
  }
})
