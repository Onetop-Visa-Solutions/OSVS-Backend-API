const express = require('express');
const { testimonialController } = require('../../controllers');
const multer = require('multer');

//Router
const router = express.Router();
const upload = multer({storage:multer.memoryStorage()});

//Routes
router
  .route('/')
  .get(testimonialController.getTestimonials)
  .post(testimonialController.createTestimonials, upload.single('avatar'));
router
  .route('/:id')
  .patch(testimonialController.updateTestimonials)
  .delete(testimonialController.deleteTestimonials);

module.exports = router;
