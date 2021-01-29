//Vars
var firstName = document.getElementById('firstname');
var lastName = document.getElementById('lastname');
var email = document.getElementById('email');
var submit = document.getElementById('submit');
var table = document.getElementById('table');
var btnContainer = document.getElementById('btn-container');

var data = [];
var users = [];

//submit Event
submit.addEventListener('click', function() {

    if (validator()) {
        return;
    }

    users.push(getValues());

    insertToUi();
    resetForm();

    //console.log(users)
})

//Get Values
function getValues() {
    data = {
        'firstName': firstName.value,
        'lastName': lastName.value,
        'email': email.value,
    }

    return data;
}

//Insert to UI
function insertToUi() {

    var number = 1;
    table.innerHTML = '';
    users.forEach(user => {
        
        table.insertAdjacentHTML('beforeend' , '<tr><th scope="row">'
        + number +'<td>'+ user.firstName +'</td/><td>'
        + user.lastName +'<td>'+ user.email +'</td>'
        +'<td><button class="edit btn btn-outline-warning btn-sm me-3 ps-3 pe-3" id="'+ (number-1) +'">Edit</button><button class="delete btn btn-outline-danger btn-sm" id="'+ (number-1) +'">Delete</button></td></tr>');


        number++;
    });

    deleteRow();
    editRow();

}

//Reset Form
function resetForm() {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
}

//Delete Row
function deleteRow() {
    var delete_btns = document.querySelectorAll('.delete');

    delete_btns.forEach(delete_btn => {
        delete_btn.addEventListener('click', function() {
            users.splice(delete_btn.id, 1);
            insertToUi();
        })
    })
}

//Edit Row
function editRow() {
    var edits = document.querySelectorAll('.edit');

    edits.forEach(edit => {
        
        edit.addEventListener('click', function() {

            
            firstName.value= users[edit.id].firstName;
            lastName.value= users[edit.id].lastName;
            email.value = users[edit.id].email;

            submit.style.display = 'none'

            btnContainer.insertAdjacentHTML('beforeend', '<button class="edit btn btn-warning ps-4 pe-4" id="'+ edit.id +'" type="button">Edit</button>');


            var edit_btn = document.querySelector('.edit');
            edit_btn.addEventListener('click', function() {
                users[edit_btn.id].firstName = firstName.value;
                users[edit_btn.id].lastName = lastName.value;
                users[edit_btn.id].email = email.value;

                insertToUi();
                resetForm();

                document.querySelector('.edit').remove();
                submit.style.display = 'block'
            })

        })
})
}

//Validate 
function validator() {
    var firstname_error = document.getElementById('firstname_error');
    var lastname_error = document.getElementById('lastname_error');
    var email_error = document.getElementById('email_error');
    var err = false;

    if (firstName.value == '' || firstName.value.length < 2) {
        firstname_error.innerText = 'Please enter your first name';
        err = true;
    }else {
        firstname_error.innerText = '';
    }

    if (lastName.value == '' || lastName.value.length < 2) {
        lastname_error.innerText = 'Please enter your last name';
        err = true;
    }else {
        lastname_error.innerText = '';
    }

    

    var newEmail = email.value;
    var emailfinder = users.find(({email}) => email === newEmail);
        if (emailfinder){
            email_error.innerText = 'this email address is already registered';
            err = true;
        }else if (email.value == '' || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value)) {
                email_error.innerText = 'Please enter a validate email';
                err = true;
        } else {
        
            email_error.innerText = '';
        }

    return err;
    

}

var allInputs = document.querySelectorAll('.form-control');
allInputs.forEach(input => {
    input.addEventListener('keyup', function() {
        validator()
    })
});