const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

// /accounts;
router.get("/", async (req, res, next) => {
  // SELECT * FROM accounts
  try {
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  // SELECT * FROM "accounts" WHERE "id" LIMIT 1
  try {
    const [account] = await db
      .select("*")
      .from("accounts")
      .where("id", req.params.id)
      .limit(1);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  // name=string and budget=int
  try {
    const payload = { name: req.body.name, budget: req.body.budget };

    // INSERT INTO "accounts" ("name", "budget") VALUES (?, ?)
    const [id] = await db("accounts").insert(payload);
    const account = await db("accounts").where("id", id).first();
    // return not just an array of id(s) but the whole info
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  // UPDATE 'accounts' SET 'name' AND 'budget' WHERE=id
  try {
    const payload = { name: req.body.name, budget: req.body.budget };
    // doesn't need brackets like before because it is not iterable
    const updateAcc = await db("accounts")
      .where("id", req.params.id)
      .update(payload);
    // const updateAcc = await db("accounts").where("id", id).first();
    res.json(updateAcc);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts").where("id", req.params.id).del();
    res.status(202).end();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
