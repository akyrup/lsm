
const APIURL = "https://virtserver.swaggerhub.com/i6643/lendSomeMoolah/1.0.0";
var userName;
var role;
//var ObjJqueryAjaxCall=
//{
//    URL: APIURL + "",
//    type: "POST",
//    data: {},
//    success: successFun,
//    error:errorFun
//};

//Start-stateLessLogin
function callStateLessLogin()
{
    var username = doc('username').value;
    var password = doc('password').value;
    var role = "lender";
    if (doc('Lender').checked)
        role = "lender";
    else if (doc('Borrower').checked)
        role = "borrower";
         

    if (isNotEmptyOrNull(username) && isNotEmptyOrNull(password) && isNotEmptyOrNull(role)) {
        var ObjJqueryAjaxCall =
        {

            URL: APIURL + "/stateLessLogin",
            type: "POST",
            contentType: "text/html",
            data: '{"username" : "'+username+'","role" : "'+role+'","password" : "'+password+'"}',
            dataType: 'json',
            success: successStateLessLogin,
            error: errorStateLessLogin
        };
        lStoreObj.Add("username", username);
        lStoreObj.Add("role", role);
        CallJqueryAjax(ObjJqueryAjaxCall);
    }
}

function successStateLessLogin(data, status, xhr)
{
    log('status: ' + status + ', data: ' + data);
    //lStoreObj.Add("")    
    window.location.href = "/home/Loans";
}
function errorStateLessLogin(jqXhr, textStatus, errorMessage)
{
    log('Error' + errorMessage);      
    window.location.href = "/home/Loans";
}
//End-stateLessLogin


//Start-loans
function callLoans() {   
    showUserName();
    if (isNotEmptyOrNull(userName)) {
        var ObjJqueryAjaxCall =
        {
            URL: APIURL + "/loans/" + userName,
            type: "GET",
            contentType: 'text/html',
            //data: '',
            dataType: 'json',
            success: successLoans,
            error: errorLoans
        };
        CallJqueryAjax(ObjJqueryAjaxCall);
    }
    else {
        if (!isNotEmptyOrNull(userName))
            window.location.href = "login";
        else {
            //show error
        }
    }
}

function successLoans(data, status, xhr) {
    log('status: ' + status + ', data: ' + data);
    log(data);

    var tr;
    for (var i = 0; i < data.length; i++) {
        //tr = $('<tr/>').addClass("bluecolor");
        if (data[i].loanStatus == "funded")
            tr = $('<tr/>').addClass("greencolor");
        else if (data[i].loanId==userName)
            tr = $('<tr/>').addClass("bluecolor");
        else
            tr = $('<tr/>');
        tr.append("<td>" + data[i].loanId + "</td>");
        tr.append("<td>" + data[i].loanName + "</td>");
        tr.append("<td>" + data[i].loanAmount + "</td>");
        tr.append("<td>" + data[i].loanStatus + "</td>");
        tr.append("<td>" + data[i].createdAt + "</td>");
        tr.append("<td>" + data[i].requestedAt + "</td>");
        tr.append("<td>" + data[i].fundedAt + "</td>");
        //Approve-Green color
        //some other lender-blue color
        if (data[i].loanStatus == "pending")
            tr.append("<td><a href='FundLoan?loanId=" + data[i].loanId + "&fundedBy="+userName+"'>Approve</td>");
        else tr.append("<td></td>");
        $('#tblLoans').append(tr);
    }
}
function errorLoans(jqXhr, textStatus, errorMessage) {
    log('Error' + errorMessage);
}
//End-loans


//Start-fundLoan
function callFundLoan() {
    showUserName();
    if (role == 'lender') {
        var loanId = doc('loanId').value;;
        var fundedBy = doc('fundedBy').value;;
        if (isNotEmptyOrNull(userName) && isNotEmptyOrNull(loanId) && isNotEmptyOrNull(fundedBy)) {
            var ObjJqueryAjaxCall =
            {
                URL: APIURL + "/fundLoan",
                type: "POST",
                data: {
                    "loanId": loanId,
                    "fundedBy": fundedBy//"string"
                },
                dataType: 'json',
                success: successFundLoan,
                error: errorFundLoan
            };
            CallJqueryAjax(ObjJqueryAjaxCall);
        }
        else {
            if (!isNotEmptyOrNull(userName))
                window.location.href = "login";
            else {
                //show error
            }
        }
    }
    else
    {
        logout();
    }
}

