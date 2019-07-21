export default class Movie{
    constructor(
        id = '',
        title= '',
        backdrop_path = '',
        overview = ''
    ){
        this.id = id;
        this.title = title;
        this.backdrop_path = backdrop_path;
        this.overview = overview;
    }
}