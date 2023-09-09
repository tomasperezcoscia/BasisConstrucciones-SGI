//Crear insumosController, basado en insumosModel

const insumosModel = require('../models/insumosModel');

class insumosController {
    constructor() {
        this.insumos = [];
    }

    //get all insumoss
    getAllinsumoss(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'insumoss retrieved successfully',
            insumoss: this.insumoss,
        });
    }

    //get a single insumos by id
    getinsumosById(req, res) {
        const id = parseInt(req.params.id, 10);
        this.insumoss.map((insumos) => {
            if (insumos.id === id) {
                return res.status(200).send({
                    success: 'true',
                    message: 'insumos retrieved successfully',
                    insumos,
                });
            }
        });
        return res.status(404).send({
            success: 'false',
            message: 'insumos does not exist',
        });
    }

    //create a new insumos
    createinsumos(req, res) {
        if (!req.body.nombre) {
            return res.status(400).send({
                success: 'false',
                message: 'nombre is required',
            });
        } else if (!req.body.legajo) {
            return res.status(400).send({
                success: 'false',
                message: 'legajo is required',
            });
        }
        const insumos = new insumosModel(req.body.id, req.body.legajo, req.body.nombre, req.body.tipo);
        this.insumoss.push(insumos);
        return res.status(201).send({
            success: 'true',
            message: 'insumos added successfully',
            insumos,
        });
    }

    //update a insumos
    updateinsumos(req, res) {
        const id = parseInt(req.params.id, 10);
        let insumosFound;
        const insumosToUpdate = this.insumoss.map((insumos) => {
            if (insumos.id === id) {
                insumosFound = insumos;
                insumos.nombre = req.body.nombre || insumos.nombre;
                insumos.legajo = req.body.legajo || insumos.legajo;
                insumos.tipo = req.body.tipo || insumos.tipo;
            }
            return insumos;
        });
        if (!insumosFound) {
            return res.status(404).send({
                success: 'false',
                message: 'insumos not found',
            });
        }
        this.insumoss = insumosToUpdate;
        return res.status(201).send({
            success: 'true',
            message: 'insumos added successfully',
            insumosToUpdate,
        });
    }

    //delete a insumos
    deleteinsumos(req, res) {
        const id = parseInt(req.params.id, 10);
        this.insumoss.map((insumos, index) => {
            if (insumos.id === id) {
                this.insumoss.splice(index, 1);
                return res.status(200).send({
                    success: 'true',
                    message: 'insumos deleted successfuly',
                });
            }
        });
        return res.status(404).send({
            success: 'false',
            message: 'insumos not found',
        });
    }
}

export default insumosController;
