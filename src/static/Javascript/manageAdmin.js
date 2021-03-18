function run() {
    notificationNew();
    setActive();
    chart();

    callApiProduct();
    callApiOrder();
    callApiBill();
    callApiNotification(0, 100);
    callApiStore(0, 100);
    callApiTypeProduct(0, 100);
    callApiEvaluate(0, 100);

    btnForm();
    addErrorHtml();
}

function chart() {
    var x = [];
    var y = [];
    var date_now = new Date();
    for (i = 1; i <= getDaysOfMonth(date_now.getFullYear(), date_now.getMonth() + 1); i++) {
        x.push(i + '/' + (date_now.getMonth() + 1));
        y.push(0);
    }

    var chart = document.getElementById('chart').getContext('2d');
    Chart.defaults.global.defaultFontColor = '#000';
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    console.log('chart');

    fetch(url_bill_dashboard, {
        method: 'get'
    }).then(function(response) {
        if (response.status === 200) {
            response.json().then(function(text) {
                var data = JSON.parse(JSON.stringify(text)).data;
                console.log(data);

                for (i = 0; i < data.length; i++)
                    y[data[i].day - 1] = data[i].soluong;

                let lineChart = new Chart(chart, {
                    type: 'bar',
                    data: {
                        labels: x,
                        backgroundColor: "rgba(155,0,0,1)",
                        datasets: [{
                            fillColor: "rgba(155,0,0,1)",
                            borderWidth: "10px",
                            backgroundColor: "rgba(155,000,0,1)",
                            strokeColor: "rgba(0,155,0,1)",
                            data: y
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Số đơn trong tháng',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                fontColor: '#000'
                            }
                        },
                        tooltips: {
                            enabled: true
                        }
                    }
                });
            })
        }
    });
}

function setActive() {
    var btns = document.getElementsByClassName("bar");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName(" active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

function openScreen(screen) {
    var i;
    var x = document.getElementsByClassName("screen");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(screen).style.display = "block";
}