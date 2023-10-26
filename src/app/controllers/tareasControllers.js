const pool = require('../config/db');

class TareasController {
    constructor() {}

    async getAllTareas(req, res) {
        try {
            const results = await pool.query('SELECT * FROM tareas');
            return res.status(200).send({
                success: 'true',
                message: 'tareas retrieved successfully',
                tareas: results,
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async getTareasById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const [result] = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]);
            if (result.length > 0) {
                return res.status(200).send({
                    success: 'true',
                    message: 'tareas retrieved successfully',
                    tareas: result[0],
                });
            } else {
                return res.status(404).send({
                    success: 'false',
                    message: 'tareas does not exist',
                });
            }
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async createTareas(req, res) {
        try {
            const { nombre, legajo, tipo } = req.body;
            await pool.query('INSERT INTO tareas (nombre, legajo, tipo) VALUES (?, ?, ?)', [nombre, legajo, tipo]);
            return res.status(201).send({
                success: 'true',
                message: 'tareas added successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async updateTareas(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { nombre, legajo, tipo } = req.body;
            await pool.query('UPDATE tareas SET nombre = ?, legajo = ?, tipo = ? WHERE id = ?', [nombre, legajo, tipo, id]);
            return res.status(200).send({
                success: 'true',
                message: 'tareas updated successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async deleteTareas(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await pool.query('DELETE FROM tareas WHERE id = ?', [id]);
            return res.status(200).send({
                success: 'true',
                message: 'tareas deleted successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }
}

module.exports = TareasController;
