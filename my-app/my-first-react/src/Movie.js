//dumb 컴포넌트만 있으면 Copmponent는 안불러와도 됨.
//import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'
import './Movie.css';


//state가 없는 컴포넌트이므로 아래 function으로 대체 가능. 
// class Movie extends Component {
//     //props 타입 체크 react에서 빠져서 add prop-types 해주고 지정하면 됨. 브라우저 콘솔에서 확인 가능. 
//     static propTypes = {
//         //.isRequired는 필수인 경우.
//         title: PropTypes.string.isRequired,
//         poster: PropTypes.string.isRequired
//     }
//     render(){
//         //this.props로 조회하면 부모가 이 컴포넌트에 넣어준 데이터 확인 가능. 
//         return (
//             <div>
//                 <MoviePoster poster={this.props.poster}/>
//                 <h1>{this.props.title}</h1>
//             </div>
//         );
//     }
// }
function Movie({title, poster,genres,synopsis}){
    return(
         <div className="Movie">
            <div className="Movie__Column">
                <MoviePoster poster={poster} alt ={title}/>
            </div>
            <div className="Movie__Column">
                <h1>{title}</h1>
                <div className="Movie__Genres">
                    {genres.map((genre,index) => <MovieGenre genre={genre} key={index} />)}
                </div>
                <div className="Movie__Synopsis">
                <LinesEllipsis
                    text={synopsis}
                    maxLine='3'
                    ellipsis='...More'
                    trimRight
                    basedOn='letters' />
                </div>
            </div>
        </div>
        );
}


//state가 없는 컴포넌트이므로 아래 function으로 대체 가능. 
// class MoviePoster extends Component {
//       static propTypes = {
//         poster: PropTypes.string.isRequired
//     }
//      render(){
//     return (
//         <img width="200px" alt ="poster" src={this.props.poster}/>
//       )
//   }
// }

function MoviePoster({poster, alt}){
    return (
        <img className="Movie__Poster" src={poster} alt ={alt} title = {alt} />
    );
}

function MovieGenre({genre}){
    return (
        <span className="Movie__Genre">{genre}</span>
    );
}


Movie.propTypes = {
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        genres: PropTypes.array.isRequired,
        synopsis: PropTypes.string.isRequired
    }

MoviePoster.propTypes = {
    alt: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
}

MovieGenre.propTypes = {
    genre: PropTypes.string.isRequired
}

export default Movie;