import { handleFetchDeadStat, handleFetchInjureStat, handleFindAccidentOnRoad, handleFindAccidentFreq } from './handler';

export async function fetchDeadStat(year='', road=''){
    try{
        const res = await fetch('http://localhost:3001/deads/stat?' + new URLSearchParams({
            searchYear: year,
            expresswayName: road,
        }));
        const json = await res.json();
        const formatedData = handleFetchDeadStat(json);

        return formatedData;
    }catch(e){
        console.error(e);
        return {total: 0, man: 0, female: 0};
    }
}

export async function fetchInjureStat(year='', road=''){
    try{
        const res = await fetch('http://localhost:3001/injures/stat?' + new URLSearchParams({
            searchYear: year,
            expresswayName: road,
        }));
        const json = await res.json();
        const formatedData = handleFetchInjureStat(json);

        return formatedData;
    }catch(e){
        console.error(e);
        return {total: 0, man: 0, female: 0};
    }
}

export async function fetchWeatherStat(year='', road=''){
    try{
        const res = await fetch('http://localhost:3001/weathers/stat?' + new URLSearchParams({
            searchYear: year,
            expresswayName: road,
        }));
        const json = await res.json();
        return json;
    }catch(e){
        console.error(e);
        return {total: 0, normal: 0, abnormal: 0};
    }
}

export async function fetchYearAvailable(){
    try{
        const res = await fetch('http://localhost:3001/years');
        const json = await res.json();
        return json;
    }catch(e){
        console.error(e);
        return [];
    }
}

export async function fetchRoadAvailable(){
    try{
        const res = await fetch('http://localhost:3001/roads');
        const json = await res.json();
        return json;
    }catch(e){
        console.error(e);
        return [];
    }
}

export async function findAccidentOnRoad(year='', road=''){
    try{
        const res = await fetch('http://localhost:3001/roads/count?' + new URLSearchParams({
            searchYear: year,
            expresswayName: road,
        }));
        
        const json = await res.json();
        const formatedData = handleFindAccidentOnRoad(json);
        return formatedData;
    }catch(e){
        console.error(e);
        return {roadNames:[], counts:[]};
    }
}

export async function findAccidentFreq(year='', road=''){
    try{
        const res = await fetch('http://localhost:3001/freq-time?' + new URLSearchParams({
            searchYear: year,
            expresswayName: road,
        }));
        
        const json = await res.json();
        const formatedData = handleFindAccidentFreq(json);
        return formatedData;
    }catch(e){
        console.error(e);
        return [];
    }
}