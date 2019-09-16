import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Bonuce } from 'src/app/models/bonuce.model';

@Component({
  selector: 'app-bonuce-creater',
  templateUrl: './bonuce-creater.component.html',
  styleUrls: ['./bonuce-creater.component.css']
})
export class BonuceComponent implements OnInit {

  @Output() sendBonuce = new EventEmitter<Bonuce>();
  public bonuce: Bonuce;
  
  constructor() { 
    this.bonuce = new Bonuce()
  }

  ngOnInit() {
  }

  addBonuce() {
    this.sendBonuce.emit(this.bonuce)
    this.bonuce = new Bonuce()
  }

}
