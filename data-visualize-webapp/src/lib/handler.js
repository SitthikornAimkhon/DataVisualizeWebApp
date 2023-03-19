
export function handleFindAccidentOnRoad(array){
    const formatedData = array.reduce((obj, road)=>{

        obj.roadNames.push(road.name);
        obj.counts.push(road.count);
        return obj;
    },{roadNames:[], counts:[]});

    return formatedData
}

export function handleFetchDeadStat(obj) {
    const formatedData = {
        total: obj.total_dead,
        man: obj.total_man,
        female: obj.total_female
    }

    return formatedData;
}

export function handleFetchInjureStat(obj) {
    const formatedData = {
        total: obj.total_injure,
        man: obj.total_man,
        female: obj.total_female
    }
    return formatedData;
}

export function handleFindAccidentFreq(obj) {
    console.log('obj',obj)
    const formatedData = obj.reduce((obj, d)=>{
        obj.times.push(d.time);
        obj.counts.push(d.count);
        return obj;
    },{times: [], counts: []});
console.log(formatedData)
    return formatedData;
}
