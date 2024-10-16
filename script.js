document.getElementById("options").addEventListener("change", function() {
    const selectedOption = this.value;

    // Hide all calculators initially
    document.getElementById("acid-production-calculator").style.display = "none";
    document.getElementById("sell-acid-calculator").style.display = "none";
    document.getElementById("deals-calculator").style.display = "none";

    // Show the selected calculator
    if (selectedOption === "acid-production") {
        document.getElementById("acid-production-calculator").style.display = "block";
    } else if (selectedOption === "sell-acid") {
        document.getElementById("sell-acid-calculator").style.display = "block";
    } else if (selectedOption === "deals") {
        document.getElementById("deals-calculator").style.display = "block";
    }
});

// Acid Production Calculation
function clearAcidProductionResult() {
    document.getElementById("calc-result").innerText = '';
}

document.getElementById("acid").addEventListener("input", function() {
    const acidAmount = Number(this.value);
    const sulfurAmount = acidAmount * 5; // 5 sulfur for each acid
    const energyLinksAmount = acidAmount * 50; // 50 energy links for each acid

    // Clear other inputs
    document.getElementById("sulfur").value = '';
    document.getElementById("energy-links").value = '';

    // Clear result if input is empty
    if (this.value === '') {
        clearAcidProductionResult();
    } else if (acidAmount < 0) {
        document.getElementById("calc-result").innerText = 'Enter a valid acid amount.';
    } else {
        document.getElementById("calc-result").innerText = `You need ${sulfurAmount} Sulfur and ${energyLinksAmount} Energy Links.`;
    }
});

document.getElementById("sulfur").addEventListener("input", function() {
    const sulfurAmount = Number(this.value);

    // Clear other inputs
    document.getElementById("acid").value = '';
    document.getElementById("energy-links").value = '';

    // Clear result if input is empty
    if (this.value === '') {
        clearAcidProductionResult();
    } else if (sulfurAmount < 5) {
        document.getElementById("calc-result").innerText = 'Enter a higher sulfur amount than 5.';
    } else {
        const acidAmount = Math.floor(sulfurAmount / 5); // Calculate acid from sulfur
        const energyLinksAmount = acidAmount * 50; // 50 energy links for each acid
        document.getElementById("calc-result").innerText = `You can produce ${acidAmount} Acid, need ${energyLinksAmount} Energy Links.`;
    }
});

document.getElementById("energy-links").addEventListener("input", function() {
    const energyLinksAmountInput = Number(this.value);
    const energyLinksAmount = Math.max(50, energyLinksAmountInput); // Ensure at least 50 energy links

    // Clear other inputs
    document.getElementById("acid").value = '';
    document.getElementById("sulfur").value = '';

    // Clear result if input is empty
    if (this.value === '') {
        clearAcidProductionResult();
    } else if (energyLinksAmountInput < 50) {
        document.getElementById("calc-result").innerText = 'Enter a higher amount of Energy Links than 50.';
    } else {
        const acidAmount = Math.floor(energyLinksAmount / 50); // Calculate acid from energy links
        const sulfurAmount = acidAmount * 5; // 5 sulfur for each acid
        document.getElementById("calc-result").innerText = `You can produce ${acidAmount} Acid, need ${sulfurAmount} Sulfur.`;
    }
});

// Sell Acid Calculation
document.getElementById("acid-sell").addEventListener("input", function() {
    const acidAmount = Number(this.value);
    const pricePerUnit = Number(document.getElementById("price-per-unit").value);
    
    const totalPrice = acidAmount * pricePerUnit;

    document.getElementById("sell-result").innerText = acidAmount && pricePerUnit ? `You will earn ${totalPrice} Energy Links.` : '';
});

document.getElementById("price-per-unit").addEventListener("input", function() {
    const pricePerUnit = Number(this.value);
    const acidAmount = Number(document.getElementById("acid-sell").value);
    
    const totalPrice = acidAmount * pricePerUnit;

    document.getElementById("sell-result").innerText = acidAmount && pricePerUnit ? `You will earn ${totalPrice} Energy Links.` : '';
});

// Deals Calculation
document.getElementById("calculate-deals").addEventListener("click", function() {
    const totalAmount = Number(document.getElementById("total-amount").value);
    const unitPrice = Number(document.getElementById("unit-price-deals").value);
    
    const acidAmount = Math.floor(totalAmount / unitPrice);
    const remainingAmount = totalAmount - (acidAmount * unitPrice);

    document.getElementById("deals-result").innerText = totalAmount && unitPrice ? `You can get ${acidAmount} Acid for ${totalAmount - remainingAmount} Energy Links.` : '';
});
