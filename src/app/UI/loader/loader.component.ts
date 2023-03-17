import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public isLoading$: BehaviorSubject<boolean> = this.loaderService.isLoading;

  constructor(public loaderService: LoaderService) {}
}
