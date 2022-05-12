//Tuan
//CMSC126(B) Tax Calculator

//This is quite a complex program. Start 5:38 P.M., March 7, 2022

//variables and functions
var submit_button = document.getElementById("submit_button");
var monthly_income;
var deduction_1, deduction_2, deduction_3, deduction_4, deduction_total;
var dependents;
function get_monthly_income() {
    monthly_income = document.getElementById("no_1").value;
}
var gross_income;
var net_taxable_income;
var payable_tax;

//Deductions

function SSS_GSIS_deductions() {
    
    //if government worker, GSIS is the appropriate social insurance corporation
    //the GSIS deducts 9% of monthly income
    if(document.getElementById("no_3_yes").checked) {
        get_monthly_income();
        deduction_1 = (monthly_income*0.09);
        document.getElementById("deduction_1_label_annual").innerHTML = "GSIS (Annual)";
        document.getElementById("deduction_1_label_monthly").innerHTML = "GSIS (Monthly)";
        document.getElementById("deduction_1_annual").innerHTML = (deduction_1*12).toFixed(2);
        document.getElementById("deduction_1_monthly").innerHTML = deduction_1.toFixed(2);

    } 
    //if private worker, SSS is the appropriate social insurance corporation
    //the SSS deducts 11% of monthly income
    else if(document.getElementById("no_3_no").checked)  {
        get_monthly_income();
        deduction_1 = (monthly_income*0.11);
        document.getElementById("deduction_1_label_annual").innerHTML = "SSS (Annual)";
        document.getElementById("deduction_1_label_monthly").innerHTML = "SSS (Monthly)";
        document.getElementById("deduction_1_annual").innerHTML = (deduction_1*12).toFixed(2);
        document.getElementById("deduction_1_monthly").innerHTML = deduction_1.toFixed(2);
    }
    else {
        document.getElementById("deduction_1").innerHTML ="Computation invalid. Please reanswer survey questions."
    }
}

function PhilHealth_deduction() {
    get_monthly_income();
    deduction_2 = (monthly_income*0.035);
    document.getElementById("deduction_2_label_annual").innerHTML = "PhilHealth (Annual)";
    document.getElementById("deduction_2_label_monthly").innerHTML = "PhilHealth (Monthly)";
    document.getElementById("deduction_2_annual").innerHTML = (deduction_2*12).toFixed(2);
    document.getElementById("deduction_2_monthly").innerHTML = deduction_2.toFixed(2);
}

function Pag_IBIG_deduction() {
    get_monthly_income();
    deduction_3 = (monthly_income*0.01375);
    document.getElementById("deduction_3_label_annual").innerHTML = "Pag-IBIG (Annual)";
    document.getElementById("deduction_3_label_monthly").innerHTML = "Pag-IBIG (Monthly)";
    document.getElementById("deduction_3_annual").innerHTML = (deduction_3*12).toFixed(2);
    document.getElementById("deduction_3_monthly").innerHTML = deduction_3.toFixed(2);
}


function personal_exemption_deduction() {
    get_monthly_income();
    dependents = document.getElementById("no_2").value;
    if(dependents <= 4) {
        deduction_4 = dependents*50000 + 250000; // The constant 50,000 is the base personal exemption
        document.getElementById("deduction_4_additional").innerHTML = dependents*50000;
    }
    else {
        deduction_4 = 200000 + 250000 //the maximum additional personal exemption due to dependents + base personal exemption;
        document.getElementById("deduction_4_additional").innerHTML = 200000;
    }
    document.getElementById("deduction_4_total").innerHTML = deduction_4;
    document.getElementById("deduction_4_base").innerHTML = 250000;
    
    
}
//Payable Tax

function payable_tax_function() {
    
    if(net_taxable_income <= 250000) {
        payable_tax = 0; 
    }
    else if(net_taxable_income<=400000) {
        payable_tax = (net_taxable_income - 250000)*0.20;
    }
    else if(net_taxable_income<=800000) {
        payable_tax = (net_taxable_income - 400000)*0.25 + 30000;
    }
    else if(net_taxable_income<=2000000) {
        payable_tax = (net_taxable_income - 800000)*0.30 + 130000;
    }
    else if(net_taxable_income<=8000000) {
        payable_tax = (net_taxable_income - 2000000)*0.32 + 490000;
    }
    else {
        payable_tax = (net_taxable_income - 8000000)*0.35 + 2410000;
    }
    document.getElementById("payable_tax").innerHTML = payable_tax.toFixed(2);

}
//execute program

submit_button.addEventListener("click", () => {
   
    // deductions

    deduction_total = 0;
    SSS_GSIS_deductions();
    Pag_IBIG_deduction();
    PhilHealth_deduction();
    personal_exemption_deduction();

    //computations required as per no. 7 of pdf
    document.getElementById("monthly_income_1").innerHTML = monthly_income;
    document.getElementById("monthly_income_2").innerHTML = monthly_income;
    deduction_total = (deduction_1+deduction_2+deduction_3)*12 + deduction_4; //annual dues to GSIS or SSS, Pag-IBIG, and PhilHealth (deduction_1+deduction_2+deduction_3)*12, plus the personal exemptions (deduction_4)
    document.getElementById("deduction_total").innerHTML = deduction_total;
    gross_income = monthly_income*13 //this is equivalent to monthly_income*12 + monthly_income; I put it in this way so as to reduce number of operations executed
    document.getElementById("gross_income").innerHTML = gross_income;
    net_taxable_income = gross_income - deduction_total;
    document.getElementById("net_taxable_income").innerHTML = net_taxable_income;
    console.log(gross_income);
    console.log(deduction_total);
    //payable tax
    payable_tax_function();
});

