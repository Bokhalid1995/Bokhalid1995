import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CollapseDirective } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-dataentry',
  templateUrl: './dataentry.component.html',
  styleUrls: ['./dataentry.component.scss']
})
export class DataentryComponent implements OnInit {
  collapsed = true;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  
}