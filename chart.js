
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    loadData();
});

async function loadData(){
    let request = await fetch("https://dan1el789.github.io/extension-extractor/manifests.json");
    let response = await request.json();

    let result = {};
    
    for(key in response){
        if(!response[key].error){
            if(response[key].manifest.permissions != undefined){
                for(item in response[key].manifest.permissions){
                    if(result[response[key].manifest.permissions[item]] != undefined){
                        result[response[key].manifest.permissions[item]]++
                    }
                    else{
                        result[response[key].manifest.permissions[item]] = 1
                    }
                }
            }
        } 
    }

    console.log(result)
    labels = [];
    data = [];
    for(key in result){
        if(result[key] >= 10){
            labels.push(key);
            data.push(result[key])
        }
    }
    console.log(labels)
    console.log(data)
    createBarChart(labels, data, "Amount of Extensions using that Permission")
}

function createBarChart(labels, data, title){
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: labels,
        datasets: [{
            label: title,
            data: data,
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
}
