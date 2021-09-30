const { assetDirectory, dataDirectory} = require('./directories')
const fs = require('fs')
const path = require('path');

const getCategoryList = () => {
    const categories = fs.readdirSync(dataDirectory(''));
    return categories
}

const getEntityList = (category) => {
    const entities = fs.readdirSync(dataDirectory(`/${category}`));
    return entities;
}

const getEntity = (category, name) => {
    const data = fs.readFile(dataDirectory(`/${category}/${name}`, (error, files) => {
        if (error) {
            res.status(500).send({message: "Unable to scan files!"});
        }
        return files;
    }))
}

const getImageList = (category, name) => {
    const images = fs.readdirSync(assetDirectory(`/${category}/${name}`));
    for (let image = 0; image < images.length; image++) {
        images[image] = path.parse(images[image]).name
    }
    return images;
} 

const getImageByType = (category, name, type) =>{

}

module.exports = {
    getCategoryList,
    getEntityList,
    getEntity,
    getImageList,
    getImageByType,
};