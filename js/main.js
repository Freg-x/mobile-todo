var cur_id = 0;
var is_hidden = 0;


function update() {
  model.flush();

  var data = model.data;
  var items = model.data.items;
  var todo_list = document.getElementById("todo_list");
  var main_input = document.getElementById("main_input");

  /*recover items*/

  todo_list.innerHTML = '';
  items.forEach(function(cur_item, index) {

    var item = document.createElement('li');
    item.innerHTML = cur_item.msg + "<i class= \"fa fa-trash del_button\" aria-hidden=\"true\"></i>";
    item.classList.add('item');
    if(cur_item.completed)item.classList.add('completed');
    else item.classList.remove('completed');

    var id = 'item'+cur_id++;
    item.setAttribute('id',id);

    var del_button = item.querySelector('.del_button');
    del_button.addEventListener('touchstart', function() {
      items.splice(index, 1);
      update();
    });

    todo_list.insertBefore(item, todo_list.firstChild);

    $('#'+id).on('swiperight',function(){
    if(cur_item.completed){
      cur_item.completed=false;

    }
    else{
      cur_item.completed=true;
    }

    update();

    });

    $('#'+id).on('taphold',function(){
      var edit=document.createElement('input');
      this.appendChild(edit);
      edit.classList.add('edit');
      edit.focus();
      edit.value=cur_item.msg;

      edit.addEventListener('keyup',function(ev){
        if(ev.keyCode!=13)return;
        else if(edit.value=='')edit.remove();
        else {
          items[index].msg=edit.value;
          edit.remove();
        }
        update();
      });

      edit.addEventListener('blur',function(){

      if(edit.value=='')edit.remove();
        else {
          items[index].msg=edit.value;
          edit.remove();
        }
        update();
      });














    });



  });









}








window.onload = function() {
  model.init(function() {


      var main_input = document.getElementById('main_input');
      var data = model.data;
      var show_all = document.getElementById('show_all');
      var todo_list = document.getElementById('todo_list');
      var clear=document.getElementById('clear');
      var all_done=document.getElementById('all_done');
      var all_active=document.getElementById('all_active');
      var clear_done=document.getElementById('clear_done');

      main_input.value = data.msg;
      console.log(data.msg);

      main_input.addEventListener('keyup', function() {
        data.msg = main_input.value;
        model.flush();
      });

      main_input.addEventListener('keyup', function(ev) {
        if (ev.keyCode != 13) return;
        else if(data.msg!=''){
          data.items.push({
            msg: data.msg,
            completed: false
          });
          main_input.value = '';
          data.msg = '';
        }
        update();
      });

      show_all.addEventListener('touchstart', function() {
        if (!is_hidden) {
          todo_list.classList.add('hide');
          show_all.innerHTML = "<i class=\"fa fa-caret-right\" aria-hidden=\"true\" ></i>";
          is_hidden = 1;
        } else {
          todo_list.classList.remove('hide');
          show_all.innerHTML = "<i class=\"fa fa-caret-down\" aria-hidden=\"true\" ></i>";
          is_hidden = 0;
        }
      });

      clear.addEventListener('touchstart',function(){
        clear.style.backgroundColor='rgb(162, 216, 255)';
        window.localStorage.clear();
        todo_list.innerHTML='';
        main_input.value='';
      });

      clear.addEventListener('touchend',function(){
        clear.style.backgroundColor='rgb(17, 117, 209)';
      });


      all_done.addEventListener('touchstart',function(){
      all_done.style.backgroundColor='rgb(171, 255, 170)';
      for(var i=0;i<data.items.length;i++){
        data.items[i].completed=true;
        update();
      }

      });

      all_done.addEventListener('touchend',function(){
      all_done.style.backgroundColor='rgb(90, 209, 18)';
      }

      );

      all_active.addEventListener('touchstart',function(){
      all_active.style.backgroundColor='rgb(255, 208, 117)';
      for(var i=0;i<data.items.length;i++){
        data.items[i].completed=false;
        update();
      }

      });

      all_active.addEventListener('touchend',function(){
      all_active.style.backgroundColor='rgb(230, 155, 28)';
      }

      );

      clear_done.addEventListener('touchstart',function(){
      clear_done.style.backgroundColor='rgb(179, 253, 255)';
      for(var i=0;i<data.items.length;i++){
        if(data.items[i].completed==true)data.items.splice(i--,1);
        model.flush();
        update();
      }

      });

      clear_done.addEventListener('touchend',function(){
      clear_done.style.backgroundColor='rgb(0, 193, 141)';
      }

      );


      update();

    }



  );


};
