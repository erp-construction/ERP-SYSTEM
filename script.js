$(document).ready(function() {
  
  var animating = false,
      submitPhase1 = 1100,
      submitPhase2 = 400,
      logoutPhase1 = 800,
      $login = $(".login"),
      $app = $(".app");
  
  function ripple(elem, e) {
    $(".ripple").remove();
    var elTop = elem.offset().top,
        elLeft = elem.offset().left,
        x = e.pageX - elLeft,
        y = e.pageY - elTop;
    var $ripple = $("<div class='ripple'></div>");
    $ripple.css({top: y, left: x});
    elem.append($ripple);
  };
  
  $(document).on("click", ".login__submit", function(e) {
    if (animating) return;
    animating = true;
    var that = this;
    ripple($(that), e);
    $(that).addClass("processing");
    setTimeout(function() {
      $(that).addClass("success");
      setTimeout(function() {
        $app.show();
        $app.css("top");
        $app.addClass("active");
      }, submitPhase2 - 70);
      setTimeout(function() {
        $login.hide();
        $login.addClass("inactive");
        animating = false;
        $(that).removeClass("success processing");
      }, submitPhase2);
    }, submitPhase1);
  });
  
  $(document).on("click", ".app__logout", function(e) {
    if (animating) return;
    $(".ripple").remove();
    animating = true;
    var that = this;
    $(that).addClass("clicked");
    setTimeout(function() {
      $app.removeClass("active");
      $login.show();
      $login.css("top");
      $login.removeClass("inactive");
    }, logoutPhase1 - 120);
    setTimeout(function() {
      $app.hide();
      animating = false;
      $(that).removeClass("clicked");
    }, logoutPhase1);
  });
  
});
var myApp = angular.module("myApp", []);
myApp.service("ContactService" , function(){
  var uid = 1;
  var contacts = [{id : 0,
           'name' : 'Tom',
           'email' : 'tom@gmail.com',
           'phone' : '911-91-199-999'}];
  
  
  // Save Service for sving new contact and saving existing edited contact.
  this.save = function(contact)  
  {
    if(contact.id == null)                       
    {
      contact.id = uid++;
      contacts.push(contact);
    }
    else
    {
      for(i in contacts)
      {
        if(contacts[i].id == contact.id)
        {
          contacts[i] = contact;
        }
      }
    }
  }
  
  // serach for a contact
  
  this.get = function(id)
  {
    for(i in contacts )
    {
      if( contacts[i].id == id)
      {
        return contacts[i];
      }
    }
  }
  
  //Delete a contact
  this.delete = function(id)
  {
    for(i in contacts)
      {
        if(contacts[i].id == id)
        {
          contacts.splice(i,1);
        }
      }
  }
  
  //Show all contacts
  this.list = function()
  {
    return contacts;
  }   
});


////Controller area .....
  
myApp.controller("ContactController" , function($scope , ContactService){

    $scope.contacts = ContactService.list();
    
    $scope.saveContact = function()
    {
      ContactService.save($scope.newcontact);
      $scope.newcontact = {};
    }
    
    
    $scope.delete = function(id)
    {
      ContactService.delete(id);
      if($scope.newcontact.id == id)
        {
          $scope.newcontact = {};
        }
    }
    
    $scope.edit = function(id)
    {
      $scope.newcontact = angular.copy(ContactService.get(id));
    }

});
var app = angular.module('app', []);

