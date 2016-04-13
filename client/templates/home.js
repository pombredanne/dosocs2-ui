
Template['home'].helpers({
  spdxdoc: function(){
    console.log(Session.get("spdxdoc"));
    return Session.get("spdxdoc");
  }
});
