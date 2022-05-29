//-----------------------------------------------------------
//Tab through selections through Reset
let inputs = document.querySelectorAll("input,tipPercent");

for (let i = this.tabIndex; i < inputs.length; i++) {

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
//-----------------------------------------------------------

//-----------------------------------------------------------
//Toggle custom percent from label to entry field
function onCustomClick() {

    document.getElementById('customEntry').className = "show";
    document.getElementById('customEntry').focus();
    document.getElementById('customPercent').className = "hide";
    document.getElementById('customPercentLabel').className = "hide";
    document.getElementsByClassName('customPerc').className = "hide";
}
//------------------------------------------------------------

//------------------------------------------------------------
//Return custom percent from entry field to label
function onStaticTipClick() {
    let checkCustom = document.getElementById('customPercent').className;

    if (checkCustom === "hide") {
        document.getElementById('customEntry').className = "hide";
        document.getElementById('customEntry').value = "";
        document.getElementById('customPercent').className = "show";
        document.getElementById('customPercentLabel').className = "show";
        document.getElementsByClassName('customPerc').className = "show";
    }
    return;
}
//-----------------------------------------------------------

//-----------------------------------------------------------
//Check all other tip amounts to see if they are selected,
//if they are, reset custom percent
const isActiveCustom = document.getElementsByClassName("staticTip");
for (var i = 0; i < isActiveCustom.length; i++) {
    isActiveCustom[i].addEventListener("click", onStaticTipClick)
};
//-----------------------------------------------------------

//-----------------------------------------------------------
//Check number of people field, whenever change is made
//validate for zero and recalculate tip amount 
const checkZero = document.getElementById("peopleCount");
checkZero.addEventListener("change", validate);
checkZero.addEventListener("change", getTipAmount);
//------------------------------------------------------------

//------------------------------------------------------------
//Allow for recalculation with a change in selections except bill_amount,
//instead of having to reset each time
const update = document.getElementsByClassName("reCalc");

for (var i = 0; i < update.length; i++) {
    if (update[i].value !== "" && update[i].value !== 0) {
        if (update[i].id !== "bill_amount" && update[i].id !== "customPercentLabel") {
            update[i].addEventListener("click", getTipAmount);

        } else {

            update[i].addEventListener("keypress", getTipAmount);
        }
    }
};
//-------------------------------------------------------------

//-------------------------------------------------------------
//Validate that number of people is not zero and show warning
function validate(e) {
    e.preventDefault();

    const peopleValue = parseInt(document.getElementById("peopleCount").value);

    if (peopleValue === 0) {

        const warning = document.getElementById("inputWarning");
        warning.classList.add("visible");
        const warningOutline = document.getElementById("peopleLabel");
        warningOutline.classList.add("visible");

    } else {

        const warning = document.getElementById("inputWarning");
        const warningOutline = document.getElementById("peopleLabel");
        warning.classList.remove("visible");
        warningOutline.classList.remove("visible");

    }
};
//-------------------------------------------------------------

//-------------------------------------------------------------
//Calculate and populate tip and total per person
function getTipAmount() {

    let amount = document.getElementById("bill_amount").value;
    let peoples = document.getElementById("peopleCount").value;

    if (parseInt(peoples) === 0 || peoples === "") {
        return;
    } else {

        let theForm = document.forms["calculator"];
        let percentClicked = theForm.elements["tipPercent"];


        if (percentClicked.value === "on") {
            percentChosen = parseInt(document.getElementById("customEntry").value);


        } else {
            percentChosen = parseInt(theForm.elements["tipPercent"].value);
        }

        calcTipAmount = ((percentChosen / 100) * parseFloat(amount)) / peoples;
        total = (calcTipAmount + (parseFloat(amount) / peoples));
        document.getElementById("tipCalc").innerHTML = (calcTipAmount).toFixed(2);
        document.getElementById("totalCalc").innerHTML = (total).toFixed(2);
    }
}
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//Reset Form
function clearForm() {

    document.getElementById("calculator").reset();
    document.getElementById('customEntry').className = "hide";
    document.getElementById('customPercent').className = "show";
    document.getElementById('customPercentLabel').className = "show";
    document.getElementsByClassName('customPerc').className = "show";

    document.getElementById("inputWarning").classList.remove("visible");

    document.getElementById("peopleLabel").classList.remove("visible");

    document.getElementById("tipCalc").innerHTML = "0.00";
    document.getElementById("totalCalc").innerHTML = "0.00";

}

