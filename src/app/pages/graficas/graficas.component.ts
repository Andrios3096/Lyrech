import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { literalArr } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  inversiones=[];
  meses = []
  mes = []
  // mesis = ['enero','febrero','marzo','abril','mayo','junio','agosto','setiembre','noviembre','diciembre']
  fecha = []
  
  montos =[]
  repetidos =[]
 

  constructor(public _AuthService:AuthService) {
    

}

ngOnInit() {

  ////para obtener las inversiones
    let a =  this._AuthService.obtenerInversiones().subscribe(data =>{
        this.inversiones = data;
        console.log(this.inversiones)


        // arreglo de meses
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
  /////////////////////////////////////

  //////////////eliminar duplicados y convertir de numero a letra los meses////////////

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
  ////////////////////////////////////


  console.log("a caray xd",this.mes);


  // arreglo de montos
  for (const inversion of this.inversiones) {

    let mon = inversion.monto
    // console.log("montos",mon)

    this.montos.push(mon)
  }
  console.log("montos",this.montos);

  /////////////////////////


  ///////////////creando el arreglo de las veces que se repite en los mese sla inverison

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
  
  a.unsubscribe();

  });

}

  ///// grafica //////
  public lineChartData:Array<any> = [
    {data: this.repetidos, label: 'Inversiones 2018'},

  ];

  public lineChartLabels = this.fecha;


  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


}
