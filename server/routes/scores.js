const router = require('express').Router();
const scoreCntrl = require("../controllers/scores");

router.get("/scores/", scoreCntrl.score_index_get);
router.get("/scores/user/", scoreCntrl.score_user_get);
router.get("/score/", scoreCntrl.score_show_get);
router.post("/score/create", scoreCntrl.score_create_post);
router.put("/score/update", scoreCntrl.score_update_put);
router.delete("/score/delete", scoreCntrl.score_delete);

module.exports = router;