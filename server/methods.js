var Future = Npm.require("fibers/future");
var exec = Npm.require("child_process").exec;

Meteor.methods({
  'deleteFile': function(_id) {
    check(_id, String);

    var upload = Uploads.findOne(_id);
    if (upload == null) {
      throw new Meteor.Error(404, 'Upload not found'); // To-Do create 404 route
    }
    UploadServer.delete(upload.path);
    Uploads.remove(_id);
  },
  'generateSPDX': function(_id) {
    this.unblock();
    var future = new Future();
    check(_id, String);
    var upload = Uploads.findOne(_id);
    if (upload == null) {
      throw new Meteor.Error(404, 'Upload not found'); // To-Do create 404 route
    }
    // DoSOCSv2 Scan starts here
    pkg_to_scan = process.env.PWD + '/.uploads/' + upload.name;
    //Spawn a child process for DoSCOSv2 Scan
    dosocs2_wrapper_loc = process.env.PWD + '/server/call_dosocs2.py'
    var command = "python " + dosocs2_wrapper_loc + ' ' + pkg_to_scan;
    exec(command,{maxBuffer: 4096 * 10000}, function(error, stdout, stderr){
        if(error){
            console.log(error);
        }
        future.return(stdout.toString());
    });
    var documentText =  future.wait();
    // Repeated SPDX Generation will update SPDX Document in the meteor mongo database
    Uploads.update({name: upload.name}, {$set: {'spdxdoc': documentText}}, {upsert:true});   
    return Uploads.findOne({name:upload.name});
  },
  'gentoken': function(userId) {
     if (this.userId){
        var randomText = Fake.sentence([2])
        Meteor.users.update({'_id':this.userId}, {$set: {'token': randomText}});
     	return Meteor.users.findOne({'_id':this.userId}, {'_id':0, 'token':1});
     }
   }


})
