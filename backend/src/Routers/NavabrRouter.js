import express from 'express';

import upload from '../Config/multerConfig.js';
import { GetNavbar, navbarlogo } from '../Controllers/Homepagedynamic/Navbar.js';
const navbarrouter=express.Router();
navbarrouter.post('/logo', upload.single('logo'), navbarlogo);
navbarrouter.get('/get',GetNavbar);
export default  navbarrouter;