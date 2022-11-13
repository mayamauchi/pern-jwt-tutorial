const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

 router.get("/", authorization, async (req, res) => {
      try {
        //req.user has the payload
        // res.json(req.user);
        const user = await pool.query(
          "SELECT user_name FROM users WHERE user_id = $1",
          [req.user] 
        ); 
        
        res.json(user.rows[0]);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    });


module.exports = router;

