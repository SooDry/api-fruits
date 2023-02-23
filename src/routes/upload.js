const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const db = require("../database");
const Usuario = db.user;
const fs = require('fs');
const path = require('path');
app.use(fileUpload());

app.put('/upload/:guid', function (req, res) {
    let guid = req.params.guid;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'no se ha seleccionado ningun archivo'
            }
        });
    }



    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    //EXTENCIONES PERMITIDAS
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son' + extensionesValidas.join(', '),
                ext: extension
            }
        });
    }

    // Cambiar nombre al archivo


    let nombreArchivo = `${guid}-${new Date().getMilliseconds()}.${extension}`
    const uploadPath = path.join(__dirname, "../uploads/", nombreArchivo)

    archivo.mv(uploadPath, (err) => {
        if (err) {

            console.log(err);
            return res.status(500).json({
                ok: false,
                err
            });
        }
        //Carga imagen

        imagenUsuario(guid, res, nombreArchivo);


    });

});


async function imagenUsuario(guid, res, nombreArchivo) {

    const user = await Usuario.findOne({
        where: {
            guid
        },
    });

    if (!user) {

        borrarArchivo(nombreArchivo, 'usuario');

        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario No existe'
            }
        });

    }

    const saveimg = await Usuario.update({
        img: nombreArchivo,
    }, {
        where: {
            guid
        },
    });
    if (!saveimg) {

        borrarArchivo(nombreArchivo, 'usuario');
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Imagen no pudo ser actualizada'
            }
        });
    }

    res.json({
        ok: true,
        usuario: saveimg,
        img: nombreArchivo
    });

}

function borrarArchivo(nombreImagen) {
    let pathUrl = path.resolve(__dirname, `../../uploads/${nombreImagen}`);

    if (fs.existsSync(pathUrl)) {

        fs.unlinkSync(pathUrl);
    }

}
module.exports = app;

