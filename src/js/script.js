class Wallet {
    constructor() {
        this.amount = 0;
    }

    addAmount(amount) {
        try {
            if ((addAmount = Number(amount))) {
                this.amount += this.addAmount;
            }
        } catch (error) {
            return console.error(error.message);
        }
    }

    minAmount(amount) {
        try {
            if ((addAmount = Number(amount))) {
                this.amount -= this.addAmount;
            }
        } catch (error) {
            return console.error(error.message);
        }
    }
}

if (localStorage.getItem("data") === null) {
    const data = {
        wallet: new Wallet(),
    };
    localStorage.setItem("data", JSON.stringify(data));
}
