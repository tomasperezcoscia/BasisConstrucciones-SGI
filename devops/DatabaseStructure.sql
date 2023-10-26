CREATE DATABASE ConstructionDB;
USE ConstructionDB;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


-- Personal table
CREATE TABLE Personal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    legajo INT UNIQUE,
    nombre VARCHAR(100),
    salario_hora INT(8),
    estado CHAR(1),
    fechaDeAlta DATE,
    fechaDeBaja DATE NULL
);

-- Cliente table
CREATE TABLE Cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    legajo INT UNIQUE,
    nombre VARCHAR(100),
    tipo VARCHAR(50)
);

-- OrdenesDeCompra table
CREATE TABLE OrdenesDeCompra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numeroOrdenInterna INT UNIQUE,
    cliente_id INT,
    numeroOrden INT,
    descripcionTarea VARCHAR(255) NULL,
    cuit_cuil VARCHAR(13),
    fechaDeIngreso DATE,
    caracter CHAR,
    polizaArt INT,
    vencimientoPolizaArt DATE,
    polizaDeAccPer INT,
    vencimientoPolizaDeAccPer DATE,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id)
);

-- Tareas table
CREATE TABLE Tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE,
    tipo VARCHAR(255) UNIQUE
);

-- HorasPersonal table
CREATE TABLE HorasPersonal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fechaDeCarga DATE,
    cliente_id INT,
    personal_id INT,
    orden_de_compra_id INT,
    tarea_id INT,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id),
    FOREIGN KEY (personal_id) REFERENCES Personal(id),
    FOREIGN KEY (orden_de_compra_id) REFERENCES OrdenesDeCompra(id),
    FOREIGN KEY (tarea_id) REFERENCES Tareas(id)
);

-- Proovedores table
CREATE TABLE Proovedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    legajo INT UNIQUE,
    nombre VARCHAR(100) UNIQUE,
    numeroDeTelefono INT,
    cuil VARCHAR(13),
    tipo VARCHAR(50),
    fechaAlta DATE,
    fechaBaja DATE NULL
);

-- AusenciasPersonal table
CREATE TABLE AusenciasPersonal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255) UNIQUE,
    descripcion VARCHAR(255) NULL,
    fechaDeInicio TIMESTAMP,
    fechaDeFin TIMESTAMP,
    personal_id INT,
    FOREIGN KEY (personal_id) REFERENCES Personal(id)
);

-- Gastos table
CREATE TABLE Gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    tipo VARCHAR(255),
    porcentajeIva FLOAT(8, 2)
);

-- Insumos table
CREATE TABLE Insumos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    tipo VARCHAR(50),
    precio DOUBLE(8, 2),
    inventario INT,
    ultimaFechaPrecio DATE
);

-- TipoDeObra table
CREATE TABLE TipoDeObra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    tipo VARCHAR(255),
    descripcion VARCHAR(255) NULL
);

-- InsumosParaObra table
CREATE TABLE InsumosParaObra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_insumo INT,
    cantidad INT,
    FOREIGN KEY (id_insumo) REFERENCES Insumos(id)
);

-- Obra table
CREATE TABLE Obra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    legajo INT,
    id_cliente INT,
    id_insumosParaObra INT,
    id_horasDePersonal INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id),
    FOREIGN KEY (id_insumosParaObra) REFERENCES InsumosParaObra(id),
    FOREIGN KEY (id_horasDePersonal) REFERENCES HorasPersonal(id)
);

-- PresupuestoDeObra table
CREATE TABLE PresupuestoDeObra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_obra INT,
    nombre VARCHAR(255),
    legajo INT,
    id_cliente INT,
    id_insumosParaObra INT,
    id_horasDePersonal INT,
    FOREIGN KEY (id_obra) REFERENCES Obra(id),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id),
    FOREIGN KEY (id_insumosParaObra) REFERENCES InsumosParaObra(id),
    FOREIGN KEY (id_horasDePersonal) REFERENCES HorasPersonal(id)
);
