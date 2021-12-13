const express = require("express");
const router = express.Router();
const bikeRepo = require("../utils/bikes.repository");

router.get("/", bikeRootAction);
router.get("/list", bikeListAction);
router.get("/show/:bike_id", bikeShowAction);
router.get("/del/:bike_id", bikeDelAction);
router.get("/edit/:bike_id", bikeEditAction);
router.post("/update/:bike_id", bikeUpdateAction);


function bikeRootAction(request, response){
     response.redirect("/bikes/list");
}
async function bikeListAction(request, response){
    // response.send('List action..');
    var bikes = await bikeRepo.getAllBike();
    // response.render("bikes_list", { "bikes": bikes });
    
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("bikes_list", { "bikes": bikes, "flashMessage": flashMessage });

}
async function bikeShowAction(request, response){
    // response.send('Show action... bike '+request.params.bike_id);
    var bike = await bikeRepo.getOneBike(request.params.bike_id);
    response.render("bikes_show", { "onebike": bike });
}
async function bikeEditAction(request, response){
    // response.send('Edit action... bike '+request.params.bike_id);
    var persons = await bikeRepo.getBlankPersons(); 
    if (request.params.bike_id!=="0") 
      var bike = await bikeRepo.getOneBike(request.params.bike_id);
    else
      var bike = bikeRepo.getBlankBike();
    response.render("bikes_edit", { "onebike": bike, "persons": persons });
}
async function bikeUpdateAction(request, response){
    // response.send('Update action... bike '+request.params.bike_id+' '+request.body.bike_name);
    var bike_id = request.params.bike_id;
    if (bike_id==0) bike_id = await bikeRepo.addOneBike(request.body.bike_person);
    var numRows = await bikeRepo.editOneBike(bike_id, request.body.bike_person, request.body.bike_name, request.body.bike_price);
    
    // only after session
    request.session.flashMessage = "ROWS MODIFIED: "+numRows;
    
    response.redirect("/bikes/list");
}
async function bikeDelAction(request, response){
    // response.send('Del action... bike '+request.params.bike_id);
    var numRows = await bikeRepo.delOneBike(request.params.bike_id);
    
    // only after session
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    
    response.redirect("/bikes/list");
}

module.exports = router;