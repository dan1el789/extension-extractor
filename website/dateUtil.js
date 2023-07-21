function parseDate(dateString){
    dateString = dateString.split('(')[1].replaceAll(')','')
    let day = dateString.split(" ")[0].replace(".", "");
    let month = ["Jan.", "Feb.", "März", "Apr.", "Mai", 
        "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."]
        .lastIndexOf(dateString.split(" ")[1]) + 1;
    let year = dateString.split(" ")[2];

    return new Date(Date.parse(year + "-" + month + "-" + day));
}

function createDateList(){
    let dates = [];
    dates.push()
    manifests
        .filter(manifest => manifest.lastUpdate)
        .forEach(manifest => dates
            .push(parseDate(manifest.lastUpdate))
        )
    dates.sort((a,b) => a.valueOf() < b.valueOf())
    return dates;
}
