Template.initprofile.helpers({
  profileText: function(){
    return 'Profile'
  }
})

Template.initprofile.events({
  'click .js-getprofile': function(event, template){
    Router.go('/profile');
  }
})

