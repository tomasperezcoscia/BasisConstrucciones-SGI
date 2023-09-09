import clienteModel from '../models/clienteModel';

class clienteController {
     constructor() {
         this.clientes = [];
     }
 
      //get all clientes
     getAllclientes(req, res) {
         return res.status(200).send({
             success: 'true',
             message: 'clientes retrieved successfully',
             clientes: this.clientes,
         });
     }
 
      //get a single cliente by id
     getclienteById(req, res) {
         const id = parseInt(req.params.id, 10);
         this.clientes.map((cliente) => {
             if (cliente.id === id) {
                 return res.status(200).send({
                     success: 'true',
                     message: 'cliente retrieved successfully',
                     cliente,
                 });
             }
         });
         return res.status(404).send({
             success: 'false',
             message: 'cliente does not exist',
         });
     }
 
      //create a new cliente
     createcliente(req, res) {
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
         const cliente = new clienteModel(req.body.id, req.body.legajo, req.body.nombre, req.body.tipo);
         this.clientes.push(cliente);
         return res.status(201).send({
             success: 'true',
             message: 'cliente added successfully',
             cliente,
         });
     }
 
      //update a cliente
     updatecliente(req, res) {
         const id = parseInt(req.params.id, 10);
         let clienteFound;
         let itemIndex;
         this.clientes.map((cliente, index) => {
             if (cliente.id === id) {
                 clienteFound = cliente;
                 itemIndex = index;
             }
         });
 
         if (!clienteFound) {
             return res.status(404).send({
                 success: 'false',
                 message: 'cliente not found',
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
 
         const newcliente = {
             id: clienteFound.id,
             nombre: req.body.nombre || clienteFound.nombre,
             legajo: req.body.legajo || clienteFound.legajo,
         };
 
         this.clientes.splice(itemIndex, 1, newcliente);
 
         return res.status(201).send({
             success: 'true',
             message: 'cliente added successfully',
             newcliente,
         });
        }

        //delete a cliente
        deletecliente(req, res) {
            const id = parseInt(req.params.id, 10);
            this.clientes.map((cliente, index) => {
                if (cliente.id === id) {
                    this.clientes.splice(index, 1);
                    return res.status(200).send({
                        success: 'true',
                        message: 'cliente deleted successfuly',
                    });
                }
            });
            return res.status(404).send({
                success: 'false',
                message: 'cliente not found',
            });
        }
    }