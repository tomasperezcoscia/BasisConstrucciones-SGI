
Personal {
	id integer pk increments
	legajo integer unique
	nombre varchar(100)
	salario_hora integer(8)
	estado char(1)
	fechaDeAlta date
	fechaDeBaja date null
}

OrdenesDeCompra {
	id integer pk increments
	numeroOrdenInterna integer unique
	cliente_id integer *> Cliente.id
	numeroOrden integer
	descripcionTarea varchar null
	cuit_cuil integer(13)
	fechaDeIngreso date
	caracter integer
	polizaArt integer
	vencimientoPolizaArt date
	polizaDeAccPer integer
	vencimientoPolizaDeAccPer date
}

Cliente {
	id integer pk increments
	legajo integer unique
	nombre varchar(100)
	tipo varchar(50)
}

HorasPersonal {
	id integer pk increments
	fechaDeCarga date
	cliente_id integer *> Cliente.id
	personal_id integer *> Personal.id
	orden_de_compra_id integer *>* OrdenesDeCompra.id
	tarea_id integer *> Tareas.id
}

Proovedores {
	id integer pk increments
	legajo integer unique
	nombre varchar(100) unique
	numeroDeTelefono integer
	cuil integer
	tipo varchar(50)
	fechaAlta date
	fechaBaja date null
}

Tareas {
	id integer pk increments
	nombre varchar unique
	tipo varchar unique
}

AusenciasPersonal {
	id integer pk increments
	tipo varchar unique
	descripcion varchar null
	fechaDeInicio timestamp
	fechaDeFin timestamp
	personal_id integer *> Personal.id
}

Gastos {
	id integer pk increments
	nombre varchar
	tipo varchar
	porcentajeIva float4
}

Insumos {
	id integer pk increments
	nombre varchar(100)
	tipo varchar(50)
	precio float8
	inventario integer
	ultimaFechaPrecio integer
}

TipoDeObra {
	id integer pk increments
	nombre varchar
	tipo varchar
	descripcion varchar null
}

Obra {
	id integer pk increments
	nombre varchar
	legajo integer
	id_cliente integer *> Cliente.id
	id_insumosParaObra integer *>* InsumosParaObra.id
	id_horasDePersonal integer *>* HorasPersonal.id
}

PresupuestoDeObra {
	id integer pk increments
	id_obra integer > Obra.id
	nombre varchar
	legajo integer
	id_cliente integer *> Cliente.id
	id_insumosParaObra integer *>* InsumosParaObra.id
	id_horasDePersonal integer *>* HorasPersonal.id
}

InsumosParaObra {
	id integer pk increments
	id_insumo integer > Insumos.id
	cantidad integer
}

