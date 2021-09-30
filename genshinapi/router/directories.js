const path = require('path');

const assetDirectory = (category) => {
    return path.join(__dirname, '../public/assets', category);
}

const dataDirectory = (category) => {
    return path.join(__dirname, '../public/data', category);
}

module.exports = {
    assetDirectory,
    dataDirectory,
}