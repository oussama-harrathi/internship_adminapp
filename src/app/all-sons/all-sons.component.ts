import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-sons',
  templateUrl: './all-sons.component.html',
  styleUrls: ['./all-sons.component.css']
})
export class AllSonsComponent implements OnInit {
  title = 'admin-app';
  employeeSonsData: any[] = [];
  selectedAllStatus: number = 1;
  searchEmployeeId: number | null = null;
  filteredEmployeeSonsData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmployeeSonsData();
  }

  fetchEmployeeSonsData(): void {
    const url = 'http://localhost:3001/employee-sons'; // Update the URL as needed

    this.http.get(url).subscribe(
      (response: any) => {
        if (response.success) {
          this.employeeSonsData = response.data;
          this.filterData(); // Call the filter function after fetching data
        } else {
          console.error('Failed to fetch employee and sons data');
        }
      },
      (error) => {
        console.error('An error occurred while fetching employee and sons data:', error);
      }
    );
  }

  updateCanUpdate(employeeId: number, canUpdate: number): void {
    const url = 'http://localhost:3001/update-can-update';

    this.http.post(url, { employeeId, canUpdate }).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Update status successfully');
          this.fetchEmployeeSonsData(); // Refresh data after update
        } else {
          console.error('Failed to update status');
        }
      },
      (error) => {
        console.error('An error occurred while updating status:', error);
      }
    );
  }

  updateAllSonsStatus(): void {
    for (const employeeData of this.employeeSonsData) {
      this.updateCanUpdate(employeeData.employeeId, this.selectedAllStatus);
    }
  }

  filterData(): void {
    if (this.searchEmployeeId !== null) {
      this.filteredEmployeeSonsData = this.employeeSonsData.filter(
        employeeData => employeeData.employeeId === this.searchEmployeeId
      );
    } else {
      this.filteredEmployeeSonsData = this.employeeSonsData;
    }
  }
}
