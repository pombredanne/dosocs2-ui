Meteor.startup(function () {
  
  Api = new Restivus({
      version: 'v1',
      useDefaultAuth: true,
      prettyJson: true
    });

  Api.addCollection(Meteor.users);

  Api.addRoute('uploads/:id', {authRequired: true}, {
      post:{
        action: function () {
          var upload = Uploads.findOne(this.urlParams.id);
          if (article) {
            return {status: "success", data: upload};
          }
          return {
            statusCode: 400,
            body: {status: "fail", message: "Unable to find Package"}
          };
        }
      }
    });
  
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      console.log(this.user);
      fileInfo.name = Random.id([3.414]) + '_' + fileInfo.name;
      if (formData && formData.directoryName != null) {
        return formData.directoryName;
      }
      return "";
    },
    getFileName: function(fileInfo, formData) {
      if (formData && formData.prefix != null) {
        //console.log(fileInfo.name);
        return formData.prefix + '_' + fileInfo.name;
      }
      return fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      if (formData && formData._id != null) {
        Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
      }
    }
  });
});
