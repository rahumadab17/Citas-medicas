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

const pacientesRegistrados = [];

app.get("/pacientes", async (req, res) => {
    const { data } = await axios.get("https://randomuser.me/api/");
    const { name: { first, last }, gender } = data.results[0];
    const uuidPorcion = uuidv4().slice(0, 6);
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

    pacientesRegistrados.push({ first, last, uuidPorcion, timestamp, gender })

    const pacientesPorGenero = _.partition(pacientesRegistrados, ({ gender }) => gender == "female")

    let respuesta = `
    <h4> Mujeres: </h4>
        <ol>
            ${pacientesPorGenero[0].map(u => `<li>Nombre: ${u.first} - Apellido: ${u.last} - ID: ${u.uuidPorcion} - Timestamp: ${u.timestamp} </li>`).join('')}
        </ol>
    <h4> Hombre: </h4>
        <ol>
            ${pacientesPorGenero[1].map(u => `<li>Nombre: ${u.first} - Apellido: ${u.last} - ID: ${u.uuidPorcion} - Timestamp: ${u.timestamp} </li>`).join('')}
        </ol>
    `

    let respuestaConsola =`
Mujeres:
${pacientesPorGenero[0].map(u => `Nombre: ${u.first} - Apellido: ${u.last} - ID: ${u.uuidPorcion} - Timestamp: ${u.timestamp}\n`)}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
Hombre:
${pacientesPorGenero[1].map(u => `Nombre: ${u.first} - Apellido: ${u.last} - ID: ${u.uuidPorcion} - Timestamp: ${u.timestamp}\n`)}
`

    res.send(respuesta)
    console.log(chalk.blue.bgWhite.bold(respuestaConsola))          
});