const router = require('express').Router();
const questionCntrl = require("../controllers/questions");

router.get("/questions/", questionCntrl.question_index_get);
router.get("/questions/category/", questionCntrl.question_category_get);
router.get("/question/", questionCntrl.question_show_get);
router.post("/question/create", questionCntrl.question_create_post);
router.put("/question/update", questionCntrl.question_update_put);
router.delete("/question/delete", questionCntrl.question_delete);

module.exports = router;