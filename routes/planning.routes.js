const router = require('express').Router();
const planningController = require('../controllers/planning.controller');

router.get('/', planningController.getAllUsers);
router.post('/', planningController.createUser);
router.get('/:id', planningController.getUser);
router.post('/:id', planningController.postEvent);
router.delete('/:id', planningController.deleteUser);
router.patch('/:userId', planningController.deleteEvent);
router.put('/:userId', planningController.editEvent);

module.exports = router;
