const pool = require('../config/db');

class ProovedoresController {
    constructor() {}

    async getAllProovedores(req, res) {
        try {
            const results = await pool.query('SELECT * FROM proovedores');
            return res.status(200).send({
                success: 'true',
                message: 'proovedores retrieved successfully',
                proovedores: results,
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async getProovedoresById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const [result] = await pool.query('SELECT * FROM proovedores WHERE id = ?', [id]);
            if (result.length > 0) {
                return res.status(200).send({
                    success: 'true',
                    message: 'proovedores retrieved successfully',
                    proovedores: result[0],
                });
            } else {
                return res.status(404).send({
                    success: 'false',
                    message: 'proovedores does not exist',
                });
            }
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async createProovedores(req, res) {
        try {
            const { nombre, legajo, tipo } = req.body;
            await pool.query('INSERT INTO proovedores (nombre, legajo, tipo) VALUES (?, ?, ?)', [nombre, legajo, tipo]);
            return res.status(201).send({
                success: 'true',
                message: 'proovedores added successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async updateProovedores(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { nombre, legajo, tipo } = req.body;
            await pool.query('UPDATE proovedores SET nombre = ?, legajo = ?, tipo = ? WHERE id = ?', [nombre, legajo, tipo, id]);
            return res.status(200).send({
                success: 'true',
                message: 'proovedores updated successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async deleteProovedores(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await pool.query('DELETE FROM proovedores WHERE id = ?', [id]);
            return res.status(200).send({
                success: 'true',
                message: 'proovedores deleted successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }
}

module.exports = ProovedoresController;
