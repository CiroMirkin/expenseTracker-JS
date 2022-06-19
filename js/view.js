"use strict"

const list = document.getElementById('list-history')
/**
 * Muestra el balance, el income y el expense dentro de la interfaz
 * @param {Number} balance 
 * @param {Number} income 
 * @param {Number} expense 
 */
export const viewBalance = (balance, income, expense) => {
    const balanceHTML = document.getElementById('balance').innerText = `$ ${balance}`
    const incomeHTML = document.getElementById('income').innerText = `$ ${income}`
    const expenseHTML = document.getElementById('expense').innerText = `$ ${expense}`
}
/**
 * Muestra dentro de la interfaz todas las transacciones realizadas por el usuario
 * @param {Array} userTransaction Contiene todas las transacciones realizadas por el usuario
 */
export const viewListElements = (userTransaction) => {
    const fragment = document.createDocumentFragment()

    if(userTransaction.length !== 0){
        userTransaction.forEach(transaction => {
            const item = document.createElement('LI')
            item.classList.add(transaction.className) //minus - plus
            item.innerHTML = `
              ${transaction.description} <span>${transaction.value}</span><button class="delete-btn" id="delete-btn">x</button>
            `
            fragment.appendChild(item)
        });
        list.innerHTML = ''
        list.appendChild(fragment)
    } else list.innerHTML = ''
}

export const interfaceMode = (mode) =>{
    // document.html.setAttribute
    document.querySelector('html').setAttribute('data-theme', mode)
}