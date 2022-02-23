import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
// import cities from './cities.json';


export interface City {
    name: string;
    postCode: number;
}

@Injectable()
export class CityService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getCities(): Observable<City[]> {
        //const url = 'https://raw.githubusercontent.com/leovo2708/ngx-treeview/master/src/demo/city/cities.json';
        //return this.httpClient.get<City[]>(url);
        return of([{
          "name": "Ho Chi Minh",
          "postCode": 700000,
          "children":[{
            "name": "Madrid",
            "postCode": "28080"
          }]
        }, {
          "name": "Ha Noi",
          "postCode": 100000
        }, {
          "name": "Da Nang",
          "postCode": 550000
        }])
    }
}
