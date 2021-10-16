const router = require('express').Router();
const Api = require('./helpers');

router.get('/', (req, res, next) => {
    Api.getList("data", "", "/")
        .then(catList => {
                res.status(200).json(catList)
            })
            .catch(() => {
                res.status(404).json({message: "Unable to get list of categories."})
            }) 
})

router.get('/:category', (req, res, next) => {
    const { category } = req.params;
    Api.getList("data", `${category}/`, "/")
        .then(entityList => {
                res.status(200).json(entityList)
            })
            .catch(() => {
                res.status(404).json({message: "Unable to get list of entities."})
            }) 
})

router.get('/:category/:name', (req, res) => {
    const { category, name } = req.params;

    Api.getEntity(category, name)
        .then(entityExists => {
            res.status(200).json(entityExists)
        })
        .catch(() => {
            res.status(404).json({message: "Entity with that name does not exist in this category."})
        }) 
})

router.get('/:category/:name/images', (req, res) => {
    const { category, name } = req.params;
    Api.getList("assets", `${category}/${name}/`, ".")
        .then(imagesList => {
                res.status(200).json(imagesList)
            })
            .catch(() => {
                res.status(404).json({message: "Unable to get list of entities."})
            }) 
})

router.get('/:category/:name/:imageType', (req, res) => {
    const { category, name, imageType } = req.params;

    Api.getImage(category, name, imageType)
        .then(imageExists => {
            imageExists.pipe(res)
        })
        .catch(() => {
            res.status(404).json({message: "Image not found."});
        })
})

module.exports = router;