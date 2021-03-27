import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from '../../services/functions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
    private functionService:FunctionService) { }

  ngOnInit() { }
  navigateTo(link) {
    this.functionService.navigateTo(link);
   
  }
}
