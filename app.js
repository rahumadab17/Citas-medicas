import express from 'express';
import chalk from 'chalk';
import { v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(chalk.cyanBright.bold.italic(`Servidor inicializado escuchando en el puerto ${port}`));
});

/* app.get("/pacientes", (req, res) => {
    axios.get("https://randomuser.me/api/?results=20")
    .then((data) => {
        const pacientes = data.data.results;

        const pacientesPorGenero = _.groupBy(pacientes, 'gender');

        const pacientesMujeresInfo = pacientesPorGenero['female'].map(paciente => {
            const nombrePaciente = paciente.name.first;
            const apellidoPaciente = paciente.name.last;
            const uuidPorcion = uuidv4().slice(0, 6);
            const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

            return `<li>Nombre: ${nombrePaciente} - Apellido: ${apellidoPaciente} - ID: ${uuidPorcion} - Timestamp: ${timestamp}</li>`;
        });

        const pacientesHombresInfo = pacientesPorGenero['male'].map(paciente => {
            const nombrePaciente = paciente.name.first;
            const apellidoPaciente = paciente.name.last;
            const uuidPorcion = uuidv4().slice(0, 6);
            const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

            return `<li>Nombre: ${nombrePaciente} - Apellido: ${apellidoPaciente} - ID: ${uuidPorcion} - Timestamp: ${timestamp}</li>`;
        });

        const mujeresLista = `<h2>Mujeres</h2><ol>${pacientesMujeresInfo.join('')}</ol>`;
        const hombresLista = `<h2>Hombres</h2><ol>${pacientesHombresInfo.join('')}</ol>`;

        const respuestaCompleta = mujeresLista + hombresLista;
        
        res.send(respuestaCompleta);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send("Ha ocurrido un error.");
    });
}); */

const pacientes = []

app.get("/pacientes", (req, res) => {
    axios.get("https://randomuser.me/api/")
    .then((data) => {
        const pacientes = data.data.results;

        const pacientesInfo = pacientes.map(paciente => {
            const nombrePaciente = paciente.name.first;
            const apellidoPaciente = paciente.name.last;
            const uuidPorcion = uuidv4().slice(0, 6);
            const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

            return `<li>Nombre: ${nombrePaciente} - Apellido: ${apellidoPaciente} - ID: ${uuidPorcion} - Timestamp: ${timestamp}</li>`;
        });

        const respuesta = `<ol>${pacientesInfo.join('')}</ol>`;

        pacientes.push(pacientesInfo)

        res.send(pacientes);
        console.log(pacientes)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send("Ha ocurrido un error.");
    });
});

/* 
const pacientes = []

app.get("/pacientes", (req, res) => {
    axios.get("https://randomuser.me/api") // Solicitar un solo resultado
    .then((data) => {
        const paciente = data.data.results[0]; // Obtener el primer paciente
        const nombrePaciente = paciente.name.first;
        const apellidoPaciente = paciente.name.last;
        const uuidPorcion = uuidv4().slice(0, 6);
        const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

        // Construir objeto con la información del paciente
        const pacienteInfo = {
            nombre: nombrePaciente,
            apellido: apellidoPaciente,
            id: uuidPorcion,
            timestamp: timestamp
        };

        // Agregar paciente a la lista de pacientes
        pacientes.push(pacienteInfo);

        // Enviar lista completa de pacientes como respuesta
        res.send(JSON.stringify(pacientes));
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send("Ha ocurrido un error.");
    });
}); */