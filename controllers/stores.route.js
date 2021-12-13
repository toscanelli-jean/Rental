const express = require('express');
const router = express.Router();
const storeRepo = require('../utils/stores.repository');

router.get('/', storesRootAction);
router.get('/list', storesListAction);
router.get('/show/:store_id', storesShowAction);
router.get('/del/:store_id', storesDelAction);
router.get('/edit/:store_id', storesEditAction);
router.post('/update/:store_id', storesUpdateAction);


function storesRootAction(request, response){
     response.redirect("/stores/list");
}
async function storesListAction(request, response){
    // response.send('List action..');
    var stores = await storeRepo.getAllStore();
    // response.render("stores_list", { "stores": stores });
    
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("stores_list", { "stores": stores, "flashMessage": flashMessage });

}
async function storesShowAction(request, response){
    // response.send('Show action... store '+request.params.store_id);
    var store = await storeRepo.getOneStore(request.params.store_id);
    response.render("stores_show", { "onestore": store });
}
async function storesEditAction(request, response){
    // response.send('Edit action... store '+request.params.store_id);
    if (request.params.store_id!=="0") 
      var store = await storeRepo.getOneStore(request.params.store_id);
    else
      var store = storeRepo.getBlankStore();
    response.render("stores_edit", { "onestore": store });
}

async function storesUpdateAction(request, response){
    // response.send('Update action... store '+request.params.store_id+' '+request.body.store_name);
    var store_id = request.params.store_id;
    if (store_id==="0") store_id = await storeRepo.addOneStore();
    var numRows = await storeRepo.editOneStore(store_id, request.body.store_name, request.body.store_localisation, request.body.store_size, request.body.store_stock,request.body.store_brandNb);
    
    // only after session
    request.session.flashMessage = "ROWS MODIFIED: "+numRows;
    
    response.redirect("/stores/list");
}
async function storesDelAction(request, response){
    // response.send('Del action... store '+request.params.store_id);
    var numRows = await storeRepo.delOneStore(request.params.store_id);
    
    // only after session
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    
    response.redirect("/stores/list");
}

module.exports = router;