import { Component, OnInit } from '@angular/core';
import { InfectedService } from '../../services/infected.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  counter: Number;

  constructor(private infectedService: InfectedService) {
    this.infectedService.listen().subscribe(() => {
      this.getInfectedLength()
    })
  }

  ngOnInit(): void {
    this.getInfectedLength()
  }

  getInfectedLength(): void {
    this.infectedService.getInfected()
      .subscribe((res: any) => this.counter = res[0].length)
  }

}
