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

app.get("/pacientes", (req, res) => {

});

axios.get("https://randomuser.me/api/?results=30")
    .then((data) => {
        const paciente = data.data.results
        const datosPaciente = paciente.map(paciente => ({
            nombre: paciente.name.first,
            apellido: paciente.name.last
        }));
        console.log(datosPaciente);
    })
    .catch((e) => {
        console.log(e);
    });