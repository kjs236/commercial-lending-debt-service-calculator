function pmt(principal, rate, amortization) {
    let annualPmt = 0;
    let monthlyPmt = 0;
    
    if (rate !== 0) {
        monthlyPmt = ((rate / 100 / 12) * principal) / (1 -((1 + (rate / 100 / 12)) ** (-amortization * 12)));
        annualPmt = monthlyPmt * 12;
    } else {
        console.warn("Warning: No interest rate provided. Assuming 0% interest. Annual payment is simply principal divided by amortization period.");
        annualPmt = principal / amortization;
    }
    return { monthlyPmt, annualPmt };
}

function dscr(netOperatingIncome, annualPmt) {
    if (annualPmt === 0) {
        console.warn("Warning: Annual payment is zero. DSCR is undefined. Returning Infinity.");
        return Infinity;
    }
    return netOperatingIncome / annualPmt;
}

function loanConstant(principal, rate, amortization) {
    const { annualPmt } = pmt(principal, rate, amortization);
    return annualPmt / principal * 100; // Return as percentage
}

function interestOnlyPayment(principal, rate) {
    let ioAnnualPmt = (rate / 100) * principal; // Annual interest-only payment
    let ioMonthlyPmt = ioAnnualPmt / 12; // Monthly interest-only payment   
    return { ioMonthlyPmt, ioAnnualPmt };
} 

function maxLoanAmount(netOperatingIncome, rate, amortization) {
    let maxPrincipalAt1 = (netOperatingIncome / 1.0 * (1 - ((1 + (rate / 100 / 12)) ** (-amortization * 12)))) / (rate / 100 / 12);
    let maxPrincipalAt1_2 = (netOperatingIncome / 1.2 * (1 - ((1 + (rate / 100 / 12)) ** (-amortization * 12)))) / (rate / 100 / 12);
    let maxPrincipalAt1_25 = (netOperatingIncome / 1.25 * (1 - ((1 + (rate / 100 / 12)) ** (-amortization * 12)))) / (rate / 100 / 12);
    let maxPrincipalAt1_3 = (netOperatingIncome / 1.3 * (1 - ((1 + (rate / 100 / 12)) ** (-amortization * 12)))) / (rate / 100 / 12);
    return { maxPrincipalAt1, maxPrincipalAt1_2, maxPrincipalAt1_25, maxPrincipalAt1_3 };
}

function calculate() { 
    const principal = parseFloat(document.getElementById("principal").value) || 0;
    const rate = parseFloat(document.getElementById("interest-rate").value) || 0;
    const amortization = parseFloat(document.getElementById("amortization").value) || 0;
    const netOperatingIncome = parseFloat(document.getElementById("net-operating-income").value) || 0;
    const interestOnly = document.getElementById("interest-only").value === "true";

    if (principal === 0 || rate === 0 || amortization === 0 || netOperatingIncome === 0) return;

    let monthlyPmt = 0;
    let annualPmt = 0;

    if (!interestOnly) {
        ({ monthlyPmt, annualPmt } = pmt(principal, rate, amortization));
    }  else {
        ({ ioMonthlyPmt: monthlyPmt, ioAnnualPmt: annualPmt } = interestOnlyPayment(principal, rate));
    }
    const currentDscr = dscr(netOperatingIncome, annualPmt);
    const loanConst = interestOnly ? rate : loanConstant(principal, rate, amortization);
    const maxPrincipalAt1 = netOperatingIncome / (1.0 * (interestOnly ? rate / 100 : annualPmt / principal));
    const maxPrincipalAt1_2 = netOperatingIncome / (1.2 * (interestOnly ? rate / 100 : annualPmt / principal));
    const maxPrincipalAt1_25 = netOperatingIncome / (1.25 * (interestOnly ? rate / 100 : annualPmt / principal));
    const maxPrincipalAt1_3 = netOperatingIncome / (1.3 * (interestOnly ? rate / 100 : annualPmt / principal));

    document.getElementById("monthly-payment").textContent = monthlyPmt.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    document.getElementById("annual-debt-service").textContent = annualPmt.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const dscrEl = document.getElementById('dscr');
    dscrEl.textContent = currentDscr.toFixed(2);
    dscrEl.closest('.output-card').className = currentDscr >= 1.25 ? 'output-card dscr-card-healthy' : 'output-card dscr-card-warning';
    document.getElementById("loan-constant").textContent = loanConst.toFixed(2) + "%";
    document.getElementById("max-loan-1").textContent = maxPrincipalAt1.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    document.getElementById("max-loan-1-20").textContent = maxPrincipalAt1_2.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    document.getElementById("max-loan-1-25").textContent = maxPrincipalAt1_25.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    document.getElementById("max-loan-1-30").textContent = maxPrincipalAt1_3.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calculate);
});