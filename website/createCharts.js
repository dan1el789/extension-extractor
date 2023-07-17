document.addEventListener("DOMContentLoaded", (event) => {
    console.log("start drawing statistics")
    createStatisticsForOccurencesOfPermissionInExtensions();
    createSpacing()
    createStatisticsForUsersAllowingPermission();
    createSpacing(500)
    createStatisticsForOccurencesOfPermissionGroupInExtensions();
    createSpacing()
    createStatisticsForUsersAllowingPermissionGroup();   
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