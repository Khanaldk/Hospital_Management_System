const express=require('express');
const UserRoutes = require('./UserRoutes');
const AuthRoutes = require('./AuthRoutes');
const HospitalRoutes = require('./HospitalRoutes');
const PatientRoutes = require('./PatientRoutes');
const DiseaseRoutes = require('./DiseaseRoutes');
const MedicineRoutes = require('./MedicineRoutes');
const TreatmentRoutes = require('./TreatmentRoutes');
const CashierRoutes = require('./CashierRoutes');
const routes=express.Router();

routes.use('/user',UserRoutes);
routes.use('/auth',AuthRoutes);
routes.use('/hospital',HospitalRoutes);
routes.use('/patient',PatientRoutes);
routes.use('/disease',DiseaseRoutes);
routes.use('/medicine',MedicineRoutes);
routes.use('/treatment',TreatmentRoutes);
routes.use('/cashier',CashierRoutes)

module.exports=routes