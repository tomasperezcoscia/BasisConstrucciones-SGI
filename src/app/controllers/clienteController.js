const ClienteModel = require('../models/ClienteModel');
const pool = require('../config/db');

class ClienteController {
    constructor() {}

    async getAllClientes(req, res) {
        try {
            const results = await pool.query('SELECT * FROM clientes');
            return res.status(200).send({
                success: 'true',
                message: 'clientes retrieved successfully',
                clientes: results,
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async getClienteById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const [result] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
            if (result.length > 0) {
                return res.status(200).send({
                    success: 'true',
                    message: 'cliente retrieved successfully',
                    cliente: result[0],
                });
            } else {
                return res.status(404).send({
                    success: 'false',
                    message: 'cliente does not exist',
                });
            }
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async createCliente(req, res) {
        try {
            const { name, email, address } = req.body; // Adjust the destructuring based on your cliente model attributes
            await pool.query('INSERT INTO clientes (name, email, address) VALUES (?, ?, ?)', [name, email, address]);
            return res.status(201).send({
                success: 'true',
                message: 'cliente created successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async updateCliente(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, email, address } = req.body;
            await pool.query('UPDATE clientes SET name = ?, email = ?, address = ? WHERE id = ?', [name, email, address, id]);
            return res.status(200).send({
                success: 'true',
                message: 'cliente updated successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }

    async deleteCliente(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
            return res.status(200).send({
                success: 'true',
                message: 'cliente deleted successfully',
            });
        } catch (error) {
            res.status(500).send({ message: 'Database error' });
        }
    }
}

module.exports = ClienteController;
