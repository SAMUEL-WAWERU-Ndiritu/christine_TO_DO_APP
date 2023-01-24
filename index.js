
document.addEventListener("DOMContentLoaded", function() {
    const add_button = document.getElementById('add-button');
    var task_container = document.querySelector('.tasks-container');
    var task_input = document.getElementById('new-task-title');
    var task_description = document.getElementById('new-task-description');
    var task_date = document.getElementById('new-task-date');
    var task_count = 0;
    var task_completed_count = 0;
    var task_late_count = 0;
    var task_ontime_count = 0;

    updateTaskCount();
    eventSetter();
    add_button.addEventListener('click', btn);

    function updateTaskCount(){
        document.getElementById('task-count').innerHTML = task_count;
        document.getElementById('task-completed-count').innerHTML = task_completed_count;
        document.getElementById('task-late-count').innerHTML = task_late_count;
        document.getElementById('task-ontime-count').innerHTML = task_ontime_count;
    }

    function eventSetter(){
        var task_cards = document.getElementsByClassName('task-card'); 
        for(let i=0; i<task_cards.length; i++){
            if(task_cards[i].querySelector('.update'))
                task_cards[i].querySelector('.update').addEventListener('click',updateCard);
            if(task_cards[i].querySelector('.delete'))
                task_cards[i].querySelector('.delete').addEventListener('click',removeCard);
            if(task_cards[i].querySelector('.complete'))
                task_cards[i].querySelector('.complete').addEventListener('click', completeCard);
        }
    }
    function reassignIDs(){
        var task_cards = document.getElementsByClassName('task-card');
        var count=1;
        for(let i=0; i<task_cards.length; i++){
            task_cards[i].setAttribute("id", "t"+(count++));
        }
    }

    function btn(){
        if(task_input.value !== "" && task_description.value !== "" && task_date.value !== ""){
            var task_card = document.createElement('div');
            task_card.setAttribute("class", "task-card uncompleted");
            task_card.setAttribute("id", "t"+(++task_count));
            task_card.innerHTML = `
                <p class="task-title">${task_input.value}</p>
                <p class="task-description">${task_description.value}</p>
                <p class="task-date">Expected completion date: ${task_date.value}</p>
                <div class="task-buttons">
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                    <button class="complete">Complete</button>
                </div>
            `;
            task_container.appendChild(task_card);
            task_input.value = "";
            task_description.value = "";
            task_date.value = "";
            updateTaskCount();
            eventSetter();
        } else {
            alert("Please fill out all fields before adding a task.")
        }
    }

    function updateCard(){
        var card_id = this.parentNode.parentNode.id;
        var task_card = document.getElementById(card_id);
        task_input.value = task_card.querySelector('.task-title').innerHTML;
        task_description.value = task_card.querySelector('.task-description').innerHTML;
        task_date.value = task_card.querySelector('.task-date').innerHTML.substr(29);
        task_card.parentNode.removeChild(task_card);
        reassignIDs();
        updateTaskCount();
    }

    function removeCard(){
        var card_id = this.parentNode.parentNode.id;
        var task_card = document.getElementById(card_id);
        task_card.parentNode.removeChild(task_card);
        reassignIDs();
        updateTaskCount();
    }

    function completeCard(){
        var card_id = this.parentNode.parentNode.id;
        var task_card = document.getElementById(card_id);
        task_card.setAttribute("class", "task-card completed");
        task_completed_count++;
        var task_date_str = task_card.querySelector('.task-date').innerHTML.substr(29);
        var task_date_obj = new Date(task_date_str);
        var current_date = new Date();
        if(current_date > task_date_obj){
            task_late_count++;
            task_ontime_count--;
        } else {
            task_ontime_count++;
        }
        updateTaskCount();
    }
});
