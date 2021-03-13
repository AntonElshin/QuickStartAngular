import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {

  @Input() highlightFontColor = 'black';
  @Input() highlightBackgroundColor = '#e6e6e6';
  @Input() selectedRowClassName = 'selected';
  @Output() onSelected: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding('style.color') rowFontColor;
  @HostBinding('style.background-color') rowBackgroundColor;

  constructor(private el: ElementRef, private r: Renderer2) {
  }

  @HostListener('click', ['$event.path[1]' , '$event.path[1]["children"]' , '$event.path[2]["children"]']) onClick(event: Event, selRowList: HTMLCollection, tableRowList: HTMLCollection) {

    for(let i = 0 ; i < tableRowList.length; i++) {
      const el = tableRowList.item(i);
      el.classList.remove(this.selectedRowClassName);
    }

    this.r.addClass(this.el.nativeElement, this.selectedRowClassName);

    const selectedRowId = selRowList.item(0).innerHTML;
    this.onSelected.emit(selectedRowId);
  }

  @HostListener('mouseenter', ['$event.path[1]']) onEnter() {
    this.rowFontColor = this.highlightFontColor;
    this.rowBackgroundColor = this.highlightBackgroundColor;
    //this.r.setStyle(this.el.nativeElement, 'color', this.highlightFontColor);
    //this.r.setStyle(this.el.nativeElement, 'background-color', this.highlightBackgroundColor);
  }

  @HostListener('mouseleave', ['$event.path[1]']) onLeave() {
    this.rowFontColor = null;
    this.rowBackgroundColor = null;
    //this.r.setStyle(this.el.nativeElement, 'color', null);
    //this.r.setStyle(this.el.nativeElement, 'background-color', null);
  }
}
