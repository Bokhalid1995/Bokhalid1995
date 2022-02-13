import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../shared/Dialog.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html'
})
export class DialogDeleteComponent implements OnInit {

  message: any;  
  constructor(  
      private DialogService: DialogService  
  ) { }  

  ngOnInit(): any {  
     /** 
      *   This function waits for a message from alert service, it gets 
      *   triggered when we call this from any other component 
      */  
      this.DialogService.getMessage().subscribe(message => {  
          this.message = message;  
      });  
  }  
}
