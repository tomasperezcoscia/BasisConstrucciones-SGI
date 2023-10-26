import pool from '../config/db.js';

class PersonalController {
    
    // Get all personal
    async getAllPersonal(req, res) {
        try {
            const result = await pool.query("SELECT * FROM personal");
            return res.status(200).send({
                success: 'true',
                message: 'personal retrieved successfully',
                personal: result.rows });
        } catch (error) {
            return res.status(500).send({ 
            success: 'false',
            message: error.message });
        }
    }

    // Get a single personal by id
    async getPersonalById(req, res) {
        try {
            const result = await pool.query("SELECT * FROM personal WHERE id = $1", [req.params.id]);
            if (result.rows.length) {
                return res.status(200).send({ success: 'true', message: 'personal retrieved successfully', personal: result.rows[0] });
            } else {
                return res.status(404).send({ success: 'false', message: 'personal does not exist' });
            }
        } catch (error) {
            return res.status(500).send({ success: 'false', message: error.message });
        }
    }

    // Create a new personal
    async createPersonal(req, res) {
        const { id, legajo, nombre, salarioHora, estado, fechaDeAlta, fechaDeBaja } = req.body;
        try {
            await pool.query("INSERT INTO personal (id, legajo, nombre, salarioHora, estado, fechaDeAlta, fechaDeBaja) VALUES ($1, $2, $3, $4, $5, $6, $7)", [id, legajo, nombre, salarioHora, estado, fechaDeAlta, fechaDeBaja]);
            return res.status(201).send({ success: 'true', message: 'personal added successfully' });
        } catch (error) {
            return res.status(500).send({ success: 'false', message: error.message });
        }
    }

    // Update a personal
    async updatePersonal(req, res) {
        const { id } = req.params;
        const { legajo, nombre, salarioHora, estado, fechaDeAlta, fechaDeBaja } = req.body;
        try {
            const result = await pool.query("UPDATE personal SET legajo = $2, nombre = $3, salarioHora = $4, estado = $5, fechaDeAlta = $6, fechaDeBaja = $7 WHERE id = $1", [id, legajo, nombre, salarioHora, estado, fechaDeAlta, fechaDeBaja]);
            if (result.rowCount) {
                return res.status(201).send({ success: 'true', message: 'personal updated successfully' });
            } else {
                return res.status(404).send({ success: 'false', message: 'personal not found' });
            }
        } catch (error) {
            return res.status(500).send({ success: 'false', message: error.message });
        }
    }

    // Delete a personal
    async deletePersonal(req, res) {
        const { id } = req.params;
        try {
            const result = await pool.query("DELETE FROM personal WHERE id = $1", [id]);
            if (result.rowCount) {
                return res.status(200).send({ success: 'true', message: 'personal deleted successfully' });
            } else {
                return res.status(404).send({ success: 'false', message: 'personal not found' });
            }
        } catch (error) {
            return res.status(500).send({ success: 'false', message: error.message });
        }
    }
}

export default PersonalController;
