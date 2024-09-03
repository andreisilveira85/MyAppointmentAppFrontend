import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  providers: [DatePipe]
})
export class AppointmentComponent implements OnInit {
  appointments: any[] = [];
  newAppointment = { dateTime: '', reason: '' };

  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => this.appointments = data,
      error: () => this.toastr.error('Failed to load appointments.')
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.appointmentService.scheduleAppointment(this.newAppointment).subscribe({
        next: () => {
          this.toastr.success('Appointment scheduled successfully!');
          this.fetchAppointments();
          form.reset();
        },
        error: () => this.toastr.error('Failed to schedule appointment.')
      });
    }
  }

  confirmDeletion(id: string) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.deleteAppointment(id);
    }
  }

  deleteAppointment(id: string) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.toastr.success('Appointment deleted successfully');
        this.fetchAppointments(); 
      },
      error: () => this.toastr.error('Failed to delete appointment')
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']).catch(err => console.error('Error navigating to login:', err));
  }
}




