import { StockChart } from 'angular-highcharts';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CotacaoBovespaService } from './cotacao-bovespa.service';
import { StockQuoteData } from '../../models/stock-quote-data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cotacao-bovespa',
  templateUrl: './cotacao-bovespa.component.html',
  styleUrls: ['./cotacao-bovespa.component.scss'],
})
export class CotacaoBovespaComponent implements OnInit, AfterViewInit {

  stock: StockChart;
  stockData : Array<StockQuoteData> = [];
  close : number = 0;
  low : number = 0;
  high : number = 0;
  open : number = 0;
  variation : number = 0;
  variationPercent : number = 0;
  lastUpdateDate : string = "";
  loading : boolean = true;
  timeInterval : number = 1;

  constructor(private cotacaoService : CotacaoBovespaService,
              private toastr : ToastrService) { }
  
  ngOnInit() {
    this.getBvspIntraday();
  }

  ngAfterViewInit(): void {
    this.stock = new StockChart({
      /*chart: {
        backgroundColor: '#19231A'
      },*/
      plotOptions: {
        line:{
          color: "blue"
        }
      },
      time: {
        useUTC: true,
        timezoneOffset: 180
      },
      rangeSelector: {
        enabled: false
      },
      title: {
        text: 'IBOVESPA'
      },
      xAxis: {
        type: 'datetime'
      },
      tooltip: {
        xDateFormat: '%d/%m/%Y %H:%M:%S'
      },
      series: [{
        name: 'BVSP BOVESPA IND',
        data: []
      }]
    });
  }

  getBvspIntraday() {
    this.cotacaoService.calculateIntraday(this.timeInterval).subscribe(res => {
      this.toastr.success("Dados do Bovespa recebidos!", "OK", { progressBar: true, timeOut: 2000 });
      this.stockData = res["alpha_vantage_data"].reverse();
      this.getDailyValues();
      this.updateStockChart();
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error(error["error"]["message"], "Ops!", { progressBar: true, timeOut: 2000 });
    });
  }

  getDailyValues(){
    this.open = this.stockData[0].open;
    this.close = this.stockData[this.stockData.length - 1].close;
    this.high = Math.max.apply(Math, this.stockData.map(stock => stock.high));
    this.low = Math.min.apply(Math, this.stockData.map(stock => stock.low));
    this.variation = this.close - this.open;
    this.variationPercent = Math.abs((this.variation * 100) / (Math.max(this.close, this.open)));
    this.lastUpdateDate = this.stockData[this.stockData.length - 1].timeStamp;
  }

  updateStockChart(){
    let data = this.stockData.map(stock => {
      return [Date.parse(stock.timeStamp), +stock.close];
    });
    
    data.forEach(d => {
      this.stock.options.series[0].data.push([d[0], d[1]]);
    })

    this.stock.options.plotOptions.line.color = this.variation > 0? "green" : "red";
  }

}
