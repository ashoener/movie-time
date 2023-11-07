import { Router } from "express";
import requireLoggedIn from "../lib/middleware/requireLoggedIn";

const router = Router();

router.get("/", requireLoggedIn, async (req, res) =>{
    res.render("savedmovies")
});

export default router;