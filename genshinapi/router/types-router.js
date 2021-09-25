const router = require('express').Router();

router.get('/', (req, res, next) => {
    Images.getCategoryList()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(next);
})

router.get('/:category', (req, res, next) => {
    const { category } = req.params;

    Images.getEntityList(category)
        .then(list => {
            res.status(200).json(list);
        })
        .catch(next)
})

router.get('/:category/:name', (req, res) => {
    const { category, name } = req.params;

    Images.getEntity(category, name)
        .then(entityExists => {
            res.status(200).json(entityExists)
        })
        .catch(() => {
            res.status(404).json({message: "Entity with that name does not exist in this category."})
        })
})

router.get('/:category/:name/images', (req, res) => {
    const { category, name } = req.params;

    Images.getImageList(category, name)
        .then(imageOptions => {
            res.status(200).json(imageOptions)
        })
        .catch(() => {
            res.status(404).json({message: "Image options not found."})
        })
})

router.get('/:category/:name/:imageType', (req, res) => {
    const { category, name, imageType } = req.params;

    Images.getImageByType(category, name, imageType)
        .then(imageExists => {
            res.status(200).json(imageExists);
        })
        .catch(() => {
            res.status(404).json({message: "Image not found."});
        })
})

module.exports = router;