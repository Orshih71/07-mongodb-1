const express = require('express');
const router = express.Router();

/* GET lecture listing. */
router.get('/', async (req, res, next) => {
	try{
		const db = req.app.locals.db;
		const result = await db.collection('lectures').find({}).toArray();
		res.json(result);
	}
	catch (e) {
		return next(e);
	}
});
/* GET lecture first one. */
router.get('/findOne', async (req, res, next) => {
	try{
		const db = req.app.locals.db;
		const result = await db.collection('lectures').findOne();
		res.json(result);
	}
	catch (e) {
		return next(e);
	}
});
/* GET search. */
router.get('/search/:q', async (req, res, next) => {
	try{
		const {q} = req.params;
		if(q){
			const db = req.app.locals.db;
			const result = await db.collection('lectures').find({"lecture":q}).toArray();
			res.json(result);
		}
		else return next("Empty request");
	}
	catch (e) {
		return next(e);
	}
});

router.post('/', async (req, res, next) => {
	try{
		const db = req.app.locals.db;
		await db.collection('lectures').insert(req.body, function (err, doc) {
			if(err) return next(err);
			else res.sendStatus(200);
		});
	}
	catch (e) {
		return next(e);
	}
});
router.delete('/:course', async (req, res, next) => {
	try{
		const {course} = req.params;
		if(course){
			const db = req.app.locals.db;
			await db.collection('lectures').remove({"course":course}, function (err, doc) {
				if(err) return next(err);
				else res.sendStatus(200);
			});
		}
		else return next("Data not found");
	}
	catch (e) {
		return next(e);
	}
});
module.exports = router;
