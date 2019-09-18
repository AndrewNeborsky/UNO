import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private toastr: ToastrService) { }

  showAlert(text: string) {
    this.toastr.error(
      `<span data-notify="message">${text}</span>`, "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger",
        positionClass: "toast-top-center"
      });
  }
}
