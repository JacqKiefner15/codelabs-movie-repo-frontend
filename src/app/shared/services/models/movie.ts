
export class Movie {
    cast: string
    created_at: string
    description: string
    director: string
    duration: number
    id: number
    image: string
    parental_rating: string
    rating: number
    release_date: string
    title: string
    total_gross: number
    updated_at: string
    user_id: number
    year: number

    constructor ({
        cast = '',
        created_at = '',
        description = '',
        director = '',
        duration = null,
        id = null,
        image = '',
        parental_rating = '',
        rating = null,
        release_date = '',
        title = '',
        total_gross = null,
        updated_at = '',
        user_id = null,
        year = null,
        ...rest 
    }) {
        Object.assign(this, rest)
        this.cast = cast
        this.created_at = created_at
        this.description = description
        this.director = director
        this.duration = duration
        this.id = id
        this.image = image
        this.parental_rating = parental_rating
        this.rating = rating
        this.release_date = release_date
        this.title = title
        this.total_gross = total_gross
        this.updated_at = updated_at
        this.user_id = user_id
        this.year = year

    }
    _
}


