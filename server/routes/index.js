import { Router } from 'express';
const router = Router();

//Redireccionar a la pagina de inicio
router.get('/', (req, res) => {
    res.send('Home');
});

//Redireccionar a la pagina de login
router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: '../public' });
});

//Redireccionar a la pagina de agregado de personal
router.get('/personal', (req, res) => {
    res.send('Personal');
});

export default router;