//business logic

// create the constructor for the contact
var Contact=function(firstName,lastName){
  this.firstName=firstName;
  this.lastName=lastName;
  this.addresses=[];
}
// create the constructor for the addresses

var Address=function (street,city,county) {
  this.street=street;
  this.city=city;
  this.county=county;
}

// create prototype for the full name

Contact.prototype.fullName = function () {
  return this.firstName + " "+ this.lastName;
};

/*
Function that takes in 3 arrays for streets cities counties
loops through them and returns a single array of address objects

*/
function createAddresses(streets,cities,counties){
  var newAddresses=[];
  for (var i = 0; i <= streets.length; i++) {
  var newAddress=new Address(streets[i],cities[i],counties[i]);

  newAddresses.push(newAddress);

  }
  return newAddresses;
}

// User interface logic

$(document).ready(function () {
//array to store contact objects
  var contactsList=[];


  $("#contacts").submit(function(){
    event.preventDefault();
    //arrays to store the address inputs
    var streets=[];
    var cities=[];
    var counties=[];

    var firstname=$("#fname").val();
    var lastname=$("#lname").val();

  // create a new contact object
    var newContact=new Contact(firstname,lastname);
    contactsList.push(newContact);

    //display contacts
    $("#contactList").append("<li>"+newContact.fullName()+"</li>");

    //get streets cities and counties
  $(".street").each(function(){
      streets.push($(this).val())
    });
    $(".city").each(function(){
      cities.push($(this).val())
    });
    $(".county").each(function(){
      counties.push($(this).val())
    });

     newContact.addresses=createAddresses(streets,cities,counties);
// Click functions to display contact details
     $("li").click(function(){
       var index=$("li").index(this);

       var currentContact =contactsList[index];
        currentContact.addresses.forEach(function(address){
          console.log(address.street);
        });

      });



  });
  $("#addAddress").click(function(){
    $("#address").append(
      `
      <h2>Another address</h2>
      <!-- street -->
      <div class="form-group">
          <label for="street">Street</label>
          <input type="text" placeholder="street" class="form-control street" required="">
      </div>
      <!-- city -->
      <div class="form-group">
          <label for="city">City</label>
          <input type="text" placeholder="city" class="form-control city" required="">
      </div>
      <!-- county -->
      <div class="form-group">
          <label for="county">County</label>
          <input type="text" placeholder="county" class="form-control county" required="">
      </div>
      `
    )
  })

});
