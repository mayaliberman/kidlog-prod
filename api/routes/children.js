const express = require('express');

const router = express.Router({ mergeParams: true });
const {
  getChild,
  createChild,
  updateChild,
  deleteChild,
} = require('../controllers/childrenController');
const { protect } = require('../controllers/authController');

//*****ROUTES*****
router.use(protect);
//get child
router.get('/:childId', getChild);

//add child  add in the future with session and cookie
router.post('/', createChild);

//update child
router.patch('/:childId', updateChild);

router.delete('/:childId', deleteChild);
module.exports = router;
