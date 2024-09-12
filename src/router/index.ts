import express from "express";

const router = express.Router();

router.post('/registration', (req: any, res: any, next: any) => {
  console.log('registration');
  res.json("registered");
});

export {router};