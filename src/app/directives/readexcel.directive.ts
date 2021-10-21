import { Directive, HostListener } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from "xlsx";

@Directive({
  selector: '[appReadexcel]'
})
export class ReadexcelDirective {
  excelObservable: Observable<any>;

  constructor() { }

  @HostListener("change",["$event.target"])
  onChange(target: HTMLInputElement){
    const file = target!.files[0];
    console.log(file);

    this.excelObservable = new Observable((subscriber:Subscriber<any>) =>{
      subscriber.next('sdf');
      this.readFile(file, subscriber);
    });
    this.excelObservable.subscribe((d)=>{
      console.log(d);
    })
  }

  readFile(file:File, subscriber:Subscriber<any>){
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload=(e)=>{
      const bufferArray = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bufferArray, {type: 'buffer'});

      const wsname:string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      subscriber.next(data);
      subscriber.complete();

    }
  }



}
