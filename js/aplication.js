//View
import { viewBalance } from "./view.js";
import { viewListElements } from "./view.js";
import { interfaceMode } from "./view.js";
//Domain
import { addTransaction } from "./domain.js";
import { removeTransaction } from "./domain.js";
import { deleteAll } from "./domain.js"; //Model

const elementsList = document.getElementById('list-history')
const sendBtn = document.getElementById('send-transaction')
const configs = document.getElementById('config')

//Eliminar transaccion
elementsList.addEventListener('click', (e) => {
    if (e.target.id === 'delete-btn') removeTransaction(e)
})
//Guardar transaccion
sendBtn.addEventListener('click', () => addTransaction())
//Condifiguraciones
let mode = 'dark'
configs.addEventListener('click', (e) =>{
    if(e.target.defaultValue === 'Vacial almacenamiento') deleteAll()
    else if(e.target.defaultValue === 'Cambiar tema') interfaceMode(mode)
    //Establece el modo de la interfaz
    if(mode == 'dark') mode = 'light'
    else if(mode == 'light') mode = 'dark'
})

export const setElements = ({ userTransaction, balance = 0, income = 0, expense=0 }) => {
    console.log(userTransaction, balance, income, expense)
    viewBalance(balance, income, expense)
    viewListElements(userTransaction)
}