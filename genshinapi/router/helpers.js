const AWS = require('aws-sdk');
const keyv = require('keyv')
require("dotenv").config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

const cache = new keyv();
const s3 = new AWS.S3();

const getList = async (dir, pfx, delim) => {
    const catsList = await cache.get(`${pfx}`);
    if (catsList) {
        return catsList
    } else {
        console.log('List of Objects Not Cached')
    }
    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Delimiter: `${delim}`,
            Prefix: `public/${dir}/${pfx}`
        }
        const { CommonPrefixes } = await s3.listObjectsV2(params).promise()
        const folders = CommonPrefixes.map(obj => obj["Prefix"].replace(`${params.Prefix}`, "").slice(0, -1))
        await cache.set(`${pfx}`, folders);
        return folders
    }
    catch(error) {
        res.status(500).json({message: "Could not get list of objects."})
    }
}

const getEntity = async (category, name) => {
    const entity = await cache.get(`${name}`);
    if (entity) {
        return entity
    } else {
        console.log('Entity Not Cached')
    }
    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `public/data/${category}/${name}/${name}.json`
        }
        const data = await s3.getObject(params).promise()
        const parsed = JSON.parse(data.Body.toString())
        await cache.set(`${name}`, parsed);
        return parsed
    }
    catch(error) {
        res.status(404).json({message: "Entity with that name does not exist in this category."})
    }
}

const getImage = async (category, name, type) =>{
    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `public/assets/${category}/${name}/${type}.png`
        }
        return s3.getObject(params).createReadStream()
    }
    catch(error) {
        res.status(404).json({message: "Entity with that name does not exist in this category."})
    }
}

module.exports = {
    getList,
    getEntity,
    getImage,
};