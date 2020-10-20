import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/services/models/user';
import { map } from 'rxjs/operators';
import { Review } from './../../shared/services/models/review';
import { Movie } from './../../shared/services/models/movie';
import { MovieService } from './../../shared/services/movie.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit, OnDestroy {
  movie: Movie
  movieImg: string
  reviews: Review[]
  avgMovieRating = 5.0
  currentUser: User

  private subs = new Subscription
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private UserService: UserService
  ) {
    this.currentUser = this.UserService.currentUserValue
   }

  ngOnInit(): void {
    this.route.params.subscribe(movie => {

      if (movie && movie.id){
        // call the method to retrieve the movie from the movie service
        this.retrieveMovieById(movie.id)
      }
    })
  }

  retrieveMovieById(id: number) {
    const params = { id: id }
    this.subs.add(
      this.movieService.getMovieById(params).subscribe(data => {
        if (data && data.movie && data.reviews) {
          this.movie = new Movie(data.movie)
          this.movieImg = this.movie.image
          this.reviews = data.reviews.map(x => new Review(x))
          
          if (this.reviews.length){
            this.computeTheAverageReviewRating(this.reviews)
          }
        }

      }, error => {
        if (error) {
          console.log(error)
        }
      }
      )
    )
  }

  computeTheAverageReviewRating(reviews: Review[]) {
    const totalReviews = reviews.length || 0
    let totalRating = 0
    reviews.forEach(x => {
      totalRating += x.rating
    })
    this.avgMovieRating = ( totalRating / totalReviews )


  }
routeToWriteReview() {


}


  setDefaultPic() {
    this.movieImg = 'assets/images/batman-vs-godzilla.png'

  }

  editMovie() {

  }

  deleteMovie() {

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
