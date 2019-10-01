import {Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {Goal} from 'src/app/model/goal';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})

@Injectable()
export class CalendarViewComponent implements OnInit {
  @ViewChild('calendar-chart', {static: true})
  private chartContainer: ElementRef;
  @Input() data: Goal;

  private margin: any = {top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() {}

  ngOnInit() {}

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element)
                  .append('svg')
                  .attr('width', element.offsetWidth)
                  .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
                     .attr('class', 'bars')
                     .attr(
                         'transform',
                         `translate(${this.margin.left}, ${this.margin.top})`);
  }
}
