-- Crear base de datos
CREATE DATABASE CatalogoAves;

-- Usar la base de datos
USE CatalogoAves;

-- Tabla: Especie
CREATE TABLE Especie (
    ID_Especie INT AUTO_INCREMENT PRIMARY KEY,
    Nom_Cientifico VARCHAR(255) NOT NULL,
    Nom_Comun VARCHAR(255) NOT NULL,
    Descripcion TEXT
);

-- Tabla: Raza
CREATE TABLE Raza (
    ID_Raza INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Origen VARCHAR(255),
    Carac_Fisicas TEXT,
    ID_Especie INT,
    FOREIGN KEY (ID_Especie) REFERENCES Especie(ID_Especie)
);

-- Tabla: LugarHabitado
CREATE TABLE LugarHabitado (
    ID_LugarHabitat INT AUTO_INCREMENT PRIMARY KEY,
    Tipo_Habitat VARCHAR(255) NOT NULL,
    Clima VARCHAR(255),
    Vegetacion TEXT
);

-- Tabla: Continente
CREATE TABLE Continente (
    ID_Continente INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Ubicacion TEXT,
    Caracteristicas TEXT
);

-- Tabla: Pais
CREATE TABLE Pais (
    ID_Pais INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Capital VARCHAR(255),
    Ubicacion TEXT,
    Caracteristicas TEXT,
    ID_Continente INT,
    FOREIGN KEY (ID_Continente) REFERENCES Continente(ID_Continente)
);

-- Tabla: Departamento
CREATE TABLE Departamento (
    ID_Departamento INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Ubicacion TEXT,
    Caracteristicas TEXT,
    ID_Pais INT,
    FOREIGN KEY (ID_Pais) REFERENCES Pais(ID_Pais)
);

-- Tabla: Municipio
CREATE TABLE Municipio (
    ID_Municipio INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Ubicacion TEXT,
    Caracteristicas TEXT,
    ID_Departamento INT,
    FOREIGN KEY (ID_Departamento) REFERENCES Departamento(ID_Departamento)
);

-- Tabla: Ave (Principal)
CREATE TABLE Ave (
    ID_Ave INT AUTO_INCREMENT PRIMARY KEY,
    Nom_Cientifico VARCHAR(255) NOT NULL,
    Nom_Comun VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    ID_Especie INT,
    ID_Raza INT,
    ID_LugarHabitat INT,
    ID_Municipio INT,
    ID_Pais INT,
    ID_Continente INT,
    FOREIGN KEY (ID_Especie) REFERENCES Especie(ID_Especie),
    FOREIGN KEY (ID_Raza) REFERENCES Raza(ID_Raza),
    FOREIGN KEY (ID_LugarHabitat) REFERENCES LugarHabitado(ID_LugarHabitat),
    FOREIGN KEY (ID_Municipio) REFERENCES Municipio(ID_Municipio),
    FOREIGN KEY (ID_Pais) REFERENCES Pais(ID_Pais),
    FOREIGN KEY (ID_Continente) REFERENCES Continente(ID_Continente)
);