import { Component, OnInit,AfterViewInit, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { TreeviewI18n, TreeviewComponent } from '../../lib';
import { City, CityService } from './city.service';
import { CityTreeviewI18n } from './city-treeview-i18n';

@Component({
    selector: 'ngx-city',
    templateUrl: './city.component.html',
    providers: [
        CityService,
        { provide: TreeviewI18n, useClass: CityTreeviewI18n }
    ]
})
export class CityComponent implements OnInit, AfterViewInit {
    @ViewChildren(TreeviewComponent) childrenComponents: QueryList<TreeviewComponent>;
    treeviewComponent: TreeviewComponent;
    cities: City[];
    selectedCities: City[] = [];
    unselectedCities: City[] = [];

    constructor(
        private service: CityService
    ) { }

    ngOnInit() {
      this.service.getCities().subscribe(cities => {
          this.cities = cities;
          // this.selectedCities = [{
          //   "name": "Ho Chi Minh",
          //   "postCode": 700000
          // }]
          
      });
        
    }

    ngAfterViewInit() {
      debugger;
      this.childrenComponents.changes.subscribe(({first}) => {
        debugger;
        console.log(first);
        this.treeviewComponent = first;
        // setTimeout(() => this.selectItems(this.selectedCities),2000);
        // this.evalSelected()
      });
    }

    private selectItems(selection:City[]){
      debugger;
      const selectedNames = selection.map(city => city.name);
      this.treeviewComponent.items.forEach(item => {
        if (selectedNames.includes(item.value.name)) {
          item.checked = true;
        } 
      })
      
    }

    onSelectedChange(selectedCities: City[]) {
      if(this.treeviewComponent) {
        this.evalSelected();
      }
    }

    evalSelected() {
        this.selectedCities  = this.treeviewComponent.selection.checkedItems.map(item => item.value);
        this.unselectedCities  = this.treeviewComponent.selection.uncheckedItems.map(item => item.value);
    }
}
