import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') highlightColor: string;

  private _defaultColor = 'grey';

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
    _renderer.setStyle(_el.nativeElement, 'color', this._defaultColor);
  }

  /**
   * Le décorateur @HostListener permet de positionner des Listners sur l'élément
   * qui aura le sélecteur appHighlight.
   * Il prend en paramètre l'évènement que l'on veut écouter.
   */
  @HostListener('mouseenter', ['$event']) onmouseenter(event: Event) {
    this._renderer.setStyle(this._el.nativeElement, 'color', this.highlightColor);
  }

  @HostListener('mouseleave', ['$event']) onmouseleave(event: Event) {
    this._renderer.setStyle(this._el.nativeElement, 'color', this._defaultColor);
  }

}
