let inputs = document.querySelectorAll("input,button");
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keypress", function (e) {
        if (e.which == 13 || e.which == 9) {
            e.preventDefault();
            let nextInput = document.querySelectorAll('[tabIndex="' + (this.tabIndex + 1) + '"]');
            if (nextInput.length === 0) {
                nextInput = document.querySelectorAll('[tabIndex="1"]');
            }
            nextInput[0].focus();
        }
    })
}

function onButtonClick() {
    document.getElementById('customEntry').className = "show";
    document.getElementById('customEntry').focus();
    document.getElementById('customPercent').className = "hide";
    document.getElementById('customPercentLabel').className = "hide";
    document.getElementsByClassName('customPerc').className = "hide";
}

const checkZero = document.getElementById("peopleCount");

checkZero.addEventListener("change", validate);
checkZero.addEventListener("change", getTipAmount);

function validate(e) {
    e.preventDefault();

    const peopleValue = parseInt(document.getElementById("peopleCount").value);
    // console.log(peopleValue);
    // console.log(peopleValue === 0);

    if (peopleValue === 0) {

        const warning = document.getElementById("inputWarning");
        warning.classList.add("visible");
        const warningOutline = document.getElementById("peopleLabel");
        warningOutline.classList.add("visible");
        // peopleValue.classList.add("invalid");
        // warning.setAttribute("aria-hidden", false);
        // peopleValue.setAttribute("aria-invalid", true);
        

    } else {

        const warning = document.getElementById("inputWarning");
        const warningOutline = document.getElementById("peopleLabel");
        warning.classList.remove("visible");
        warningOutline.classList.remove("visible");
        // peopleValue.classList.remove("invalid");
        // warning2.setAttribute("aria-hidden", true);
        // peopleValue.setAttribute("aria-invalid", false);
    }



}









function getTipAmount() {
    
    let amount = document.getElementById("bill_amount").value;
    let peoples = document.getElementById("peopleCount").value;
    console.log(typeof peoples);
    if (parseInt(peoples) === 0) {
        return;
    } else {
    // let selectedPercent = 0;
    //Get a reference to the form id
    let theForm = document.forms["calculator"];
    //Get a reference to the % the user Chooses name="tipPercent":
    let percentClicked = theForm.elements["tipPercent"];
    console.log(percentClicked);
    
    if (percentClicked.value === "on") {
        percentChosen = parseInt(document.getElementById("customEntry").value);
        console.log(percentChosen);

    } else {
        percentChosen = parseInt(theForm.elements["tipPercent"].value);
    }
   
    calcTipAmount = ((percentChosen / 100) * parseFloat(amount)) / peoples;
    total = (calcTipAmount + (parseFloat(amount) / peoples));
    // let percentChosen = parseInt(theForm.elements["tipPercent"].value);


    //Here since there are 4 radio buttons selectedCake.length = 4
    //We loop through each radio buttons
    // for (let i = 0; i < percentChosen.length; i++) {
    //     //if the radio button is checked
    //     if (percentChosen[i].checked) {
    //         //we set cakeSizePrice to the value of the selected radio button
    //         //i.e. if the user choose the 8" cake we set it to 25
    //         //by using the cake_prices array
    //         //We get the selected Items value
    //         //For example cake_prices["Round8".value]"
    //         selectedPercent = tipAmount[percentChosen[i].value];
    //         console.log(selectedPercent);
    //         //If we get a match then we break out of this loop
    //         //No reason to continue if we get a match
    //         break;
    //     }
    // }
    //We return the cakeSizePrice
    
    
    document.getElementById("tipCalc").innerHTML = (calcTipAmount).toFixed(2);
    document.getElementById("totalCalc").innerHTML = (total).toFixed(2);
    }// return calcTipAmount;
}



