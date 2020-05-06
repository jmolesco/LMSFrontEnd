import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.sass']
})
export class CategoryDetailComponent implements OnInit {

  constructor( private route:ActivatedRoute) {
    this.route.params.subscribe(params=>{
      const id = params['id'];
  });

   }

  ngOnInit(): void {
  }

}
