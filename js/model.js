"use strict"

export default class Model{
    /**
     * @param {String} name Es el nombre con el que se guardaran y se realizaran las siguientes opciones
     */
    constructor(name){
        this.nameColection = name
    }
    get(){
        if(JSON.parse(localStorage.getItem(this.nameColection)) === undefined) return false
        return JSON.parse(localStorage.getItem(this.nameColection))
    }
    /**
     * Guarda un objeto dentro del LocalStorage
     * @param {Object} userTransactions Objeto a almacenar
     */
    add(userTransactions){
        console.log(userTransactions)
        localStorage.setItem(this.nameColection, JSON.stringify(userTransactions))
    }
    /**
     * Edita el objeto dentro del LocalStorage remplazandolo por el nuevo
     * @param {Object} userTransactions Nuevo objeto que remplazara al anterior 
     */
    edit(userTransactions){
        localStorage.setItem(this.nameColection, JSON.stringify(userTransactions))
    }
    /** Vacia el LocalStorage */
    deleteAll(){
        localStorage.removeItem(this.nameColection)
    }
}