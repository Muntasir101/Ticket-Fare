function calculateCost() {
    const distance = document.getElementById('distance').value;
    const departureDate = new Date(document.getElementById('departureDate').value);
    const serviceClass = document.getElementById('serviceClass').value;
    const extraBaggage = document.getElementById('extraBaggage').value || 0;
    const numberOfTickets = document.getElementById('numberOfTickets').value;
    const today = new Date();
    const diffDays = Math.ceil((departureDate - today) / (1000 * 60 * 60 * 24));

    const resultElement = document.getElementById('result');
    resultElement.classList.remove('error');

    if (numberOfTickets < 1 || numberOfTickets > 4) {
        resultElement.innerText = "Number of tickets must be between 1 and 4.";
        resultElement.classList.add('error');
        return;
    }

    if (extraBaggage < 0 || extraBaggage > 50) {
        resultElement.innerText = "Extra baggage must be between 0 and 50 kg.";
        resultElement.classList.add('error');
        return;
    }

    let baseCost = 0;

    if (distance < 500) {
        baseCost = 100;
    } else if (distance >= 500 && distance <= 1000) {
        if (diffDays <= 7) {
            baseCost = distance * 0.10;
        } else if (diffDays <= 30) {
            baseCost = distance * 0.08;
        } else if (diffDays <= 90) {
            baseCost = distance * 0.06;
        }
    } else if (distance > 1000) {
        if (diffDays <= 7) {
            baseCost = distance * 0.30;
        } else if (diffDays <= 30) {
            baseCost = distance * 0.25;
        } else if (diffDays <= 90) {
            baseCost = distance * 0.20;
        }
        if (serviceClass === 'business') {
        baseCost *= 2;
    } else if (serviceClass === 'first') {
        baseCost *= 3;
    }
    }



    let extraBaggageCost = 0;
    if (distance >= 500 && distance <= 1000) {
        extraBaggageCost = extraBaggage * 25;
    } else if (distance > 1000) {
        extraBaggageCost = extraBaggage * 50;
    }

    const totalCostPerTicket = baseCost + extraBaggageCost;
    const totalCost = totalCostPerTicket * numberOfTickets;

    document.getElementById('result').innerText = `Total Cost: $${totalCost.toFixed(2)}`;
}
