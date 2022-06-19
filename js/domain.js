"use strict"
//Aplication
import { setElements } from "./aplication.js"
//Model
import Model from "./model.js"

/** Contiene los metodos para la persistencia de datos */
const model = new Model('Transactions')
/**
 * Almacena las transacciones realizadas por el usuario
 * @type {Array}
 */
let userTransactions = []

document.addEventListener('DOMContentLoaded', () => {
    if (model.get()) {
        /** Contiene los datos almacenados en el modelo */
        const persistence = model.get()
        setElements(persistence)
        persistence.userTransaction.forEach(transaction => {
            userTransactions.push(transaction)
        });
        // console.log(persistence.userTransaction, userTransactions)
    }
})
/**
 * Actualiza las transacciones realizadas, hece lo mismo que addTransaction() pero sin añadir datos
 */
const updateTransactions = (transactions) => {
    const numbers = separateNumber(transactions)
    const update = {
        userTransaction: transactions,
        balance: numbers.balance,
        income: numbers.income,
        expense: numbers.expense
    }

    setElements(update)
    model.edit(update)
}
/**
 * Elimina el elemento del userTransacrion[]
 * @param {Object} e Es el evento del elemento a eliminar
 */
export const removeTransaction = (e) => {
    const valueElement = e.path[1].children[0].innerText
    let descriptionElement = e.path[1].innerText //`${e.path[1].innerText}`

    descriptionElement = descriptionElement.replace('x', '')
    descriptionElement = descriptionElement.replace(valueElement, '')
    descriptionElement = descriptionElement.replace(/(\r\n|\n|\r)/gm, '')
    // console.log(descriptionElement, " -> ", valueElement)
    let newUserTransactions = []
    userTransactions.forEach(transaction => {
        if (transaction.description === descriptionElement.trim() && transaction.value === Number(valueElement)) {
            // userTransactions=  userTransactions.splice(userTransactions.indexOf(transaction), 1)
            console.log(transaction.description, ' = ', descriptionElement)
        } else {
            newUserTransactions.push(transaction)
        }
    })
    userTransactions = newUserTransactions
    console.log(userTransactions)
    updateTransactions(userTransactions)
}
/**
 * Define al valor com un numero y su respectiva clase
 * @param {String} value Dato a convertir en numero
 * @returns {{value: Number, className: String}} 
 */
const defineNumber = (value) => {
    let className = ''
    Math.sign(Number(value)) === -1 ? className = 'minus' : className = 'plus'

    return { value: Number(value), className }
}
/**
 * Obtiene los datos ingresados por el usuario
 * @returns {{description: String, value: String}}
 */
const GetDates = () => {
    const descriptionInput = document.getElementById('description')
    const valueInput = document.getElementById('value')

    if (!!descriptionInput.value || !!valueInput.value) {
        const description = descriptionInput.value
        const numberValue = defineNumber(valueInput.value)

        descriptionInput.value = ''
        valueInput.value = ''
        
        return { description, ...numberValue }
    }
    return false
}
/**
 * Annade una nueva transaccion al userTransaction
 */
export const addTransaction = () => {
    /** Son los datos ingresados por el usuario */
    const userTransactionDates = GetDates()
    if (userTransactionDates) {
        userTransactions.push(userTransactionDates)
        const numbers = separateNumber(userTransactions)
        const newTransaction = {
            userTransaction: userTransactions,
            balance: numbers.balance,
            income: numbers.income,
            expense: numbers.expense
        }

        setElements(newTransaction)
        model.add(newTransaction) //Persistence
    }
}

/**
 * 
 * @param {Array} numbers Contiene objetos con el valor a procesar  
 * @returns {{balance: Number, income: Number, expense: Number}} Contiene El balance total, el income y el expense
 */
const separateNumber = (numbers) => {
    const negativeNumbers = numbers.filter(number => Math.sign(number.value) === -1)
    const positiveNumbers = numbers.filter(number => Math.sign(number.value) === 1)
    // console.log(numbers)
    let income = 0, expense = 0
    positiveNumbers.forEach(number => income += number.value)
    negativeNumbers.forEach(number => expense += number.value)

    const balance = income + expense
    // console.log(income, expense,' = ' ,balance)

    return { balance, income, expense }
}

//Model
export const deleteAll = () => {
    userTransactions.length = 0
    setElements({
        userTransaction: userTransactions,
        balance: 0, income: 0, expense: 0
    })
    model.deleteAll()
}