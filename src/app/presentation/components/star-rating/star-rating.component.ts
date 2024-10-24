import { NgClass, NgFor } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'star-rating',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './star-rating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor, OnInit {
  @Input() stars: number = 10;
  rating: number = 0;
  hoverRating: number | null = null;
  starsArray: number[] = [];
  
  ngOnInit(): void {
    this.starsArray = Array(this.stars).fill(0).map((_,i) => i +1);
  }

  onChange = (rating: number) => {};
  onTouched = () => { };

  setRating(rating: number): void {
    this.rating = rating;
    this.onChange(this.rating);
    this.onTouched();
  }

  setHoverRating(rating: number): void {
    this.hoverRating = rating;
  }

  resetRating(): void {
    this.hoverRating = null
  }

  writeValue(rating: number): void {
    this.rating = rating;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
