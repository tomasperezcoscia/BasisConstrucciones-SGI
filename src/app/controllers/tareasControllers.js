//create tareasController, based on TareasModel

class TareasController {
    constructor() {
        this.tareas = [];
    }

    // get all tareas
    getAllTareas(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'tareas retrieved successfully',
            tareas: this.tareas,
        });
    }

    // get a single tareas by id
    getTareasById(req, res) {
        const id = parseInt(req.params.id, 10);
        this.tareas.map((tareas) => {
            if (tareas.id === id) {
                return res.status(200).send({
                    success: 'true',
                    message: 'tareas retrieved successfully',
                    tareas,
                });
            }
        });
        return res.status(404).send({
            success: 'false',
            message: 'tareas does not exist',
        });
    }

    // create a new tareas
    createTareas(req, res) {
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
        const tareas = new TareasModel(req.body.id, req.body.legajo, req.body.nombre, req.body.tipo);
        this.tareas.push(tareas);
        return res.status(201).send({
            success: 'true',
            message: 'tareas added successfully',
            tareas,
        });
    }

    // update a tareas
    updateTareas(req, res) {
        const id = parseInt(req.params.id, 10);
        let tareasFound;
        let itemIndex;
        this.tareas.map((tareas, index) => {
            if (tareas.id === id) {
                tareasFound = tareas;
                itemIndex = index;
            }
        });

        if (!tareasFound) {
            return res.status(404).send({
                success: 'false',
                message: 'tareas not found',
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

        const newTareas = {
            id: tareasFound.id,
            nombre: req.body.nombre || tareasFound.nombre,
            legajo: req.body.legajo || tareasFound.legajo,
        };

        this.tareas.splice(itemIndex, 1, newTareas);

        return res.status(201).send({
            success: 'true',
            message: 'tareas added successfully',
            newTareas,
        });
    }

    // delete a tareas
    deleteTareas(req, res) {
        const id = parseInt(req.params.id, 10);
        this.tareas.map((tareas, index) => {
            if (tareas.id === id) {
                this.tareas.splice(index, 1);
                return res.status(200).send({
                    success: 'true',
                    message: 'tareas deleted successfuly',
                });
            }
        });

        return res.status(404).send({
            success: 'false',
            message: 'tareas not found',
        });
    }
}