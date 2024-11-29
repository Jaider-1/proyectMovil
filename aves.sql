-- Crear base de datos principal para almacenar el catálogo de aves
CREATE DATABASE CatalogoAves;

-- Seleccionar la base de datos recién creada para trabajar
USE CatalogoAves;

-- Tabla: Especie
-- Esta tabla almacena información sobre diferentes especies, clasificadas por nombres científicos y comunes.
CREATE TABLE Especie (
    ID_Especie INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria única para identificar cada especie
    Nom_Cientifico VARCHAR(255) NOT NULL,      -- Nombre científico único de la especie
    Nom_Comun VARCHAR(255) NOT NULL,           -- Nombre común utilizado para referirse a la especie
    Descripcion TEXT                           -- Información descriptiva sobre la especie
);

-- Tabla: Raza
-- Relacionada con Especie, esta tabla almacena subclasificaciones de las especies (razas).
CREATE TABLE Raza (
    ID_Raza INT AUTO_INCREMENT PRIMARY KEY,    -- Llave primaria única para cada raza
    Nombre VARCHAR(255) NOT NULL,              -- Nombre de la raza
    Origen VARCHAR(255),                       -- Lugar de origen de la raza
    Carac_Fisicas TEXT,                        -- Descripción de características físicas
    ID_Especie INT,                            -- Llave foránea para vincular con una especie
    FOREIGN KEY (ID_Especie) REFERENCES Especie(ID_Especie) -- Relación con la tabla Especie
);

-- Tabla: Continente
-- Define información sobre los continentes.
CREATE TABLE Continente (
    ID_Continente INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria única para cada continente
    Nombre VARCHAR(255) NOT NULL,                 -- Nombre del continente
    Ubicacion TEXT,                               -- Descripción general de la ubicación
    Caracteristicas TEXT                          -- Características distintivas del continente
);

-- Tabla: País
-- Relacionada con Continente, almacena información sobre los países.
CREATE TABLE Pais (
    ID_Pais INT AUTO_INCREMENT PRIMARY KEY,       -- Llave primaria única para cada país
    Nombre VARCHAR(255) NOT NULL,                 -- Nombre del país
    Capital VARCHAR(255),                         -- Nombre de la capital del país
    Ubicacion TEXT,                               -- Descripción de la ubicación
    Caracteristicas TEXT,                         -- Detalles adicionales sobre el país
    ID_Continente INT,                            -- Llave foránea para vincular con un continente
    FOREIGN KEY (ID_Continente) REFERENCES Continente(ID_Continente) -- Relación con Continente
);

-- Tabla: Departamento
-- Define divisiones administrativas dentro de los países.
CREATE TABLE Departamento (
    ID_Departamento INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria única para cada departamento
    Nombre VARCHAR(255) NOT NULL,                   -- Nombre del departamento
    Ubicacion TEXT,                                 -- Ubicación geográfica
    Caracteristicas TEXT,                           -- Detalles adicionales
    ID_Pais INT,                                    -- Llave foránea para vincular con un país
    FOREIGN KEY (ID_Pais) REFERENCES Pais(ID_Pais)  -- Relación con País
);

-- Tabla: Municipio
-- Almacena información sobre los municipios, relacionados con departamentos.
CREATE TABLE Municipio (
    ID_Municipio INT AUTO_INCREMENT PRIMARY KEY,    -- Llave primaria única para cada municipio
    Nombre VARCHAR(255) NOT NULL,                   -- Nombre del municipio
    Ubicacion TEXT,                                 -- Ubicación geográfica
    Caracteristicas TEXT,                           -- Características del municipio
    ID_Departamento INT,                            -- Llave foránea para vincular con un departamento
    FOREIGN KEY (ID_Departamento) REFERENCES Departamento(ID_Departamento) -- Relación con Departamento
);

-- Tabla: LugarHabitado
-- Define hábitats específicos donde se pueden encontrar aves, relacionados con municipios.
CREATE TABLE LugarHabitado (
    ID_LugarHabitado INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria única para cada lugar habitado
    Tipo_Habitat VARCHAR(255) NOT NULL,              -- Tipo de hábitat (e.g., bosque, desierto)
    Clima VARCHAR(255),                              -- Descripción del clima
    Vegetacion TEXT,                                 -- Tipos de vegetación predominantes
    ID_Municipio INT,                                -- Llave foránea para vincular con un municipio
    FOREIGN KEY (ID_Municipio) REFERENCES Municipio(ID_Municipio) -- Relación con Municipio
);

-- Tabla: Ave
-- Tabla principal que almacena información de aves específicas, vinculándolas con sus hábitats y razas.
CREATE TABLE Ave (
    ID_Ave INT AUTO_INCREMENT PRIMARY KEY,          -- Llave primaria única para identificar cada ave
    Nom_Cientifico VARCHAR(255) NOT NULL,           -- Nombre científico de la ave
    Nom_Comun VARCHAR(255) NOT NULL,    
    Descripcion VARCHAR(255) NOT NULL,            -- Nombre común de la ave
    ID_Raza INT,                                    -- Llave foránea para vincular con una raza
    ID_LugarHabitado INT,                           -- Llave foránea para vincular con un lugar habitado
    FOREIGN KEY (ID_Raza) REFERENCES Raza(ID_Raza), -- Relación con la tabla Raza
    FOREIGN KEY (ID_LugarHabitado) REFERENCES LugarHabitado(ID_LugarHabitado) -- Relación con LugarHabitado
);

