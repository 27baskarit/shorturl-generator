const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const errorUrl= `${process.env.ERROR_URL}`;
var path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports = app => {
  app.get("/", async (req, res) => {
    res.sendFile(appDir+'/404.html');
  });


  app.get("/:code", async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
       res.sendFile(appDir+'/404.html');
    }
  });

  app.get('/404',function(req,res){
    res.sendFile(appDir+'/404.html');
  });  

  app.post("/api/item", async (req, res) => {
    const { originalUrl, shortBaseUrl } = req.body;
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res
        .status(401)
        .json(
          "Invalid Base Url"
        );
    }
    const urlCode = shortid.generate();
    const updatedAt = new Date();
    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          res.status(200).json(item);
        } else {
          shortUrl = shortBaseUrl + "/" + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        res.status(401).json("Invalid User Id");
      }
    } else {
      return res
        .status(401)
        .json(
          "Invalid Original Url"
        );
    }
  });
};