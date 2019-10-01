import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {Goal} from 'src/app/model/goal';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  @ViewChild('barchart', {static: true}) private chartContainer: ElementRef;
  @Input() data: Goal;

  private margin: any = {top: 20, bottom: 50, left: 30, right: 30};
  private chart: any;
  private width: number;
  private height: number;
  private newData = new Array<{date: string, progress: number}>();

  constructor() {}

  ngOnInit() {
    let curDate = this.data.startDate;
    let i = 0;

    for (i; i < this.data.dailyProgress.length; i++) {
      this.newData.push({
        date: curDate.toLocaleDateString(),
        progress: this.data.dailyProgress[i]
      });
      curDate.setDate(curDate.getDate() + 1);
    }
    this.onCreate();
  }

  onCreate() {
    let element = this.chartContainer.nativeElement;
    let svg = d3.select(element)
                  .append('svg')
                  .attr('width', element.offsetWidth)
                  .attr('height', 300);
    this.width = 0.86 * element.offsetWidth;
    this.height = 300 - this.margin.top - this.margin.bottom;

    // chart plot area
    this.chart =
        svg.append('g')
            .attr('class', 'bars')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr(
                'transform',
                `translate(${element.offsetWidth * 0.1}, ${this.margin.top})`);

    const xAxisGroup = this.chart.append('g').attr(
        'transform', `translate(0, ${this.height})`);
    const yAxisGroup = this.chart.append('g');

    // linear scale the y value:
    const scaleY = d3.scaleLinear()
                       .domain([0, d3.max(this.newData, d => d.progress)])
                       .range([this.height, 0]);
    // band scale for x so that every data could fit into the svg container
    // input the array of x values and return the x coord of each x value
    const scaleX = d3.scaleBand()
                       .domain(this.newData.map(item => item.date))
                       .range([0, this.width])
                       .paddingInner(0.2)
                       .paddingOuter(0.2);

    // x and y axis
    const xAxis = d3.axisBottom(scaleX);
    const yAxis = d3.axisLeft(scaleY).ticks(5);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end');

    this.chart.selectAll('.bar')
        .data(this.newData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', scaleX.bandwidth)
        .attr('height', d => this.height - scaleY(d.progress))
        .attr('fill', 'pink')
        .attr('x', d => scaleX(d.date))
        .attr('y', d => scaleY(d.progress));
  }

  onUpdate() {
    d3.selectAll('svg').remove();
    this.onCreate();
  }
}
