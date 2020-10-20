import { Review } from './../../shared/services/models/review';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit, OnChanges {
  @Input() reviews: Review[]
  @Input() movieId; number
  firstReview: Review
  reviewCount: number
  reviewCountString: string




  constructor(
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
      if(this.reviews && this.reviews.length) {
        this.firstReview = this.reviews[0]
        this.reviewCount = this.reviews.length
        if (this.reviewCount > 1) {
          this.reviewCountString = `${this.reviewCount} review`
        } else {
            this.reviewCountString = `${this.reviewCount} reviews`
          }
      } else {
        this.reviews = null
        this.reviewCountString = null
        this.reviewCount = 0
      }
  }


  routeToAllReviews() {
    this.router.navigate
  }


}
