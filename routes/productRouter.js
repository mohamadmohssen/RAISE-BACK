// import controllers review, products
const productController = require("../controllers/productController.js");
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/userController.js");
const adminController = require("../controllers/adminController.js");

// router
const router = require("express").Router();

// use routers
router.post(
  "/addProduct",
  productController.upload,
  productController.addProduct
);
router.post("/addUser", userController.addUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/takedUsers", userController.getTakedUsers);
router.get("/allProducts", productController.getAllProducts);

router.get("/published", productController.getPublishedProduct);

// Admin Url and Controller
router.post("/addAdmin", adminController.addAdmin);
router.post("/signup", adminController.signUp);
router.post("/login", adminController.login);

router.get("/getAllAdmins", adminController.getAllAdmins);
router.get("/checkUserExists", adminController.checkUserExists);

// Review Url and Controller

router.get("/allReviews", reviewController.getAllReviews);
router.post("/addReview", reviewController.addReview);

// get product Reviews
router.get("/getProductReviews/:id", productController.getProductReviews);

// Products router
router.get("/:id", productController.getOneProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
