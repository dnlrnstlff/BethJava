
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
   response.success("Hello world!");
  // var class = "Chat";
   var string = "roomId";
var stringAsArray = string.split("roomIDarray");
});

Parse.Cloud.job("deleteMessages", function(request, status) {

  Parse.Cloud.useMasterKey();

    var ts = Math.round(new Date().getTime() / 1000);
    var tsYesterday = ts - (7 * 24 * 3600);
    var dateYesterday = new Date(tsYesterday*1000);

    var query = new Parse.Query("Messages");

    query.lessThan("updatedAt", dateYesterday);

    query.find({
        success: function(result) {
            for(var i=0; i<result.length; i++) {
                result[i].destroy({
                    success: function(object) {
                        status.success("Delete job completed");
                        alert('Delete Successful');
                    },
                    error: function(object, error) {
                        status.error("Delete error :" + error);
                        alert('Delete failed');
                    }
                });
            }
            status.success("Delete job completed");
        },
        error: function(error) {
            status.error("Error in delete query error: " + error);
            alert('Error in delete query');
        }
    });
});

Parse.Cloud.define("deleteMessages", function(request, response) {

	 Parse.Cloud.useMasterKey();

    var roomId = request.params.objectId;

    var query = new Parse.Query("ChatRooms");
    query.equalTo("objectId", roomId);
    query.find().then(function (roomId) {

        //What do I do HERE to delete the posts?
        objectId.forEach(function(roomId) {
            objectId.destroy({
                success: function() {
                    // SUCCESS CODE HERE, IF YOU WANT
                },
                error: function() {
                    // ERROR CODz IF YOU WANT
                }
            });
        });
    }, function (error) {
         response.error(error);
    });
});