const express=require('express');
const upload=require('../uploadResumeConfig');
const applicationController=require('../controllers/applicationController');

const applicationRoute=express.Router();

applicationRoute.post('/addapplication',upload.single('resume'),applicationController.addApplication);
applicationRoute.get('/getapplications',applicationController.getApplications);
applicationRoute.delete('/deleteApplication/:id',applicationController.deleteApplication);
applicationRoute.put('/updateapplication/:id',upload.single('resume'),applicationController.updateApplication);
applicationRoute.get('/download/resumes/:filename',applicationController.downloadResume);

module.exports=applicationRoute;