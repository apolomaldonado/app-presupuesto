class Ingreso extends Dato{
    static contadorIngresos = 0
    constructor(descripcion,valor){
        super(descripcion,valor) // recibo los parametros de Dato
        this._id = ++Ingreso.contadorIngresos //preincremento cada ingreso y la guardo en id

    }
    get id (){
        return this._id
    }
    

}