document.addEventListener("DOMContentLoaded", (event) => {
    console.log("start drawing statistics")
    createStatisticsForOccurencesOfPermissionInExtensions();
    createSpacing();
    createStatisticsForUsersAllowingPermission();
    createSpacing(500);
    createStatisticsForOccurencesOfPermissionGroupInExtensions();
    createSpacing();
    createStatisticsForUsersAllowingPermissionGroup();   
    createSpacing(500);
    createUpdateStatisticForLastHalfYear();
    createSpacing();
    createUpdateStatisticsForLast10Years();
    
});

function createStatisticsForOccurencesOfPermissionInExtensions(){
    let result = {};
    let dataset = manifestsWithPermissions;
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
        if(result[key] >= 10){
            labels.push(key);
            data.push(result[key])
        }
    }
    createBarChart(labels, data, "Number of Extensions using Permission")
}

function createStatisticsForOccurencesOfPermissionGroupInExtensions(){
    let dataset = manifestsWithPermissions;
    let result = {"URL access":0};
    
    groups.forEach(function(group){
    	result[group.name] = 0;
    })
    
    for(key in dataset){
    	let permissionSet = dataset[key].manifest.permissions;
    	if(containsUrlPattern(permissionSet))
    		result["URL access"]++;
    		
    	groups.forEach(function(group){
    		if(containsGroup(permissionSet,group)){
    			result[group.name]++;
    		}
    	})
    }
    
    let labels = [];
    let data = [];
    for(key in result){
        labels.push(key);
        data.push(result[key])
    }
    createBarChart(labels, data, "Number of Extensions using group of Permission")
}

function createStatisticsForUsersAllowingPermission(){
    let result = {};
    let dataset = manifestsWithPermissions;
    for(key in dataset){
        for(item in dataset[key].manifest.permissions){
            if(result[dataset[key].manifest.permissions[item]] != undefined){
                result[dataset[key].manifest.permissions[item]]+= dataset[key].downloads;
            }
            else{
                result[dataset[key].manifest.permissions[item]] = dataset[key].downloads;
            }
        }
    }
    let labels = [];
    let data = [];
    for(key in result){
        if(result[key] >= 1000000){
            labels.push(key);
            data.push(result[key])
        }
    }
    createBarChart(labels, data, "User Installations with Permission granted")
}

function createStatisticsForUsersAllowingPermissionGroup(){
    let dataset = manifestsWithPermissions;
    let result = {"URL access":0};
    
    groups.forEach(function(group){
    	result[group.name] = 0;
    })
    
    for(key in dataset){
    	let permissionSet = dataset[key].manifest.permissions;
    	if(containsUrlPattern(permissionSet))
    		result["URL access"]+=dataset[key].downloads;
    		
    	groups.forEach(function(group){
    		if(containsGroup(permissionSet,group)){
    			result[group.name]+=dataset[key].downloads;
    		}
    	})
    }
    
    let labels = [];
    let data = [];
    for(key in result){
        labels.push(key);
        data.push(result[key])
    }
    createBarChart(labels, data, "User Installations with Permission Group granted")
}

function createUpdateStatisticForLastHalfYear(){
	let data = []
	let labels = []
	
	for(let i = 1; i < 13; i++){
		data.push(createDateList().filter(date => (date > (new Date()).addDays(-14 * i) && date <= (new Date()).addDays(-14 * (i-1)))).length )		
		labels.push((i-1)*2 + " to " + i*2 + " weeks ago")
	}
	createBarChart(labels, data, "Updates in the last half year")
}

function createUpdateStatisticsForLast10Years(){
    let data = []
	let labels = []
	
	for(let i = 1; i < 10; i++){
		data.push(createDateList().filter(date => (date > (new Date()).addDays(-365 * i) && date <= (new Date()).addDays(-365 * (i-1)))).length )		
		labels.push((i-1) + " to " + i + " year ago")
	}
	console.log(labels)
	console.log(data)
	createBarChart(labels, data, "last Update made")
}
