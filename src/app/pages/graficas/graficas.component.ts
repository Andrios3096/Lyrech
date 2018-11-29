import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Chart } from 'chart.js';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  inversiones = [];
  meses = []
  mes = []
  fecha = []

  montos = []

  repetidos = []

  chartpie = []
  chartbar = []

  

  public lineChartData: Array<any>


  constructor(public _AuthService: AuthService) {


  }

  ngOnInit() {

    this.obtenerInversiones();

  }


  obtenerInversiones() {

    ////para obtener las inversiones
    this._AuthService.obtenerInversiones().subscribe(data => {

      this.fecha = []
      this.meses = []
      this.repetidos = []

      this.inversiones = data;
      console.log(this.inversiones)

      this.arregloMeses();
      this.arregloMonto(); 
      this.nombreMes();
      this.contarMeses();
      this.graficospie();
      this.graficosbar();
      

    });

  }// fin de obtener inversiones


  graficospie() {
    this.chartpie = new Chart('canvas1', {
      type: 'pie',
      data: {
        labels: this.fecha,
        datasets: [
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
        resposive: true,
        title: {
          display: true,
          text: 'Inversiones por Mes'
        },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  } //fin de graficos

  graficosbar(){

    this.chartbar = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.fecha,
        datasets: [
          {
            label: '2018',
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
        resposive: true,
        title: {
          display: true,
          text: 'Dinero Invertido por mes'
        },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

  }


  // arreglo de meses
  arregloMeses() {

    for (const inversion of this.inversiones) {

      let segundos = inversion.fecharegistro.seconds;
      // console.log("segundos",segundos);

      // para las fechas tengo que ponerlo en milisegundos
      let d = new Date(segundos * 1000);
      // let dia = d.getDate();
      let mes = d.getMonth() + 1;
      // let ano = d.getFullYear();
      this.meses.push(mes)

    }
    console.log("meses", this.meses);
  }
  /////////////////////////////////////

  //////////////eliminar duplicados y convertir de numero a letra los meses////////////
  nombreMes() {

    this.mes = Array.from(new Set(this.meses))

    for (const iterator of this.mes) {
      switch (iterator) {
        case 1:
          this.fecha.push('Enero')
          break;
        case 2:
          this.fecha.push('Febrero')
          break;
        case 3:
          this.fecha.push('Marzo')
          break;
        case 4:
          this.fecha.push('Abril')
          break;
        case 5:
          this.fecha.push('Mayo')
          break;
        case 6:
          this.fecha.push('Junio')
          break;
        case 7:
          this.fecha.push('Julio')
          break;
        case 8:
          this.fecha.push('Agosto')
          break;
        case 9:
          this.fecha.push('Septiembre')
          break;
        case 10:
          this.fecha.push('Octubre')
          break;
        case 11:
          this.fecha.push('Noviembre')
          break;
        case 12:
          this.fecha.push('Diciembre')
          break;

        default:
          break;
      } //fin del swith

    } // fin del for

    console.log("a caray xd", this.mes);
  } // fin del nombremes

  // arreglo de montos
  arregloMonto() {
    for (const inversion of this.inversiones) {

      let mon = inversion.monto
      // console.log("montos",mon)

      this.montos.push(mon)
    }
    console.log("montos", this.montos);
  }
  /////////////////////////


  ///////////////creando el arreglo de las veces que se repite en los mese sla inverison
  contarMeses() {
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

    console.log("lolol", this.repetidos);
  }


}
