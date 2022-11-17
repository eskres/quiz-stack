const router = require('express').Router();
const categoryCntrl = require("../controllers/categories");

router.get("/categories/", categoryCntrl.category_index_get);
router.get("/category/", categoryCntrl.category_show_get);
router.post("/category/create", categoryCntrl.category_create_post);
router.put("/category/update", categoryCntrl.category_update_put);
router.delete("/category/delete", categoryCntrl.category_delete);

module.exports = router;