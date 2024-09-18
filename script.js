fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=16a8082bd19242ff81c76714c1e04461")
    .then((result) => result.json())
    .then((currency) => {
        let from = document.querySelector("#from");
        let to = document.querySelector("#to");
        let resultSpace = document.querySelector("#result");

        const rates = currency.rates;
        const keys = Object.keys(currency.rates);
        keys.sort(); // Sort keys alphabetically

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            // Append the sorted currency options
            from.innerHTML += `<option value='${rates[key]}' name='${key}'>${key}</option>`;
            to.innerHTML += `<option value='${rates[key]}' name='${key}'>${key}</option>`;
        }

        // Add event listener for form submission
        document.querySelector('.form').addEventListener('submit', function (e) {
            e.preventDefault();

            let amount = parseFloat(document.querySelector("#num").value);
            let fromVal = parseFloat(document.querySelector("#from").value);
            let toVal = parseFloat(document.querySelector("#to").value);
            let fromOption = document.querySelector("#from").selectedOptions[0];
            let toOption = document.querySelector("#to").selectedOptions[0];

            let res = (amount / fromVal) * toVal; 

            if(isNaN(amount)){
                resultSpace.innerHTML = `0 ${fromOption.getAttribute('name')} = 0 ${toOption.getAttribute('name')}`;
            }else{
                resultSpace.innerHTML = `${amount} ${fromOption.getAttribute('name')} = ${res.toFixed(2)} ${toOption.getAttribute('name')}`;
            }

        });
    });
