import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressBookService } from '../../services/address-book.service';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phoneNumber', 'email', 'address', 'actions'];
  persons: any[] = [];

  constructor(private service: AddressBookService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadPersons();
  }

  // loadPersons() {
  //   this.service.getPersons().subscribe((data) => {
  //     this.persons = data;
  //   });
  // }

  loadPersons() {
    this.service.getPersons().subscribe((data) => {
      console.log('Fetched Persons:', data); // Debugging
      this.persons = data;
    });
  }
  

  // addPerson() {
  //   const dialogRef = this.dialog.open(PersonFormComponent);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.service.addPerson(result).subscribe(() => this.loadPersons());
  //     }
  //   });
  // }

  addPerson() {
    const dialogRef = this.dialog.open(PersonFormComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result); // Debugging
  
      if (result) {
        this.service.addPerson(result).subscribe(
          (response) => {
            console.log('Person added successfully:', response); // Debugging
  
            this.service.getPersons().subscribe((data) => {
              console.log('Updated Address Book Data:', data); // Debugging
              this.persons = [...data]; // Ensure change detection
            });
          },
          (error) => {
            console.error('Error adding person:', error);
          }
        );
      } else {
        console.warn('Dialog closed without data.');
      }
    });
  }
  
  
  

  editPerson(person: any) {
    const dialogRef = this.dialog.open(PersonFormComponent, { data: person });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.updatePerson(person.id, result).subscribe(() => this.loadPersons());
      }
    });
  }

  deletePerson(id: number) {
    this.service.deletePerson(id).subscribe(() => this.loadPersons());
  }
}
