let express = require("express");
const router = express.Router();
const { isLoggedIn, isHotelAuthor } = require("../middlewares/index");
const {showHome, showAllHotels, newHotelGet, newHotelPost, checkout, checkoutCancel, checkoutSuccess, downvoteHotel, upvoteHotel, deleteHotel, editHotelPost, editHotelGet, showHotel} = require('../controllers/hotel-controllers')

// ! cloud upload
const multer = require("multer");
const { storage } = require("../cloudinary/cloud_config");
const upload = multer({ storage });

router.get("/",showHome);

router.get("/hotels", showAllHotels);

router.get("/hotels/new", isLoggedIn, newHotelGet);

router.post("/hotels", isLoggedIn, upload.array("image"), newHotelPost);

router.get("/hotels/:id", isLoggedIn, showHotel);

router.get("/hotels/:id/edit", isLoggedIn, isHotelAuthor, editHotelGet);

router.patch("/hotels/:id", isLoggedIn, isHotelAuthor,upload.array("image"), editHotelPost);

router.delete("/hotels/:id", isLoggedIn, isHotelAuthor, deleteHotel);

router.get("/hotels/:id/upvote", isLoggedIn, upvoteHotel);

router.get("/hotels/:id/downvote", isLoggedIn, downvoteHotel);

router.get('/hotels/:id/checkout/success', checkoutSuccess)

router.get('/hotels/:id/checkout/cancel', checkoutCancel)

// payment gateway
router.get("/hotels/:id/checkout", isLoggedIn, checkout);

//! i tried to upload manuel
 router.get('/seed',isLoggedIn, async (req,res)=>{
     try {
        for(let i=0; i<=49; i++) {
            let hotel = new Hotel({
                // name : 'Deneme',
                 name : `Deneme ${i+1}`,
                geometry: {
                    type: 'Point',
                     coordinates: [53.14454875347958, 8.214549055599775]
                },
                address: 'Am Stadtmuseum 4-8, 26121 Oldenburg',
                 price: Math.floor(Math.random() * 10000),
                images: [
                    {
                        url: 'https://res.cloudinary.com/dr8ntgigj/image/upload/v1686033532/Staysense/file_azr7pa.jpg',                         
                        filename: 'Staysense/file_azr7pa'
                     }
                 ],
                 upVotes : [],
                 downVotes : []
             });
             hotel.author = req.user;
             await hotel.save();
         }
         res.send('done')
     } catch (error) {
         console.log("error while make hotels", error)
     }
 })

module.exports = router;
