import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ChartModel, Currency } from '../models/chart-model';

@Injectable({
  providedIn: 'root'
})
export class MuscleWidgetService {
  constructor(private httpClient: HttpClient) { }

  getChartData(days: number = 7, pointPerDay: number = 24): Observable<ChartModel> {
    let now = new Date()
    let end = now.getTime()
    let start = new Date().setDate(now.getDate() - days)
    let points = pointPerDay * days
    return this.httpClient.get<ChartModel>(`https://http-api.livecoinwatch.com/widgets/coins/history/range?coin=EVOX&start=${start}&end=${end}&currency=USD&points=${points}`)
  }

  getCurrencyData(): Observable<Currency> {
    return this.httpClient.get<Currency>('https://http-api.livecoinwatch.com/widgets/coins?only=EVOX,BTC&currency=USD')
  }
}