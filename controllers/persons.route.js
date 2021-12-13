const express = require('express');
const router = express.Router();
const personRepo = require('../utils/persons.repository');

router.get('/', personsRootAction);
router.get('/list', personsListAction);
router.get('/show/:person_id', personsShowAction);
router.get('/del/:person_id', personsDelAction);
router.get('/edit/:person_id', personsEditAction);
router.post('/update/:person_id', personsUpdateAction);


function personsRootAction(request, response) {
    response.redirect("/persons/list");
}
async function personsListAction(request, response) {
    // response.send('List action..');
    var persons = await personRepo.getAllPerson();
    // response.render("persons_list", { "persons": persons });

    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("persons_list", { "persons": persons, "flashMessage": flashMessage });

}
async function personsShowAction(request, response) {
    // response.send('Show action... person '+request.params.person_id);
    var person = await personRepo.getOnePerson(request.params.person_id);
    response.render("persons_show", { "oneperson": person });
}
async function personsEditAction(request, response) {
    // response.send('Edit action... person '+request.params.person_id);
    if (request.params.person_id !== "0")
        var person = await personRepo.getOnePerson(request.params.person_id);
    else
        var person = personRepo.getBlankPerson();
    response.render("persons_edit", { "oneperson": person });
}

async function personsUpdateAction(request, response) {
    // response.send('Update action... person '+request.params.person_id+' '+request.body.person_name);
    var person_id = request.params.person_id;
    if (person_id === "0") person_id = await personRepo.addOnePerson(request.body.person_person);
    var numRows = await personRepo.editOnePerson(person_id, request.body.person_name);

    // only after session
    request.session.flashMessage = "ROWS MODIFIED: " + numRows;

    response.redirect("/persons/list");
}
async function personsDelAction(request, response) {
    // response.send('Del action... person '+request.params.person_id);
    var numRows = await personRepo.delOnePerson(request.params.person_id);

    // only after session
    request.session.flashMessage = "ROWS DELETED: " + numRows;

    response.redirect("/persons/list");
}

module.exports = router;