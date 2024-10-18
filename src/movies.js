// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return  moviesArray.reduce((directors, movie, i) => {
        directors[movie.director] = "director";
        if (i === moviesArray.length -1) {
            // console.log (Object.keys(directors));
            return Object.keys(directors);
        }
        // console.log(directors);
        return directors;
    }, {});
    //Mejor alternativa
    const allDirectors = moviesArray.map(movie => movie.director); // Extrae todos los directores
    const uniqueDirectors = [...new Set(allDirectors)]; // Elimina duplicados
    return uniqueDirectors;
    
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    
    return moviesArray.filter((movie) => {
        return((movie.genre.includes("Drama")) &&  (movie.director === "Steven Spielberg"))
    }).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    return  moviesArray.reduce((sumOfScores, movie, i) => {
        // Si movie.score es falsy suma 0 (valor falsy) sino sumale el movie.score.
        sumOfScores += (!movie.score) ?  0 : movie.score; 
        if (i === moviesArray.length -1) {
            // console.log (Object.keys(directors));
            return Math.round((sumOfScores / moviesArray.length) * 100) / 100;
        }
        // console.log(directors);
        return sumOfScores;
    }, 0);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let contador = 0;
    return  moviesArray.reduce((sumOfDramaScores, movie, i) => {
        if (movie.genre.includes("Drama")) {
            // Si movie.score es falsy suma 0 (valor falsy) sino sumale el movie.score.
            sumOfDramaScores += (!movie.score) ?  0 : movie.score; 
            contador++;
            if (i === moviesArray.length -1) {
                // console.log (Object.keys(directors));
                return Math.round((sumOfDramaScores / contador) * 100) / 100;
            }
            // console.log(directors);
            return sumOfDramaScores;    
            }
        return sumOfDramaScores;
    }, 0);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    sortedMoviesByYear= Array.from(moviesArray);
    return sortedMoviesByYear.sort((movieA, movieB) => {
        if (movieA.year - movieB.year > 0) return 1  
        if (movieA.year - movieB.year < 0) return -1
        if (movieA.year - movieB.year === 0) {
            if (movieA.title > movieB.title) return 1
            if (movieA.title < movieB.title) return -1
            if (movieA.title === movieB.title) return 0
        }
    })
    console.log("sortedMoviesByYear: ", sortedMoviesByYear);
    console.log("moviesArray: ", moviesArray);
    
    //Mas eficiente
    // Hacer una copia del arreglo original para no modificarlo
    const sortedMovies = [...moviesArray];
    
    // Ordenar por año y si son iguales, por título
    return sortedMovies.sort((movieA, movieB) => {
        if (movieA.year === movieB.year) {
            // Si el año es el mismo, ordenar por título usando localeCompare
            return movieA.title.localeCompare(movieB.title);
        }
        // Ordenar por año (ascendente)
        return movieA.year - movieB.year;
    });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const onlyTitleArray = moviesArray.map((movie) => movie.title);
    onlyTitleArray.sort((titleA, titleB) => titleA.localeCompare(titleB));
    return onlyTitleArray.filter((movie, index) => index < 20);
    /**  Another way todo the same: */
    // const onlyTitleArray = moviesArray.map((movie) => movie.title)
    // .sort((titleA, titleB) => titleA.localeCompare(titleB))
    // .filter((movie, index) => index < 20);
    // return onlyTitleArray;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.reduce((movieTimeMinuts, movie) => {
        // console.log(movie.duration.substring(3, movie.duration.indexOf("m")));
        // console.log(i);
        const hoursToMinutes = parseInt(movie.duration[0]) *60;
        const minutes = (movie.duration.length > 3) ? parseInt(movie.duration.substring(3, movie.duration.indexOf("m"))) : 0;
        const totalMinuts = hoursToMinutes + minutes;
        // console.log(totalMinuts);
        movieTimeMinuts.push({
            ...movie,
            duration : totalMinuts
        })
        // console.log(movieTimeMinuts);
        return movieTimeMinuts;
        // movieTimeMinuts.push(movie)
        // console.log(movieTimeMinuts);
    }, []);
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
        return null;
    }
    moviesArray.sort((a, b) => a.year - b.year);

    // console.log("moviesArray", moviesArray);
    let contador = 1;
    let sumOfScores  = 0;
    const yearsAverages = moviesArray.reduce((yearsAverages, movie, i, arr) => {
        // console.log(movie);        
        const year = movie.year;
        // console.log(year);
        const score = movie.score;
        // console.log(score);
        if (i+1 < arr.length && year === arr[i+1].year) {
            contador++;
            sumOfScores += score;
        } else {
            if (contador === 1) {
                yearsAverages.push({
                    year: year,
                    score: score
                });
            } else {
                sumOfScores += score;
                yearsAverages.push({
                    year: year,
                    score: sumOfScores / contador
                });
            }
            contador = 1;
            sumOfScores = 0;
        }
        // console.log(yearsAverages);
        return yearsAverages;
    }, []);
    // console.log("yearsAverages: ", yearsAverages);
    let year = 0;
    let rate = 0;
    yearsAverages.forEach((yearAverage) => {
        if (yearAverage.score >= rate) { // --> && year < yearAverage.year
            if (yearAverage.score === rate) {
                year = year;
                rate = rate;
            } else {
                year = yearAverage.year;
                rate = yearAverage.score;
            }
        }
    });
    return `The best year was ${year} with an average score of ${rate}`;
}
