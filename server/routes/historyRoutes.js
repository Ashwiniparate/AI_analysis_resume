const express = require("express");

const router = express.Router();

const History = require("../models/History");



// GET ALL HISTORY

router.get("/", async(req,res)=>{


    try{


        const history = await History.find()
        .sort({
            createdAt:-1
        });



        res.status(200).json(history);



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });


    }


});




// DELETE HISTORY

router.delete("/:id", async(req,res)=>{


    try{


        const deletedHistory =
        await History.findByIdAndDelete(req.params.id);



        if(!deletedHistory){


            return res.status(404).json({

                message:"History not found"

            });


        }



        res.json({

            message:"History deleted successfully"

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});



module.exports = router;