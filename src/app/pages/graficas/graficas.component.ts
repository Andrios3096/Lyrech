import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  inversiones=[];
  meses = []
  mes = []
  fecha = []
  
  montos =[]

  repetidos =[]

  chart =[]

  public lineChartData:Array<any>
 

  constructor(public _AuthService:AuthService) {


}

ngOnInit() {

  ////para obtener las inversiones
    this._AuthService.obtenerInversiones().subscribe(data =>{



        this.inversiones = data;
        console.log(this.inversiones)

        this.arregloMeses()
        this.nombreMes()
        this.contarMeses()

  ///////////////////////graficas 1//////////////////////
   this.chart = new Chart('canvas',{
    type: 'pie',
    data:{
      labels: this.fecha,
      datasets:[
        {
          data: this.repetidos,

          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }],
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  }
   })
  ///////////////////////



///////
  });

}

  
        // arreglo de meses
arregloMeses(){

  this.fecha = []
  this.meses = []
  this.repetidos = []
  
  for (const inversion of this.inversiones) {
    let segundos = inversion.fecha.seconds;
    // console.log("segundos",segundos);
  
    // para las fechas tengo que ponerlo en milisegundos
    let d = new Date(segundos*1000);
    // let dia = d.getDate();
    let mes = d.getMonth()+1;
    // let ano = d.getFullYear();
    this.meses.push(mes)
   
    }
    console.log("meses",this.meses);
  }
    /////////////////////////////////////
  
    //////////////eliminar duplicados y convertir de numero a letra los meses////////////
  nombreMes(){
    this.mes = Array.from(new Set(this.meses))
  
    for (const iterator of this.mes) {
      switch (iterator) {
        case 11:
          this.fecha.push('Noviembre')
          break;
        case 12:
          this.fecha.push('Diciembre')
          break;
  
        default:
          break;
  }
  
    }
    console.log("a caray xd",this.mes);
  }
  
    // arreglo de montos
    arregloMonto(){
    for (const inversion of this.inversiones) {
  
      let mon = inversion.monto
      // console.log("montos",mon)
  
      this.montos.push(mon)
    }
    console.log("montos",this.montos);
    }
    /////////////////////////
  
  
    ///////////////creando el arreglo de las veces que se repite en los mese sla inverison
  contarMeses(){
    let veces = 0
  
    for (let i = 0; i < this.mes.length; i++) {
  
      for (let j = 0; j < this.meses.length; j++) {
        if (this.mes[i] == this.meses[j]) {
          veces++
        }
      }
        this.repetidos.push(veces)
        veces = 0;
    }
  
    console.log("lolol",this.repetidos);
  }


}
