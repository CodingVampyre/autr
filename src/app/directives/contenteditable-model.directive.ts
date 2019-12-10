import { Directive, Input, Output, ElementRef, EventEmitter, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[contenteditableModel]',
  host: {
    '(keyup)': 'onKeyup()',
  }
})
export class ContenteditableModelDirective {

  @Input('contenteditableModel') model: string;
  @Output('contenteditableModelChange') update = new EventEmitter();

  private lastViewModel: string;

  constructor(
    private elRef: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
      this.lastViewModel = this.model;
      this.refreshView();
    }
  }

  onKeyup() {
    const value = this.elRef.nativeElement.innerText;
    this.lastViewModel = value;
    this.update.emit(value);
  }

  private refreshView() {
    this.elRef.nativeElement.innerText = this.model;
  }

}
