const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { createMood, today, history } = require('../controllers/moodController');

router.use(auth);
router.post('/', createMood);
router.get('/today', today);
router.get('/history', history);

module.exports = router;