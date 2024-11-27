let movies =[]
let watchlist = [];


let id_array = [];
let names_array = [];
let rating_array = [];
let link_array = [];
let tableBody = document.getElementById("li");
let watchListbd = document.getElementById("liC");

let watchCount = 0;

fetch(`https://dummyapi.online/api/movies`)
    .then(response => response.json())
    .then(result => {


        result.forEach(element => {
            movies.push({id:element.id,name:element.movie,rating:element.rating,link:element.imdb_url});
            id_array.push(element.id)
            names_array.push(element.movie);
            rating_array.push(element.rating);
            link_array.push(element.imdb_url);
        });

        console.log(movies);
        refresh();

        console.log(names_array);
        
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: names_array,
                datasets: [{
                    label: '# of rating',
                    data: rating_array,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });




    })
    function refresh(){
        let rowId = 0;
        let listbd = "";
        movies.forEach(element => {
            listbd += `
                <tr id="${++rowId}">
                    <td id="${"t" + rowId}">${element.id}</td>
                    <td id="${"d" + rowId}">${element.name}</td>
                    <td><input type="checkbox" id="${"c" + (rowId)}" onchange="watch(${rowId})"></td>
                </tr>`;
        });
        tableBody.innerHTML=listbd;
    }


    function watch(index){
        console.log(index);
        
        let taskdata = document.getElementById("t" + index).innerText;
        let taskdis = document.getElementById("d" + index).innerText;
    
        watchlist.push({task: taskdata, taskd: taskdis});
        let arindex = index-1; 
        movies.splice(arindex , 1)
        refresh();
        refreshC();
    
        console.log(taskdata);
        
        
    }
    function refreshC(){
        let listbd = "";
        watchlist.forEach(element => {
            listbd += `
                    <tr >
                        <td >${element.task}</td>
                        <td >${element.taskd}</td>
                    </tr>`;
        });
    
        watchListbd.innerHTML = listbd;
    }

function search() {
    console.log("click");

    let movieName = document.getElementById("movieName").value;
    let movies = document.getElementById("movies").value;

    fetch(`https://dummyapi.online/api/movies`)
        .then(response => response.json())
        .then(result => {
            console.log(result);

            result.forEach(element => {
                if (element.movie == movieName) {
                    document.getElementById("movies").innerHTML = `
            <div class="card bg-transparent" style="width: 18rem;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1vo5h3WiC3MkIbCwhHe5aaAUocnEWPZGrQQ&s" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-light">${element.movie}</h5>
                <p class="card-text text-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis tenetur
                    eveniet commodi tempora </p>
                       <p class="card-text text-light">Imdb Rate : ${element.rating}</p>
                <a href="${element.imdb_url}" class="btn btn-primary">Watch Now</a>
            </div>
        </div>`
                }
            });



        })

}

console.log(movies);
refresh();

console.log(names_array);

const ctx1 = document.getElementById('pieChart');

new Chart(ctx1, {
    type: 'pie',
    data: {
        labels:['Horror', 'Action', 'Romance', 'Thriller', 'documentary', 'History'],
        datasets: [{
            label: '# Favorite genres',
            data: [20,28,25,22,8,5],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});




