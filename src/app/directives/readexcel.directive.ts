import { Directive, HostListener } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from "xlsx";

@Directive({
  selector: '[appReadexcel]'
})
export class ReadexcelDirective {

  constructor() { }

  @HostListener("change",["$event.target"])
  onChange(target: HTMLInputElement){
    const file = target!.files[0];
    console.log(file);

    const excelObservable = new Observable((subscriber:Subscriber<any>) =>{
      subscriber.next('sdf');
      this.readFile(file, subscriber);
    })
  }

  readFile(file:File, subscriber:Subscriber<any>){
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload=(e)=>{
      const bufferArray = e.target.result;

      XLSX.read(bufferArray, {type: 'buffer'})

    }
  }



}
