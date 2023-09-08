import PersonalModel from "../../models/personalModel";

// create a personal controller, based on PersonalModel

class PersonalController {
    constructor() {
        this.personal = [];
    }

    // get all personal
    getAllPersonal(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'personal retrieved successfully',
            personal: this.personal,
        });
    }

    // get a single personal by id
    getPersonalById(req, res) {
        const id = parseInt(req.params.id, 10);
        this.personal.map((personal) => {
            if (personal.id === id) {
                return res.status(200).send({
                    success: 'true',
                    message: 'personal retrieved successfully',
                    personal,
                });
            }
        });
        return res.status(404).send({
            success: 'false',
            message: 'personal does not exist',
        });
    }

    // create a new personal
    createPersonal(req, res) {
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
        const personal = new PersonalModel(req.body.id, req.body.legajo, req.body.nombre, req.body.salarioHora, req.body.estado, req.body.fechaDeAlta, req.body.fechaDeBaja);
        this.personal.push(personal);
        return res.status(201).send({
            success: 'true',
            message: 'personal added successfully',
            personal,
        });
    }

    // update a personal
    updatePersonal(req, res) {
        const id = parseInt(req.params.id, 10);
        let personalFound;
        let itemIndex;
        this.personal.map((personal, index) => {
            if (personal.id === id) {
                personalFound = personal;
                itemIndex = index;
            }
        });

        if (!personalFound) {
            return res.status(404).send({
                success: 'false',
                message: 'personal not found',
            });
        }

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

        const newPersonal = {
            id: personalFound.id,
            legajo: req.body.legajo || personalFound.legajo,
            nombre: req.body.nombre || personalFound.nombre,
            salarioHora: req.body.salarioHora || personalFound.salarioHora,
            estado: req.body.estado || personalFound.estado,
            fechaDeAlta: req.body.fechaDeAlta || personalFound.fechaDeAlta,
            fechaDeBaja: req.body.fechaDeBaja || personalFound.fechaDeBaja,
        };

        this.personal.splice(itemIndex, 1, newPersonal);

        return res.status(201).send({
            success: 'true',
            message: 'personal added successfully',
            newPersonal,
        });
    }

    // delete a personal
    deletePersonal(req, res) {
        const id = parseInt(req.params.id, 10);
        this.personal.map((personal, index) => {
            if (personal.id === id) {
                this.personal.splice(index, 1);
                return res.status(200).send({
                    success: 'true',
                    message: 'personal deleted successfuly',
                });
            }
        });

        return res.status(404).send({
            success: 'false',
            message: 'personal not found',
        });
    }
}