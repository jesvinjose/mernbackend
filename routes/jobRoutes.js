const express=require('express');

const jobRoute=express.Router();

const jobController=require('../controllers/jobController');

jobRoute.post('/addjob',jobController.addJob);
jobRoute.get('/getjobs',jobController.getJobs);
jobRoute.delete('/deletejob/:id',jobController.deleteJob);
jobRoute.put('/updatejob/:id',jobController.updateJob);

module.exports=jobRoute;