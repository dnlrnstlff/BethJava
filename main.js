/*	Beth Parse Cloud Code
	Daniel-Ernest Luff

A simple way to easily delete entries on Parse Core using Cloud Code. Just schedule through Parse.

*/

//Name the parse job
Parse.Cloud.job("deleteMessages", function(request, status) {

  Parse.Cloud.useMasterKey();

	//Current time
    var ts = Math.round(new Date().getTime() / 1000);
    //
    //Time difference variable. Change this for the altered time difference.
    var tsYesterday = ts - (7 * 24 * 3600);
    var dateYesterday = new Date(tsYesterday*1000);

	//Parse table query. (Case-Sen duh)
    var query = new Parse.Query("Messages");

	//Parse row query. (Camel-case duh)
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
