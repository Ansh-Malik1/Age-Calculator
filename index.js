const err = document.querySelectorAll(".errorText") 
const dayIp = document.querySelector(".dayIp")
const monthIp  = document.querySelector(".monthIp")
const yearIp  = document.querySelector(".yearIp")
const submit  = document.querySelector(".btn")
const box  = document.querySelectorAll(".error")
const vars = document.querySelectorAll(".var")

let ip = new Date(2004 , 3, 3)
let arr1=[0,2,4,6,7,9,11]
let currentDate= new Date()
let flag=1
let monthFlag=0 //0=>30
let errorText =""



function reset(index){
    box[index].style.cssText = "border: 2px solid hsl(0, 1%, 44%)"
    err[index].classList.remove("active")
    err[index].innerHTML = ''
    box[index].value=""
    
}
function resetAll(){
    flag=1
    reset(0)
    reset(1)
    reset(2)
}
function ageCalc(day,month,year,currentDate){
    month = parseInt(month)-1
    year = parseInt(year)
    day = parseInt(day)
    arr1.forEach(element=>{
        if(currentDate.getMonth()==monthIp.value-1){
            year=currentDate.getFullYear()-year
            day=0
            month=0
        }
        else if(element==month){
            day= 31-day + currentDate.getDate()
            month=Math.abs(month-currentDate.getMonth())-1
            year=currentDate.getFullYear()-year
            
        }
        else{
            day=30-day + currentDate.getDate()
            month=Math.abs(month-currentDate.getMonth())-1
            year=currentDate.getFullYear()-year
           
        }
    })
    if(parseInt(yearIp.value)%4 == 0 && monthIp.value==2){
        day++
    }
    if(day>=30){    
        day=day-30
        month++
    }
    vars[0].innerHTML=year + " "
    vars[1].innerHTML=month+ " "
    vars[2].innerHTML=day+ " "

}
function showError(index , text){
    box[index].style.cssText = "border: 2px solid hsl(0, 100%, 67%,0.7)"
    err[index].innerHTML = text
    err[index].classList.add("active")
    flag=0
}
function checkDate(){
    dateArr=dayIp.value.split('')
    arr1.forEach(e=>{
        if(e==parseInt(monthIp.value)-1){
            monthFlag=1  //31 days month
        }
    })
    if(monthIp.value==2 && parseInt(yearIp.value)%4==0 && parseInt(dayIp.value)>29){
        errorText = "Invalid date"
        showError(0,errorText)
        flag=0
    }
    else if(monthIp.value==2 && parseInt(dayIp.value)>28){
        errorText = "Invalid date"
        showError(0,errorText)
       
    }
    else if((parseInt(dayIp.value)>30 && monthFlag==0) || (monthFlag==1 && parseInt(dayIp.value)>31)){
        errorText = "Invalid date"
        showError(0,errorText)
        
    }
    else if(dayIp.value.charCodeAt(0)< 48 || dayIp.value.charCodeAt(0)>57 || dayIp.value.charCodeAt(1)< 48 || dayIp.value.charCodeAt(1)>57){
        errorText = "Not a number"
        showError(0,errorText)
        
    }
    else if(dayIp.value=='' || dayIp.value.trim().length==0){
        errorText="Empty Date"
        showError(0,errorText)
    }
    
}
function checkMonth(){
    if(monthIp.value=='' || monthIp.value.trim().length==0){
        errorText="Empty Month"
        showError(1,errorText)
    }
    else if(parseInt(monthIp.value)>12){
        errorText="Invalid Month"
        showError(1,errorText)
    }
    for(let i=0 ;i<monthIp.value.length; i++){
        if(monthIp.value.charCodeAt(i)< 48 || monthIp.value.charCodeAt(i)>57){
            errorText = "Not a number"
            showError(1,errorText)
        }
    }
}

function checkYear(){
    if(parseInt(yearIp.value)>currentDate.getFullYear()){
        errorText="Must be in past"
        showError(2,errorText)
    }
    else if(yearIp.value=='' || yearIp.value.trim().length==0){
        errorText="Empty Year"
        showError(2,errorText)
        
    }
    for(let i=0 ;i<yearIp.value.length; i++){
        if(yearIp.value.charCodeAt(i)< 48 || yearIp.value.charCodeAt(i)>57){
            errorText = "Not a number"
            showError(2,errorText)
        }
    }
}

function setYear(){
    flag=1
    yearIp.style.cssText = "border: 2px solid hsl(0, 1%, 44%)"
    err[2].classList.remove("active")
    err[2].innerHTML = ''

}
function setMonth(){
    flag=1
    monthIp.style.cssText = "border: 2px solid hsl(0, 1%, 44%)"
    err[1].classList.remove("active")
    err[1].innerHTML = ''
}
function setDay(){
    flag=1
    dayIp.style.cssText = "border: 2px solid hsl(0, 1%, 44%)"
    err[0].classList.remove("active")
    err[0].innerHTML = ''
}
resetAll()
dayIp.addEventListener("input",setDay)
monthIp.addEventListener("input",setMonth)
yearIp.addEventListener("input",setYear)
submit.addEventListener("click",()=>{
    checkDate()
    checkYear()
    checkMonth()
    if(flag===1){
        ageCalc(dayIp.value,monthIp.value,yearIp.value,currentDate)
    }
})

