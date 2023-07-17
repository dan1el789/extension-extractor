function createCanvas(title){
    let div = document.createElement("div")
    let canvasId = (Math.random() + 1).toString(36).substring(7);
    div.innerHTML = '<h1>'+title+'</h1><canvas id="'+canvasId+'"></canvas>';
    div.className = "border"
    document.getElementById("statistics").append(div);
    return canvasId;
}

function createBarChart(labels, data, title){
    const ctx = document.getElementById(createCanvas(title));
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

function createSpacing(pixel = 100){
    let div = document.createElement("div")
    div.style = "height: " + pixel + "px"
    document.getElementById("statistics").append(div);
}