import { LocalStorageService } from './../shared/services/local-storage.service';
import { Movie } from './../shared/services/models/movie';

import { MovieService } from './../shared/services/movie.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = []

  constructor(
    private movieService: MovieService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.retreiveAllMovies()
    this.setMyEmailInStorage()

  }

  setMyEmailInStorage() {
    this.storageService.setItem('myEmail', 'jacq@email.com')
  }

  retreiveAllMovies() {
    this.movieService.getAllMovies().subscribe(movies => {
      if (movies) {
        this.movies = movies
      }
    debugger
    }, error => {
      if (error) {
        console.log(error)
      }
    })
  }

}
