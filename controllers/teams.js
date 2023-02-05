const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('sports').collection('teams').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('sports').collection('teams').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createTeam = async (req, res) => {
  try {
    const team = {
      division: req.body.division,
      sport: req.body.sport,
      location: req.body.location,
      abbrev: req.body.abbrev,
      mascot: req.body.mascot,
      conference: req.body.conference,
      pic: req.body.pic
    };
    const response = await mongodb.getDb().db('sports').collection('teams').insertOne(team);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred while creating the team.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTeam = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const team = {
      division: req.body.division,
      sport: req.body.sport,
      location: req.body.location,
      abbrev: req.body.abbrev,
      mascot: req.body.mascot,
      conference: req.body.conference,
      pic: req.body.pic
    };
    const response = await mongodb
      .getDb()
      .db('sports')
      .collection('teams')
      .replaceOne({ _id: userId }, team);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while updating the team.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTeam = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('sports')
      .collection('teams')
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting the team.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createTeam,
  updateTeam,
  deleteTeam
};
