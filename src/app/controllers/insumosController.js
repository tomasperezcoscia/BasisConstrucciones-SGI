const insumosModel = require('../models/insumosModel');
const pool = require('../config/db');

class insumosController {
    constructor() {}

    async getAllInsumos(req, res) {
        try {
            const results = await pool.query('SELECT * FROM insumos');
            return res.status(200).send({
                success: 'true',
                message: 'insumos retrieved successfully',
                insumos: results,
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async getInsumosById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const [result] = await pool.query('SELECT * FROM insumos WHERE id = ?', [id]);
            if (result.length > 0) {
                return res.status(200).send({
                    success: 'true',
                    message: 'insumos retrieved successfully',
                    insumos: result[0],
                });
            } else {
                return res.status(404).send({
                    success: 'false',
                    message: 'insumos does not exist',
                });
            }
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async createInsumos(req, res) {
        try {
            const { name, description, quantity } = req.body; // Adjust the destructuring based on your insumos model
            await pool.query('INSERT INTO insumos (name, description, quantity) VALUES (?, ?, ?)', [name, description, quantity]);
            return res.status(201).send({
                success: 'true',
                message: 'insumo created successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async updateInsumos(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, description, quantity } = req.body;
            await pool.query('UPDATE insumos SET name = ?, description = ?, quantity = ? WHERE id = ?', [name, description, quantity, id]);
            return res.status(200).send({
                success: 'true',
                message: 'insumo updated successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async deleteInsumos(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await pool.query('DELETE FROM insumos WHERE id = ?', [id]);
            return res.status(200).send({
                success: 'true',
                message: 'insumo deleted successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }
}

module.exports = insumosController;
