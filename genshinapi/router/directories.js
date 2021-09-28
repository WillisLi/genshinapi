import path from 'path';

const assetDirectory = (category) => {
    path.join(__dirname, '../public/assets', category);
}

const dataDirectory = (category) => {
    path.join(__dirname, '../public/data', category);
}

module.exports = {
    assetDirectory,
    dataDirectory,
}