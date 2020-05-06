import { Component, OnInit, Input } from '@angular/core';
import { ChildService } from '@sharedService/child.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {

  @Input()
  paginationTotal: string

  @Input()
  paginationTotaPage: string


  clickEventNewLoadPageSubscription: Subscription;

  list = new Array();
  pageList = new Array();
  pageListWordings = new Array();
  currentPage: number = 0;
  numberPerPage: number = 0;
  numberOfPage: number = 0;
  previousState: boolean = false;
  nextState: boolean = false;



  constructor(private childService: ChildService) {
    this.currentPage = 1;
    this.numberOfPage = 0;

    if (this.childService.subsVar1 !== undefined) {
      this.childService.subsVar1 = undefined;
    }

  }

  createlist(totalItems): void {
    if (this.list.length > 0) {
      this.list.splice(0, this.list.length);
    }
    for (var i = 1; i <= totalItems; i++) {
      this.list.push(i);
    }
  }

  generateNumberofPage(): number {
    if (this.list.length < this.numberPerPage) {
      return this.list.length;
    }
    return Math.ceil(this.list.length / this.numberPerPage);
  }

  nextPage() {
    if (this.nextState == true) {
      return false;
    }

    this.currentPage += 1;
    this.loadList();
  }

  previousPage() {

    if (this.previousState == true) {
      return false;
    }
    this.currentPage -= 1;
    this.loadList();
  }

  loadList(): void {
    let begin = ((this.currentPage - 1) * this.numberPerPage);
    let end = begin + this.numberPerPage;
    this.pageList = this.list.slice(begin, end);
    this.check();
  }
  check(): void {
    this.previousState = this.currentPage === 1 ? true : false;
    this.nextState = this.currentPage === this.numberOfPage ? true : false;  
  }



  ngOnInit(): void {

    this.numberPerPage = parseInt(this.paginationTotaPage) > 10 ? 10 : parseInt(this.paginationTotaPage);
    this.createlist(parseInt(this.paginationTotaPage));
    this.numberOfPage = this.generateNumberofPage();
    this.loadList();
    if (this.childService.subsVar1 === undefined) {
      this.childService.subsVar1 = this.childService.invokeLoadNewPageComponentFunction.subscribe((totalPage: string) => {
        this.numberPerPage = parseInt(totalPage) > 10 ? 10 : parseInt(totalPage);
        this.createlist(parseInt(totalPage));
        this.numberOfPage = this.generateNumberofPage();
        this.loadList();
      });
    }
  }
  //Next Page
  submitRequestPage(id): void {
    this.childService.sendNextPage(id);
  }



}
