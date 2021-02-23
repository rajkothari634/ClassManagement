const fetch = require('node-fetch');
const envJson = require("dotenv").config();
exports.getImageUrl = async (imageData) => {
    let options = {
        form: {      
            key: `${envJson.parsed.API_KEY}`,
            image: imageData
        },
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
    }
    let url = "https://api.imgbb.com/1/upload"
    const imageUrl = await fetch(url,options)
                    .then(imgUpload => {
                        imgUpload = JSON.parse(imgUpload);
                        return imgUpload.data.image.url
                    })
                    .catch(err => {
                        return null
                    })
    return imageUrl;
}