function successFundLoan(data, status, xhr) {
    log('status: ' + status + ', data: ' + data);
    log(data);
    
    var tr;
    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + data[i].loanId + "</td>");
        tr.append("<td>" + data[i].loanName + "</td>");
        tr.append("<td>" + data[i].loanAmount + "</td>");
        tr.append("<td>" + data[i].loanStatus + "</td>");
        tr.append("<td>" + data[i].createdAt + "</td>");
        tr.append("<td>" + data[i].requestedAt + "</td>");
        tr.append("<td>" + data[i].fundedAt + "</td>");        
        $('#tblFundLoan').append(tr);
    }
}
function errorFundLoan(jqXhr, textStatus, errorMessage) {
    log('Error' + errorMessage);
}
//End-fundLoan
//Start-requestLoan
function callRequestLoan() {

    showUserName();
    if (role != 'borrower')
        logout();
    else {
        var loanName = doc('loanName').value;
        var loanAmount = doc('loanAmount').value;
        if (isNotEmptyOrNull(userName) && isNotEmptyOrNull(loanName) && isNotEmptyOrNull(loanAmount)) {
            var ObjJqueryAjaxCall =
            {
                URL: APIURL + "/requestLoan",
                type: "POST",
                contentType: 'text/html',
                data: {
                    "loanName": loanName,//"string",
                    "loanAmount": loanAmount,
                    "requestedBy": userName//"string"
                },
                dataType: 'json',
                success: successRequestLoan,
                error: errorRequestLoan
            };
            CallJqueryAjax(ObjJqueryAjaxCall);
        }
        else {
            if (!isNotEmptyOrNull(userName))
                window.location.href = "login";
            else {
                //show error
            }
        }
    }
}

function successRequestLoan(data, status, xhr) {
    log('status: ' + status + ', data: ' + data);
    log(data);
    doc('tblShowRequestLoan').style.display = 'block';
    doc('tblAddRequestLoan').style.display = 'none';
    doc('msg').innerHTML = 'Requested successfully! ';
    
    var tr;
    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + data[i].loanId + "</td>");
        tr.append("<td>" + data[i].loanName + "</td>");
        tr.append("<td>" + data[i].loanAmount + "</td>");
        tr.append("<td>" + data[i].loanStatus + "</td>");
        tr.append("<td>" + data[i].createdAt + "</td>");
        tr.append("<td>" + data[i].requestedAt + "</td>");
        tr.append("<td>" + data[i].fundedAt + "</td>");
        $('#tblShowRequestLoan').append(tr);
    }
}
function errorRequestLoan(jqXhr, textStatus, errorMessage) {
    log('Error' + errorMessage);
    
}
//End-fundLoan

//$ajax 
function CallJqueryAjax(ObjJqueryAjaxCall)
{
    $.ajax(ObjJqueryAjaxCall.URL, {//'/jquery/submitData', {
        type: ObjJqueryAjaxCall.type,//'POST',  // http method
        contentType: ObjJqueryAjaxCall.contentType,//"application/json",
        data:ObjJqueryAjaxCall.data,// { myData: 'This is my data.' },  // data to submit
        dataType: ObjJqueryAjaxCall.dataType,// 'json',
        success: ObjJqueryAjaxCall.success,// function (data, status, xhr) { $('p').append('status: ' + status + ', data: ' + data);  },
        error: ObjJqueryAjaxCall.error,// function (jqXhr, textStatus, errorMessage) { $('p').append('Error' + errorMessage); }
    });
}

function logout()
{
    lStoreObj.ClearAll();
    setMenu();
}
function showUserName() {
    userName = lStoreObj.Read('username');
    role = lStoreObj.Read('role');
    doc('spUserName').innerHTML = userName + '(' + role + ')';
}
function setMenu()
{
    var menu = doc('dvMenuBar');
   
    if (isNotEmptyOrNull(lStoreObj.Read('username'))) {
        menu.style.display = 'block';
        if (role != 'borrower')
            doc('liborrower').style.display = 'none';
        showUserName();
    }
    else
    {
        menu.style.display = 'none';
        if (window.location.pathname != "/home/login" && window.location.pathname != "/login" && window.location.pathname != "/") {
            window.location.href = "login";
        }
    }
}
function numberOnly(event) {
    

        if(event.shiftKey && ((event.keyCode >=48 && event.keyCode <=57) 
                || (event.keyCode >=186 &&  event.keyCode <=222))){
            // Ensure that it is a number and stop the Special chars
            event.preventDefault();
        }
        else if ((event.shiftKey || event.ctrlKey) && (event.keyCode > 34 && event.keyCode < 40)){     
            // let it happen, don't do anything
        }      
        else{
            // Allow only backspace , delete, numbers               
            if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 39 ||event.keyCode == 37 
                    || (event.keyCode >=48 && event.keyCode <=57)) {
                // let it happen, don't do anything
            }
            else {
                // Ensure that it is a number and stop the key press
                event.preventDefault();                   
            }
        }
   
}
function doc(id) {
    return document.getElementById(id);
}
function isNotEmptyOrNull(val)
{
    if (val != undefined && val.trim() != '')
        return true
    else return false;
}
function log(val) {
    console.log(val);
}
var lStoreObj = {
    Add:function(key,value){
        window.localStorage.setItem(key, value);
    },
    Read: function (key) {
        return window.localStorage.getItem(key);
    },
    Clear:function(key){
        window.localStorage.removeItem(key);
    },
    ClearAll: function () {
        window.localStorage.clear();
    }
}


