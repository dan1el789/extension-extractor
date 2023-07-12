
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    createStatisticsForData(manifestsWithPermissions,10,"mostUsedPermissions");
    createStatisticsForData(manifestsWithPermissions.filter(function(item){return item.manifest.permissions.includes("storage")}),10,"mostUsedPermissionsWithStorage");
});

function createStatisticsForData(dataset, limit, canvasId){
    let result = {};
    for(key in dataset){
        for(item in dataset[key].manifest.permissions){
            if(result[dataset[key].manifest.permissions[item]] != undefined){
                result[dataset[key].manifest.permissions[item]]++
            }
            else{
                result[dataset[key].manifest.permissions[item]] = 1
            }
        }
    }

    let labels = [];
    let data = [];
    for(key in result){
        if(result[key] >= limit){
            labels.push(key);
            data.push(result[key])
        }
    }
    createBarChart(labels, data,canvasId, "Number of Extensions using that permission")
}

function createBarChart(labels, data, canvasId, title){
    const ctx = document.getElementById(canvasId);
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
