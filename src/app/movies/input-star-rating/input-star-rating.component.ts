import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-star-rating',
  templateUrl: './input-star-rating.component.html',
  styleUrls: ['./input-star-rating.component.scss']
})
export class InputStarRatingComponent implements OnInit {
  @Input() rating: number
  @Input() starCount: number
  @Input() padding: number
  @Input() size: number
  ratingArr = []

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index)
    }
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star'
    }
    else {
      return 'star-half-alt'
    }
  }

  getSizeStyles() {
    if (this.size && this.size !== 0) {
      return {
        fontSize: `${this.size}px`,
        width: `${this.size}px`,
        height: `${this.size}px`

      }
    } else {
      return {
        fontSize: '24px',
        width: '24px',
        height: '24px'
      }
    }
  }
}
