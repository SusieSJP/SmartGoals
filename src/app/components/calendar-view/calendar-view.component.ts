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
  @ViewChild('calendar', {static: true}) private chartContainer: ElementRef;
  @Input() data: Goal;

  // define a function to get the name of the day based on the index of the
  // day
  private formatDay =
      d => ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getUTCDay()];
  private formatMonth = i =>
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
       'Nov', 'Dec'][i % 12];
  // get the index of a day by getUTCDay()
  private countDay = d => d.getUTCDay();
  // timeWeek.range(start,end) is a function that returns the sunday dates in
  // the [start, end] dates
  private chart: any;
  private yearText: number;
  private colors: any;
  private cellsize: number = 15;
  private minValue: number = 0;
  private maxValue: number = 0;
  private newData = new Array<{date: Date, value: number}>();

  constructor() {}

  ngOnInit() {
    let curDate = new Date(this.data.startDate);
    let i = 0;

    for (i; i < this.data.dailyProgress.length; i++) {
      this.maxValue = Math.max(this.maxValue, this.data.dailyProgress[i]);
      this.newData.push(
          {date: new Date(curDate), value: this.data.dailyProgress[i]});
      curDate.setDate(curDate.getDate() + 1);
    }

    this.onCreate();
  }

  onCreate() {
    let element = this.chartContainer.nativeElement;
    let svg = d3.select(element)
                  .append('svg')
                  .attr('width', element.offsetWidth)
                  .attr('height', element.offsetHeight + 20);

    // chart plot area
    this.chart = svg.append('g')
                     .attr('class', 'calendar')
                     .attr('transform', `translate(${20}, ${20})`);

    // show the year of the startDate on the top left corner
    this.yearText = this.data.startDate.getFullYear();
    this.chart.append('text')
        .attr('x', 20)
        .attr('y', 1)
        .attr('text-anchor', 'end')
        .attr('font-size', 12)
        .attr('font-weight', 550)
        .attr('color', 'black')
        .text(this.yearText);

    // show the names of the days on the left side of the calendar
    this.chart.append('g')
        .attr('text-anchor', 'end')
        .selectAll('text')
        .data(d3.range(7).map(i => new Date(2019, 3, i)))
        .join('text')
        .attr('x', 20)
        .attr('y', d => this.countDay(d) * (2 + this.cellsize) + 20)
        .attr('font-size', 10)
        .text(this.formatDay);
    // show the names of the months on the top of the calendar
    this.chart.append('g')
        .attr('text-anchor', 'end')
        .selectAll('text')
        .data(d3.range(Math.floor((element.offsetWidth - 50) / 19 / 4))
                  .map(i => this.data.startDate.getMonth() + i))
        .join('text')
        .attr(
            'x',
            d => (d - this.data.startDate.getMonth()) *
                    ((this.cellsize + 3) * 4) +
                60)
        .attr('y', 1)
        .attr('font-size', 10)
        .text(this.formatMonth);

    // adding color and legend
    this.colors = d3.scaleSequential(d3.interpolatePurples).domain([
      Math.floor(this.minValue), Math.ceil(this.maxValue)
    ]);

    // construct rectangles for total days (depend on the element.offsetWidth)
    // construct the dataset with default value 0 and progress at a specific
    // day.
    let presetData = new Array<{index: number, value: number, date: Date}>();
    let firstDayOfMonth = new Date(
        this.data.startDate.getFullYear(), this.data.startDate.getMonth(), 1);
    firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() - this.countDay(firstDayOfMonth));
    let curDate = new Date(firstDayOfMonth);

    let j = 0;
    for (let i = 0; i < Math.floor((element.offsetWidth - 50) / 19) * 7; i++) {
      if (j < this.newData.length &&
          curDate.getTime() === this.newData[j].date.getTime()) {
        presetData.push(
            {index: i, value: this.newData[j].value, date: new Date(curDate)});
        j += 1;
      } else {
        presetData.push({index: i, value: 0, date: new Date(curDate)});
      }
      curDate.setDate(curDate.getDate() + 1);
    }

    let rects = this.chart.selectAll('.day')
                    .data(presetData)
                    .enter()
                    .append('g')
                    .attr('class', 'day');



    rects.append('rect')
        .attr('width', this.cellsize)
        .attr('height', this.cellsize)
        .attr('x', d => Math.floor(d.index / 7) * (this.cellsize + 3) + 40)
        .attr('y', d => (d.index % 7) * (this.cellsize + 2.5) + 10)
        .attr('fill', d => this.colors(d.value));

    rects.append('text')
        .text(
            d => d.date.toLocaleString().slice(0, 10) + ': Complete ' + d.value)
        .attr('x', d => Math.floor(d.index / 7) * (this.cellsize + 3) + 40)
        .attr('y', 150)
        .style('visibility', 'hidden')
        .attr('font-size', '0.7rem');

    // add hover event
    this.chart.selectAll('.day')
        .on('mouseover', this.handleMouseOver)
        .on('mouseout', this.handleMouseOut);
  }

  handleMouseOver = ((d, i, n) => {
    // d is the data element for each bar
    // i is the index and the n is the array of bars, n[i] get us the
    // element we hover over
    d3.select(n[i])
        .select('rect')
        .transition('highlightDay')
        .duration(300)
        .attr('fill', '#f9a825');
    d3.select(n[i]).select('text').style('visibility', 'visible');
  });

  handleMouseOut = ((d, i, n) => {
    d3.select(n[i])
        .select('rect')
        .transition('highlightDay')
        .duration(200)
        .attr('fill', this.colors(d.value));
    d3.select(n[i]).select('text').style('visibility', 'hidden')
  });
}
