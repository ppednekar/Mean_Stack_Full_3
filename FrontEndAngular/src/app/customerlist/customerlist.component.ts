import { Component, OnInit } from '@angular/core';
//import { RepositoryService } from './../shared/repository.service';


@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})


export class CustomerlistComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  //public dataSource = new MatTableDataSource<Customer>();
 
  
 // constructor(private repoService: RepositoryService) { }
  constructor() { }

  ngOnInit(): void {
    //this.getAllData();
  }

//   public getAllData = () => {
//     this.repoService.getData('customer')
//     .subscribe(res => {
//       this.dataSource.data = res as Customer[];
// console.log("this.dataSource ",this.dataSource)

//     })
//   }


}

  /* Static data */ 
  export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  };
  
  export interface Customer{
    id: string;
    name: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    country: string;
    photo: string;
    hobbies: string;
    dateDate: Date;

}

  const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'A/13 Om Shradha society Shreenagar Thane West' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
