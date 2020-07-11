var firebaseConfig = {
    apiKey: "AIzaSyA3G663XeMK0s5NMkop4KUst9TJZ_wYacs",
    authDomain: "crud-task-45ae3.firebaseapp.com",
    databaseURL: "https://crud-task-45ae3.firebaseio.com",
    projectId: "crud-task-45ae3",
    storageBucket: "crud-task-45ae3.appspot.com",
    messagingSenderId: "754588133145",
    appId: "1:754588133145:web:9fba6adea644c1e27bc788",
    measurementId: "G-HCHBTGWDDV"


  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var d = new Date();
  var t = d.getTime();
  var counter = t;

  document.getElementById("form2").addEventListener("submit",(e)=>{
    var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
    e.preventDefault();
    createTask(task,description);
    form2.reset();
 });

  function createTask(taskName,description){
    console.log(counter);
    counter+=1;
    console.log(counter);
    var task ={
      task:taskName,
      id:counter,
      description: description
    }
    let db = firebase.database().ref("tasks/"+counter);
    db.set(task);
    document.getElementById("cardSection").innerHTML='';
    readTask();
  }

  function readTask(){
    var task = firebase.database().ref("tasks/");
    task.on("child_added",function(data){
      var taskValue = data.val();
      console.log(taskValue);
      document.getElementById("cardSection").innerHTML+=`
      <div class="card mb-3" >
      <div class="card-body" >
      <h5 class="card-title">${taskValue.task}</h5>
      <p class="card-text">${taskValue.description}</p>
      <button type="submit" style="color:white" class="btn btn-dark"
      onclick="updateTask(${taskValue.id},'${taskValue.task}','${taskValue.description}')"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Task</button>
      
      <button type="submit" class="btn btn-danger" onclick="deleteTask(${taskValue.id})"><i class="fa fa-trash" aria-hidden="true"></i> Delete Task</button>

      </div>
 </div>
      `   
    });
  }

  function reset(){
    document.getElementById("firstSection").innerHTML=`

<form class="border p-4 mb-4" id="form2">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="task">TASK</label>
                    <input type="text" class="form-control" name="task" id="task" placeholder="Task">
                </div>
                
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="description">DESCRIPTION</label>
                    <input type="description" class="form-control" name="description" id="description" placeholder="Description">
                    <br>
                    <button type="submit" name="sub1"  id="sub1" class="btn btn-primary">Add</button> 

                    <button style="display: none;"  id="button2" class="btn btn-success">Update Task</button> 

                    <button style="display: none;"  id="button3" class="btn btn-danger">Cancel</button> 
                  </div>
                </div>    
              </div>
            </form>
    `;

  document.getElementById("form2").addEventListener("submit",(e)=>{
    var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
    e.preventDefault();
    createTask(task,description);
    form2.reset();
 });
}

function updateTask(id,name,description){
  document.getElementById("firstSection").innerHTML=`
<form class="border p-4 mb-4" id="form2">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="task">TASK</label>
                    <input type="text" class="form-control" name="task" id="task" placeholder="Task">
                </div>
                
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="description">DESCRIPTION</label>
                    <input type="description" class="form-control" name="description" id="description" placeholder="Description">
                    <br>
                    <button type="submit" name="sub1"  id="sub1" class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i> Add</button> 

                    <button type="submit" style="display: inline-block;"  id="button2" class="btn btn-success"><i class="fa fa-pencil" aria-hidden="true"></i> Update</button> 

                    <button style="display:inline-block;"  id="button3" class="btn btn-danger"><i class="fa fa-ban" aria-hidden="true"></i> Cancel</button> 
                  </div>
                </div>    
              </div>
            </form>
  `;
  document.getElementById("form2").addEventListener("submit",(e)=>{
    e.preventDefault();
  });
  document.getElementById("button3").addEventListener("click",(e)=>{
reset();
  });
  document.getElementById("button2").addEventListener("click",(e)=>{
updateTask2(id,document.getElementById("task").value,document.getElementById("description").value);
  });
  document.getElementById("task").value=name;
  document.getElementById("description").value=description;
}

function updateTask2(id,name,description){
  var taskUpdated={
    task:name,
    id:id,
    description:description
  }
  let db = firebase.database().ref("tasks/"+id);
  db.set(taskUpdated);

  document.getElementById("cardSection").innerHTML='';
  readTask();
  reset();

}
function deleteTask(id){
  var task= firebase.database().ref("tasks/"+id);
  task.remove();
  reset();
  document.getElementById("cardSection").innerHTML='';
  readTask();
}