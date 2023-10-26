class OrdenesDeCompraModel {
    constructor(id, numeroOrdenInterna, clienteId, numeroOrden, descripcionTarea, cuitCuil, fechaDeIngreso, caracter, polizaArt, vencimientoPolizaArt, polizaDeAccPer, vencimientoPolizaDeAccPer) {
        this.id = id;
        this.numeroOrdenInterna = numeroOrdenInterna;
        this.clienteId = clienteId;
        this.numeroOrden = numeroOrden;
        this.descripcionTarea = descripcionTarea;
        this.cuitCuil = cuitCuil;
        this.fechaDeIngreso = fechaDeIngreso;
        this.caracter = caracter;
        this.polizaArt = polizaArt;
        this.vencimientoPolizaArt = vencimientoPolizaArt;
        this.polizaDeAccPer = polizaDeAccPer;
        this.vencimientoPolizaDeAccPer = vencimientoPolizaDeAccPer;
    }
}
export default OrdenesDeCompraModel;