app.controller('main',function($scope){
  $scope.total = 15000;
  $scope.addRoom ="";
  $scope.addBudget ="";
  $scope.emailAddress ="";
  
  $scope.rooms = [
  { room: 'Living Room', budget: 4550 },
  { room: 'Master Bedroom', budget: 2795 },
  { room: 'Office', budget: 1300 },
  { room: 'Guest Room', budget: 100 },
  { room: 'Dining Room', budget: 700 },
  { room: 'Outdoors', budget: 1000 },
  { room: 'Laundry Room', budget: 1000 },
  { room: 'Misc', budget: 500 },
  { room: 'kitchen', budget: 3000 }
];
  
  $scope.test = function(){
    var budget = $scope.total;
    for(var index in $scope.rooms){
       budget -= $scope.rooms[index].budget; 
    }
    return budget;
};
  
  $scope.delete = function(index){
    $scope.rooms.splice(index, 1);
  }
  
  $scope.add = function()
  {
    $scope.rooms.push({room: $scope.addRoom, budget:$scope.addBudget});
    $scope.addRoom ="";
    $scope.addBudget ="";
  }
  
  $scope.email = function()
  {
    var data = ""
        for(var index in $scope.rooms){
       data += $scope.rooms[index].room +': $'+$scope.rooms[index].budget + '.\r\n  '; 
    }
    
    window.open('mailto:'+ $scope.emailAddress +'?subject=Finance&body='+data);
  }
  
});
var table = $('#timesheet')
var tableBody = $("#tsdata")
var counter = 1;
var modal = $("#activityModal")
var form = $('#activityForm');
var submitBtn = $("modalSubmit");
var editFlag = false;

// Container binding for dynamically added edit row buttons.
$("#timesheet").on('click', '.editRow', function(){
  var id = this.attributes.id.value.match(/[0-9]/g)[0];
  var selector = '#row-' + id;
  var row = $(selector);
  var rowData = serializeRow(row);
  // Prefill the modal form with current data
  var inputs = form.find('.form-control');
  $.each(inputs, function(i, val){
    inputs[i].value = rowData[i];
  });
  editFlag = id;
  modal.modal('show');
});

// Container binding for dynamically added delete row buttons.
$("#timesheet").on('click', '.delRow', function(){
  var id = this.attributes.id.value.match(/[0-9]/g)[0];
  var selector = '#row-' + id;
  $(selector).remove();
});

// Function to add a row to the table using modal form data
var addRow = function(formData){
  var html = "<tr id=\"row-" + (counter) + "\">";
  for(var i = 0; i < formData.length; i++){
    html += "<td>"+formData[i].value+"</td>";
  }
  html += "<td><button id=\"edit-" + counter + "\" class=\"btn editRow btn-primary btn-sm\"><span class=\"glyphicon glyphicon-pencil\"></span></button> <button id=\"delete-" + counter + "\" class=\"btn delRow btn-danger btn-sm\"><span class=\"glyphicon glyphicon-remove\"</span></button></td>"
  html += "</tr>";
  
  // Update selectors and increment counter
  counter++;
  tableBody.append(html);
}

// Submission of activity via modal
form.on('submit',function(event){
  event.preventDefault();
  var formData = form.serializeArray();
  // If the edit flag is set, change a row instead of adding.
  if(editFlag){
    var selector = '#row-' + editFlag;
    var row = $(selector);
    var cells = row.find('td');
    for(var i = 0; i < (cells.length) - 1; i++){
      cells[i].firstChild.data = formData[i].value;
    }
    editFlag = false;
  }
  else{
    addRow(formData);
  }
  form.trigger('reset');
  modal.modal('hide');
});

// Serializes a table into an object using headers as object properties.
var serializeTable = function(table){
  var TableObj = {};
  var headers = table.find('th');
  var rows = table.find('tbody').find('tr');
  for(var i = 0; i < rows.length; i++){
    TableObj[i] = {};
    // Subtract 1 from headers.length because of the hidden button       column.
    for(var j = 0; j < (headers.length)-1; j++){ 
      TableObj[i][headers[j].firstChild.data] = rows.children()[j].firstChild.data;
    }
  }
  return TableObj;
}

// Serialize a single row into an array
var serializeRow = function(row){
  var cells = row.find('td');
  var data = [];
  for(var i = 0; i < (cells.length)-1; i++){
    data.push(cells[i].firstChild.data);
  }
  return data;
}

//Set close button to turn off edit flag.
$('#modalClose').on('click', function(){
  editFlag = false;
  form.trigger('reset');
})