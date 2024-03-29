// ตั้งค่าโครง Elements 
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// ปุ่มเช็ค
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// ตัวแปร
let LIST, id;

// ดึงข้อมูล
let data = localStorage.getItem("TODO");

// เช็คในกรณีที่มีข้อมูล
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; 
    loadList(LIST); 
}else{
    LIST = [];
    id = 0;
}

// แสดงข้อมูลให้ user
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// ล้างข้อมูล
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// ตั้งค่าวันที่
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("th-TH", options);

// ฟังค์ชั่น addToDo (ไว้ใส่กิจกรรมลงไป)

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// ตั้งค่า input ให้กด Enter ในการส่งข้อมูล
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


// ตั้งค่าตัวเช็คกิจกรรม
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// ตั้งค่าปุ่มลบกิจกรรม
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// ตั้งค่า target
list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value; 
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


















