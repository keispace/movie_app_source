import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

//props 데이터 전달. 데이터는 메인 컴포넌트가 가지고 있는것. 

//1. 제목과 이미지를 별도 배열로 사용
// const movieTitles = [
//     "matrix",
//     "Full Metal Jacket",
//     "Oldboy",
//     "Star Wars"
// ]
// const movieImages = [
// "https://koreanz.com.au/wp-content/uploads/kboard_attached/161/201601/56a83065cee6c1397253.jpg",
// "http://pds21.egloos.com/pds/201407/19/00/a0100600_53c93ed63cf54.jpg",
// "http://studio.kofic.or.kr/wp-content/uploads/1999/07/%EC%98%AC%EB%93%9C%EB%B3%B4%EC%9D%B4.jpg",
// "https://vignette2.wikia.nocookie.net/starwars/images/f/fd/Star_Wars_Episode_VII_The_Force_Awakens.jpg/revision/latest?cb=20151018162823"
// ]

//2. 위 두 내용을 아래 obj로 변경 
// const movies =[
//     {
//         title : "Matrix",
//         poster : "https://koreanz.com.au/wp-content/uploads/kboard_attached/161/201601/56a83065cee6c1397253.jpg"
//     },
//     {
//         title :  "Full Metal Jacket",
//         poster : "http://pds21.egloos.com/pds/201407/19/00/a0100600_53c93ed63cf54.jpg"
//     },
//     {
//         title :  "Oldboy",
//         poster : "http://studio.kofic.or.kr/wp-content/uploads/1999/07/%EC%98%AC%EB%93%9C%EB%B3%B4%EC%9D%B4.jpg"
//     }, 
//     {
//         title :  "Star Wars",
//         poster : "https://vignette2.wikia.nocookie.net/starwars/images/f/fd/Star_Wars_Episode_VII_The_Force_Awakens.jpg/revision/latest?cb=20151018162823"
//     }
// ]
//3 state로 데이터 이동. 
//4. 처음에는 state에 없음 -> 5초후 데이터 들어와서 표시. 
//5. 실제 데이터 적용 (YTS.ag의 api) https://yts.ag/api/v2/list_movies.json?sort_by=rating

//모든 컨포넌트는 render()를 가진다.
//render()는 이 컴포넌트가 보여주는것은 무엇인가 정의.
class App extends Component {
    state = {
        //greeting : "Hello!",
        // movies: [
        //     {
        //         title: "Matrix",
        //         poster: "https://koreanz.com.au/wp-content/uploads/kboard_attached/161/201601/56a83065cee6c1397253.jpg"
        //     },
        //     {
        //         title: "Full Metal Jacket",
        //         poster: "http://pds21.egloos.com/pds/201407/19/00/a0100600_53c93ed63cf54.jpg"
        //     },
        //     {
        //         title: "Oldboy",
        //         poster: "http://studio.kofic.or.kr/wp-content/uploads/1999/07/%EC%98%AC%EB%93%9C%EB%B3%B4%EC%9D%B4.jpg"
        //     },
        //     {
        //         title: "Star Wars",
        //         poster: "https://vignette2.wikia.nocookie.net/starwars/images/f/fd/Star_Wars_Episode_VII_The_Force_Awakens.jpg/revision/latest?cb=20151018162823"
        //     }
        // ]
    }

    componentWillMount() {
        console.log("1 will Mount");
    }

    componentDidMount() {
        console.log("3 did Mount");
        this._getMovies();

        //5. 전체 삭제 후 실 데이터 적용.
        // setTimeout(() => {
        // //this.state.greeting = "Never!"
        // // this.setState({
        // //     greeting : "Hello again"
        // // });
        //     this.setState({
        // //     movies: [
        // //     ...this.state.movies,
        // //     {
        // //         title:'transporter',
        // //         poster:'http://image.cine21.com/resize/cine21/poster/2008/1209/M0010003_[X230,330].jpg'
        // //     }
        // //     ]
        // // })
        //         movies: [
        //             {
        //                 title: "Matrix",
        //                 poster: "https://koreanz.com.au/wp-content/uploads/kboard_attached/161/201601/56a83065cee6c1397253.jpg"
        //             },
        //             {
        //                 title: "Full Metal Jacket",
        //                 poster: "http://pds21.egloos.com/pds/201407/19/00/a0100600_53c93ed63cf54.jpg"
        //             },
        //             {
        //                 title: "Oldboy",
        //                 poster: "http://studio.kofic.or.kr/wp-content/uploads/1999/07/%EC%98%AC%EB%93%9C%EB%B3%B4%EC%9D%B4.jpg"
        //             },
        //             {
        //                 title: "Star Wars",
        //                 poster: "https://vignette2.wikia.nocookie.net/starwars/images/f/fd/Star_Wars_Episode_VII_The_Force_Awakens.jpg/revision/latest?cb=20151018162823"
        //             }
        //         ]
        //     })
        // }, 1000)
    }


     _getMovies = async () => {
        const movies = await this._callApi();
        //console.log(movies);
        this.setState({movies});//movies : movies 란 의미
    }

    _callApi = () => {
       return fetch("https://yts.ag/api/v2/list_movies.json?sort_by=download_count")
        .then(response => response.json())//readablesteam을 json으로 바꿈.
        .then(json => json.data.movies) //=>에서 리턴은 생략.
        .catch(err => console.log(err))
//        .catch(function(err){console.log(err);})//위와 동일.
    }
//최신 es function 생성법
    _renderMovies = () => {
        const movies = this.state.movies.map((movie) => {
            //console.log(movie);
            return <Movie 
                title = { movie.title_english } 
                poster = { movie.medium_cover_image } 
                key = { movie.id } 
                genres={movie.genres}
                synopsis={movie.synopsis} />
        });

        return movies;
    }

    render() {
        console.log("2 did Render");
        const {movies} = this.state;
        return ( 
            <div className = {movies?"App":"App--loading"} > 
        { /*this.state.greeting
            { /*속성=명칭이 전부 해당 컴포넌트 props로 감
            1각각 어레이사용 -> 2 obj어레이로 변경 -> 3. state로 이동.
            <Movie title={movieTitles[0]} poster={movieImages[0]}/>
            <Movie title={movieTitles[1]} poster={movieImages[1]}/>
            <Movie title={movieTitles[2]} poster={movieImages[2]}/>
            <Movie title={movieTitles[3]} poster={movieImages[3]}/>
      
        {this.state.movies.map((movie, idx) => {
            return <Movie title = { movie.title } 
            poster = { movie.poster } 
            key = { idx } />
        })}  
        */} 
           {movies? this._renderMovies() : "Loading"}
        </div>
        );
    }
}



export default App;