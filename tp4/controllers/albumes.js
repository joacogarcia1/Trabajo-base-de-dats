import { conn } from "../db.js";

const getAlbumes = async (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
        const rows = await conn.query(`
        SELECT
        albumes.id,
        albumes.nombre,
        artistas.nombre AS nombre_artistas
        FROM albumes 
        JOIN artistas ON albumes.artistas = artistas.id
    `)

    res.json(rows[0])
};

const getAlbum = async (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */

    const id = req.params.id
    const rows = await conn.query(`
        SELECT
         albumes.id,
        albumes.nombre,
        artistas.nombre AS nombre_artistas
        FROM albumes 
        JOIN artistas ON albumes.artistas = artistas.id
        WHERE albumes.id = ?
    `, [id])

    res.json(rows[0])
};
const createAlbum = async (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

    const {nombre, artista} = req.body
    await conn.query("INSERT INTO albumes (nombre, artista) VALUES (?, ?)", [nombre, artista])
    res.json({nombre, artista})
};

const updateAlbum = async (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

    const {nombre, artista} = req.body
    const id = req.params.id
    await conn.query("UPDATE albumes SET nombre = ?, artista = ? WHERE id = ?", [nombre, artista, id])
    res.json({nombre, artista})
};

const deleteAlbum = async (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const id = req.params.id
    await conn.query("DELETE FROM albumes WHERE id = ?", [id])
    res.json({id})
};

const getCancionesByAlbum = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    const id = req.params.id

    const rows = await conn.query(`
        SELECT
        canciones.id,
        canciones.nombre,
        artistas.nombre AS nombre_artistas,
        albumes.nombre AS nombre_album,
        canciones.duracion,
        canciones.reproducciones
        FROM canciones 
        JOIN albumes ON canciones.album = albumes.id
        JOIN artistas ON albumes.artistas = artistas.id
        WHERE albumes.id = ?
    `, [id])

    res.json(rows[0])
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;