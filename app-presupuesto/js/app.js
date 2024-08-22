

//arreglos q manejan los ingresos y egresos

const ingresos  = [
    new Ingreso ("salario",2300),
    new Ingreso("venta de camisas", 1500),
   
    
]

const egresos = [
    new Egreso ("Renta de casa",600),
    new Egreso ("verduleria",20)
]

let cargarApp = ()=>{ // va a el evento onload en el body
    cargarCabecero()
    cargarIngresos()
    cargarEgreso()
}

let totalIngresos = () =>{ // calcula el total de los ingresos en el array ingresos
    let totalIng = 0
    for(let ing of ingresos){
        totalIng += ing.valor
    }
    return totalIng
}
let totalEgresos = ()=>{ // calcula el total de los ingresos en el array egresos
    let totalEg = 0
    for (let eg of egresos){
        totalEg += eg.valor
    }
    return totalEg

}
let cargarCabecero = ()=>{   //actualiza los elemntos html del cabecero
    let presupuesto = totalIngresos() - totalEgresos()
    let porcentajeEgreso = totalEgresos()/totalIngresos()
    //recuperar los elementos y actualizar
    document.getElementById("presupuesto").innerHTML= formatoMoneda(presupuesto)
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso)
    document.getElementById("ingresos").innerHTML= formatoMoneda(totalIngresos())
    document.getElementById("egresos").innerHTML= formatoMoneda(totalEgresos())

}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString("en-US",{style:"currency",currency:"USD"})
}
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString("en-US",{style:"percent" ,minimunFractionDigits:2})
}

const cargarIngresos = () =>{
    let ingresosHTML= ""
    for (ingreso of ingresos){
        ingresosHTML+=crearIngresoHTML(ingreso) //por cada ingreso q se itera crea el html de la funcion crarIngresoHTML
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML // lo que hago es enlazar el html con el id lista-ingresos
}
const crearIngresoHTML= (ingreso)=>{ // por cada ingreso q se itera se crea todo este codigo html
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name ="close-circle-outline"
                                onclick ="eliminarIngreso(${ingreso.id})"></ion-icon> <!--onclick es para que se ejecute la funcion eliminarIngreso cuando se hace click en el icono-->
                            </button>
                        </div>
                    </div>
        </div>`
        return ingresoHTML
        
        
}
let eliminarIngreso =(id) =>{//proporciona el id del onclick como parametro 
   let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id=== id)  // por cada objeto del arreglo lo compara con el id del parametro ,//si coicide con el objeto de ingreso q estamos iterando , la funcion devuelve el indice
   ingresos.splice(indiceEliminar,1)//splice recibe el indice a eliminar y lla cantidad q tiene q eliminar
   cargarCabecero()
   cargarIngresos()
}


let cargarEgreso = ()=>{
    let egresosHTML= ""//crea un string vacio
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso) // or cada egreso q se itera crea el html de la funcion crearEgresoHTML
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML // accede al contenido de lista egresos y lo reemplaza por cada egreso q se haga
    
}
let crearEgresoHTML=(egreso)=>{ // crea el html de cada egreso
    let egresoHTML =` <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion"> ${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name ="close-circle-outline"
                                onclick ="eliminarEgreso(${egreso.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>` 
                return egresoHTML
}
let eliminarEgreso = (id)=>{
    let indiceEliminar= egresos.findIndex(egreso => egreso.id=== id)
    egresos.splice(indiceEliminar,1)
    cargarCabecero()
    cargarEgreso()

} 
 let agregarDato = ()=>{
    let forma = document.getElementById("forma") // recupero el formulario
    let tipo = forma ["tipo"] //almaceno el tipo 
    let descripcion = forma ["descripcion"] //almaceno la descripicion
    let valor = forma ["valor" ] //almaceno el valor
    if(descripcion.value !=="" && valor.value!==""){ //si la descripicion y el valor no estan vacios
        if (tipo.value ==="ingreso"){
            ingresos.push(new Ingreso(descripcion.value, +valor.value)) //creo una nueva instancia de la clase Ingreso
            cargarCabecero() // vuelvo a cargar el cabecero para q se vuelva a mostrar el total
            cargarIngresos() // actualizo los ingresos
        }else if (tipo.value ==="egreso"){            
            egresos.push(new Egreso (descripcion.value, +valor.value)) //creo una nueva instancia de la clase Egreso
            cargarCabecero()
            cargarEgreso()
        }
    }
 }