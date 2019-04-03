import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[appImageUrlVal]'
})
export class ImageUrlValDirective {

  constructor(private elRef: ElementRef, private form: NgForm) { }

  @HostListener('input')
  inputHandler(){
    let element:string = this.elRef.nativeElement.value;
    if(element.startsWith('http') && (element.endsWith('.png') || element.endsWith('.jpg'))){
      this.form.control.setErrors(null);
    }else{
      this.form.control.setErrors({'image': true});
    }
  }
}
