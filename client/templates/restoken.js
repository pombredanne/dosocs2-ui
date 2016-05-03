Template.restoken.helpers({
  Token: function(){
    return 'REST Token'
  }
})


Template.restoken.events({
  'click .getToken': function(event, template){
     event.preventDefault();
     sAlert.warning("Generating token", {effect: 'bouncyflip', position: 'top-right', timeout: 1000, onRouteClose: true, stack: true, offset: '100px'})
     Meteor.call('gentoken', Meteor.userId(), function(err, response){
         if(err){
            sAlert.error("Error in scanning ", {effect: 'bouncyflip', position: 'top-right', timeout: 3000, onRouteClose: true, stack: true, offset: '100px'});
         }
         if(response){
           console.log(response);
	}
     })
  }
})
