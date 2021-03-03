// const fetch = require('node-fetch');
const req = require("postman-request");
const util = require("util");
const reqPost = util.promisify(req.post);
const envJson = require("dotenv").config();
exports.getImageUrl = async (imageData) => {
    // let options = {    
    //     form:{   
    //         key: `${envJson.parsed.API_KEY}`,
    //         image: imageData,
    //     },
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    // }
    // let url = "https://api.imgbb.com/1/upload"
    // const imageUrl = await fetch(url,options)
    // .then(imgUpload => {
    //     console.log(imgUpload)
    //     // imgUpload = JSON.parse(imgUpload);
    //     return imgUpload.data.image.url
    // })
    // .catch(err => {
    //                     console.log("error in uploadinggg")
    //                     console.log(err)
    //                     return null
    // })
    let options = {
      key: envJson.parsed.API_KEY,
      image: imageData,
    };
    let imgUpload = await reqPost({
        url: "https://api.imgbb.com/1/upload",
        form: options,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      imgUpload = JSON.parse(imgUpload.body);
      if (imgUpload.status !== 200) {
        throw Error("not able to upload image");
      }
      console.log("completed")
      let imageUrl= imgUpload.data.image.url;
      console.log(imageUrl)
    return imageUrl;
}