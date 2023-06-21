const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  addRemoveFriend,
  getUserFriends,
  uploadImage,
} = require('../controllers/userController');

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin'), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
// router.route('/updateUser').patch(authenticateUser, updateUser);
// router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

// TODO: uncomment the following line
// router.route('/:id').get(authenticateUser, getSingleUser);
router.route('/:id').get(getSingleUser);
router.route('/:id/friends').get(authenticateUser, getUserFriends);
router.route('/:id/:friendId').patch(authenticateUser, addRemoveFriend);
router
  .route('/uploadImage')
  .post(authenticateUser, uploadImage);

module.exports = router;