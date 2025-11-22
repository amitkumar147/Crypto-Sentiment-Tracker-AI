async function analyze() {
    let coin = document.getElementById("coinSelect").value;

    fetchPrice(coin);
    loadChart(coin);

    let ta = random(30, 90);
    let fa = random(40, 95);
    let news = random(25, 85);
    let twitter = random(20, 90);

    document.getElementById("taScore").innerText = ta + "/100";
    document.getElementById("faScore").innerText = fa + "/100";
    document.getElementById("newsScore").innerText = news + "/100";
    document.getElementById("twitterScore").innerText = twitter + "/100";

    fetchFearGreed();

    let final = Math.round((ta + fa + news + twitter) / 4);
    let meter = document.getElementById("finalMeter");

    if (final > 70) {
        meter.innerText = "Bullish 🚀 (" + final + ")";
        meter.style.color = "lime";
    } else if (final < 40) {
        meter.innerText = "Bearish 🔻 (" + final + ")";
        meter.style.color = "red";
    } else {
        meter.innerText = "Neutral ⚪ (" + final + ")";
        meter.style.color = "yellow";
    }
}

async function fetchPrice(coin) {
    let url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
    let res = await fetch(url);
    let data = await res.json();
    document.getElementById("price").innerText =
        "$" + data[coin].usd.toLocaleString();
}

function loadChart(coin) {
    let symbol = {
        bitcoin: "BINANCE:BTCUSDT",
        ethereum: "BINANCE:ETHUSDT",
        solana: "BINANCE:SOLUSDT"
    }[coin];

    document.getElementById("tvChart").src =
        `https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=60&theme=dark`;
}

async function fetchFearGreed() {
    try {
        let res = await fetch("https://api.alternative.me/fng/?limit=1");
        let data = await res.json();
        document.getElementById("fgScore").innerText =
            data.data[0].value_classification + " (" + data.data[0].value + ")";
    } catch {
        document.getElementById("fgScore").innerText = "Offline";
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

  