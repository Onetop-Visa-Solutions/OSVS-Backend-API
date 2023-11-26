const express = require('express');
const {
  paymentOrderController,
  paymentHistoryController,
} = require('../../controllers');

const router = express.Router();

/**
 * @description THis route is responsible for payment order only
 */
router
  .route('/order')
  .get(paymentOrderController.getAllPaymentOrders)
  .post(paymentOrderController.createPaymentOrder);
router
  .route('/order/:id')
  .get(paymentOrderController.getPaymentOrder)
  .patch(paymentOrderController.updatePaymentOrder)
  .delete(paymentOrderController.deletePaymentOrder);

/**
 * @description this route is responsible for payment history
 */
router
  .route('/history')
  .get(paymentHistoryController.getAllPaymentHistory)
  .post(paymentHistoryController.createPaymentHistory);
router
  .route('/history/:id')
  .get(paymentHistoryController.getPaymentHistory)
  .patch(paymentHistoryController.updatePaymentHistory)
  .delete(paymentHistoryController.deletePaymentHistory);

module.exports = router;
