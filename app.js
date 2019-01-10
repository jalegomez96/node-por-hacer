const { argv } = require('./config/yargs');
const { crear } = require('./por-hacer/por-hacer');
const { getListado } = require('./por-hacer/por-hacer');
const { actualizar } = require('./por-hacer/por-hacer');
const { borrar } = require('./por-hacer/por-hacer');
const { filtar } = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        break;
    case 'listar':
        let listado;
        if (argv.completado !== undefined) {
            listado = filtar(JSON.parse(argv.completado));
        } else {
            listado = getListado();
        }

        for (let tarea of listado) {
            console.log('===============Por hacer==============='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('======================================='.green);
        }
        break;
    case 'actualizar':
        console.log(argv.completado);
        let actualizado = actualizar(argv.descripcion, JSON.parse(argv.completado));
        if (actualizado == true) {
            console.log('La tarea ha sido actualizada');
        } else {
            console.log(`La tarea "${argv.descripcion}" no fue encontrada`);
        }
        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion);
        if (borrado == true) {
            console.log('La tarea ha sido borrada');
        } else {
            console.log(`La tarea "${argv.descripcion}" no fue encontrada`);
        }
        break;
    default:
        console.log('Comando no reconocido');
}