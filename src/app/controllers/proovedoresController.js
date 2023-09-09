/* create proovedoresController, similar to personalController and clienteController, but based on peroovedoresModel*/
// create a proovedores controller, based on ProovedoresModel

class ProovedoresController {
    constructor() {
        this.proovedores = [];
    }

    // get all proovedores
    getAllProovedores(req, res) {
        return res.status(200).send({
            success: 'true',
            message: 'proovedores retrieved successfully',
            proovedores: this.proovedores,
        });
    }

    // get a single proovedores by id
    getProovedoresById(req, res) {
        const id = parseInt(req.params.id, 10);
        this.proovedores.map((proovedores) => {
            if (proovedores.id === id) {
                return res.status(200).send({
                    success: 'true',
                    message: 'proovedores retrieved successfully',
                    proovedores,
                });
            }
        });
        return res.status(404).send({
            success: 'false',
            message: 'proovedores does not exist',
        });
    }

    // create a new proovedores
    createProovedores(req, res) {
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
        const proovedores = new ProovedoresModel(req.body.id, req.body.legajo, req.body.nombre, req.body.tipo);
        this.proovedores.push(proovedores);
        return res.status(201).send({
            success: 'true',
            message: 'proovedores added successfully',
            proovedores,
        });
    }

    // update a proovedores
    updateProovedores(req, res) {
        const id = parseInt(req.params.id, 10);
        let proovedoresFound;
        let itemIndex;
        this.proovedores.map((proovedores, index) => {
            if (proovedores.id === id) {
                proovedoresFound = proovedores;
                itemIndex = index;
            }
        });

        if (!proovedoresFound) {
            return res.status(404).send({
                success: 'false',
                message: 'proovedores not found',
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

        const newProovedores = {
            id: proovedoresFound.id,
            nombre: req.body.nombre || proovedoresFound.nombre,
            legajo: req.body.legajo || proovedoresFound.legajo,
            tipo: req.body.tipo || proovedoresFound.tipo,
        };

        this.proovedores.splice(itemIndex, 1, newProovedores);

        return res.status(201).send({
            success: 'true',
            message: 'proovedores added successfully',
            newProovedores,
        });
    }

    // delete a proovedores
    deleteProovedores(req, res) {
        const id = parseInt(req.params.id, 10);
        let proovedoresFound;
        let itemIndex;
        this.proovedores.map((proovedores, index) => {
            if (proovedores.id === id) {
                proovedoresFound = proovedores;
                itemIndex = index;
            }
        });

        if (!proovedoresFound) {
            return res.status(404).send({
                success: 'false',
                message: 'proovedores not found',
            });
        }
        this.proovedores.splice(itemIndex, 1);

        return res.status(200).send({
            success: 'true',
            message: 'proovedores deleted successfuly',
        });
    }
}