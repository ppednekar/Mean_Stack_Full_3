import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RepositoryService } from './../shared/repository.service';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})


export class CustomerlistComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'name', 'gender', 'address', 'city', 'state', 'country', 'hobbies'];
  //dataSource = ELEMENT_DATA;
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Customer>();
  selectedRow: any;
  hobbyData: any = [
    { name: 'Cricket', checked: false },
    { name: 'Football', checked: false },
    { name: 'Reading', checked: false },
    { name: 'Travelling', checked: false },
    { name: 'Other', checked: false }
  ];

  buttonName: string = 'Submit'
  titleName: string = 'Create Customer'

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loginForm: FormGroup;
  myForm: FormGroup;

  error_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
    ],

    'gender': [
      { type: 'required', message: 'Gender is required.' }
    ],

    'address': [
      { type: 'required', message: 'Address is required.' },
    ],

    'city': [
      { type: 'required', message: 'City is required.' },

    ],
    'state': [
      { type: 'required', message: 'State is required.' },
    ],

    'country': [
      { type: 'required', message: 'Country is required.' },
    ],

    'hobbies': [
      { type: 'required', message: 'Country is required.' },
    ]
  }

  constructor(private repoService: RepositoryService, public formBuilder: FormBuilder,private http: HttpClient) {

    this.loginForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      state: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      hobbies: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      profile: ['']
      // hobbies: this.formBuilder.array([])

    });

  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.loginForm.get('profile').setValue(file);
      console.log(this.loginForm.get('profile'));

    }
  }
  //constructor() { }

  ngOnInit(): void {
    this.getAllData();

    this.myForm = this.formBuilder.group({
      userhobby: this.formBuilder.array([])
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public getAllData = () => {
    this.repoService.getData('customer')
      .subscribe(res => {
        console.log("getAllData", res);
        this.dataSource.data = res as Customer[];
      })
  }

  get name() {
    return this.loginForm.get('name');
  }

  get gender() {
    return this.loginForm.get('gender');
  }

  get address() {
    return this.loginForm.get('address');
  }

  get city() {
    return this.loginForm.get('address');
  }

  get state() {
    return this.loginForm.get('state');
  }

  get country() {
    return this.loginForm.get('address');
  }

  get hobbies() {
    return this.myForm.get('userhobby');
  }


selectedOptions() { 
  return this.hobbyData
            .filter(opt => opt.checked)
            .map(opt => opt.name)
}

  submit(): void {

  

    console.log("name", this.name.value);
    console.log("gender", this.gender.value);
    console.log("address", this.address.value);
    console.log("city", this.city.value);
    console.log("state", this.state.value);
    console.log("hobbies", this.selectedOptions().toString());




    var customerObj = {
      name: this.name.value,
      gender: this.gender.value,
      address: this.address.value,
      city: this.city.value,
      state: this.state.value,
      country: this.country.value,
      photo: "Photo",
      hobbies: this.selectedOptions().toString(),

    }
    //console.log("this.titleName", this.titleName)

    if (this.buttonName == 'Submit') {
      this.insertCustomerData(customerObj)
    } else {
      this.update(customerObj)
    }

  }

  clear() {
    this.resetData();
  }

  insertCustomerData(customerObj: { name: any; gender: any; address: any; city: any; state: any; country: any; photo: string; hobbies: any; }) {
    
    const formData = new FormData();
    formData.append('image', this.loginForm.get('profile').value);
    formData.append('name', customerObj.name);
    formData.append('gender', customerObj.gender);
    formData.append('address', customerObj.address);
    formData.append('city', customerObj.city);
    formData.append('state', customerObj.state);
    formData.append('country', customerObj.country);
    formData.append('hobbies', customerObj.hobbies);

    this.http.post('http://localhost:3000/customer', formData)
      .subscribe(res => {
        console.log("create", res);
        alert('Data created successfully');
        this.getAllData();
        this.resetData();
      })

      
    

   

    // this.repoService.create('customer', formData)
    //   .subscribe(res => {
    //     console.log("create", res);
    //     alert('Data uploaded successfully');
    //     this.getAllData();

    //   })
  }
  update(customerObj: { name: any; gender: any; address: any; city: any; state: any; country: any; photo: string; hobbies: any; }) {
    this.repoService.update('customer/'.concat(this.selectedRow._id), customerObj)
      .subscribe(res => {
        console.log("create", res);
        alert('Data updated successfully');
        this.getAllData();
        this.resetData();
      })
  }




  onChange(hobby: any) {
    // const hobbyFormArray = <FormArray>this.myForm.controls.userhobby;

    // console.log("hobby", hobby);
    // console.log(hobbyFormArray);

    // if (isChecked) {
    //   hobbyFormArray.push(new FormControl(hobby));
    // } else {
    //   let index = hobbyFormArray.controls.findIndex(x => x.value == hobby)
    //   hobbyFormArray.removeAt(index);
    // }

    // console.log(this.myForm.value.userhobby);
    hobby.checked = !hobby.checked;
    console.log(this.myForm.value.userhobby);

  }


  selectRow(row) {
    console.log("row", row)
    if (this.selectedRow == row) {
      this.selectedRow = null;
      this.resetData();
    }
    else {
      this.selectedRow = row;
      this.setData(row)
    }

  }

  setData(row: any) {
    this.loginForm.get('name').setValue(row.name);
    this.loginForm.get('gender').setValue(row.gender.toLowerCase());
    this.loginForm.get('address').setValue(row.address);
    this.loginForm.get('city').setValue(row.city);
    this.loginForm.get('state').setValue(row.state);
    this.loginForm.get('country').setValue(row.country);
    // this.loginForm.get('hobbies').setValue(row.hobbies);
    this.buttonName = 'Update';
    this.titleName = 'Update Customer'

    this.hobbyData = this.hobbyData.map(item => {
      item.checked = false
      return item;
    });


    this.hobbyData = this.hobbyData.map(item => {
      if (row.hobbies.includes(item.name)) {
        item.checked = true
      }
      return item;
    });

    console.log("row.hobbies", row.hobbies);

    console.log("this.hobbyData", this.hobbyData);

  }

  resetData() {

    this.hobbyData.forEach(item => item.checked = false );

    this.loginForm.reset();
    // this.myForm.reset();
    this.buttonName = 'Submit';
    this.titleName = 'Create Customer'

    // this.hobbyData = this.hobbyData.map(item => {
    //   item.checked = false
    //   return item;
    // });

    console.log("this.hobbyData ", this.hobbyData);
    // this.hobbyData.forEach(item => item.checked = false );
  }

}

export interface Hobby {
  name: string;
  checked: boolean;
}


export interface Customer {
  name: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  hobbies: string;
  photo: string;
}
