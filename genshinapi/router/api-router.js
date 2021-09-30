const router = require('express').Router();
const Api = require('./helpers');
const {dataDirectory} = require('./directories')
router.get('/', (req, res, next) => {
    const list = Api.getCategoryList()
    res.status(200).json(list);
})

router.get('/:category', (req, res, next) => {
    const { category } = req.params;
    const list = Api.getEntityList(category)
    res.status(200).json(list);
})

router.get('/:category/:name', (req, res) => {
    const { category, name } = req.params;

    // const entityExists = Api.getEntity(category, name)
        // .then(entityExists => {
            // res.status(200).json(entityExists)
        // })
        // .catch(() => {
        //     res.status(404).json({message: "Entity with that name does not exist in this category."})
        // })
    res.sendFile(dataDirectory(`/${category}/${name}/${name}.json`));
})

router.get('/:category/:name/images', (req, res) => {
    const { category, name } = req.params;

    const imageOptions = Api.getImageList(category, name)
    res.status(200).json(imageOptions)
})

router.get('/:category/:name/:imageType', (req, res) => {
    const { category, name, imageType } = req.params;

    Api.getImageByType(category, name, imageType)
        .then(imageExists => {
            res.status(200).json(imageExists);
        })
        .catch(() => {
            res.status(404).json({message: "Image not found."});
        })
})

module.exports = router;