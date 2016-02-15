function sortTogether(array1, array2) {
    var merged = [];
    for(var i=0; i<array1.length; i++) { merged.push({'a1': array1[i], 'a2': array2[i]}); }
    merged.sort(function(o1, o2) { return ((o1.a1 > o2.a1) ? -1 : ((o1.a1 == o2.a1) ? 0 : 1)); });
    for(var i=0; i<merged.length; i++) { array1[i] = merged[i].a1; array2[i] = merged[i].a2; }
}

var database = {
    // Результати шкіл в районі
    inPlaces: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // 1 місця
        [2, 1, 1, 0, 0, 0, 0, 0, 0], // 2 місця
        [12, 2, 0, 2, 0, 0, 0, 0, 0] // 3 місця
    ],
    pPlaces: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 3, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    inRate: [0.643, 0.179, 0.107, 0.071, 0, 0, 0, 0, 0],
    inTeams: ["Школа №5", "Школа №3", "Школа №1", "Боромлянський НВК", "Школа №2", "Школа №4", "Гребениківська ЗОШ", "Жигайлівська ЗОШ", "Кам'янська ЗОШ"],

    regRate: [0.304, 0.136, 0.101, 0.088, 0.044, 0.01, 0.051, 0.016, 0.016, 0.03, 0.031, 0.021, 0.014, 0.032, 0.02, 0.005, 0.005, 0.005, 0.008, 0.004, 0, 0.013, 0.009, 0.007, 0.009, 0.009, 0.008],
    regTeams: ["м.Суми", "м.Шостка", "м.Конотоп", "Кролевецький район", "Кадетський корпус", "Білопільський район",
        "м.Ромни", "Липоводолинський район", "Сумська обл. гімн. для обдар.", "м.Охтирка", "Тростянецький район",
        "Серединобудський район", "Конотопський район", "м.Глухів", "м.Лебедин", "Ямпільський район",
        "Роменський район", "Краснопільський район", "Буринський район", "Великописарівський район", "Сумський район",
        "Глухівський район", "Лебединський район", "Недригайлівський район", "Охтирський район", "Шосткінський район",
        "Путивльський район"]
};

sortTogether(database.regRate, database.regTeams);
sortTogether(database.inRate, database.inTeams);

var option1 =  {
    chart: { type: 'bar', animation: 'false' },
    title: { text: '' },
    xAxis: { categories: database.inTeams },
    yAxis: { title: { text: ''}, max: 15, allowDecimals: false },
    plotOptions: { series: { stacking: 'normal' } },
    series : [
        { name: 'І місце',   data: database.inPlaces[0] },
        { name: 'ІІ місце',  data: database.inPlaces[1] },
        { name: 'ІІІ місце', data: database.inPlaces[2] }
    ]
};

var option2 =  {
    chart: { type: 'bar' },
    title: { text: '' },
    xAxis: { categories: database.inTeams },
    yAxis: { title: { text: ''}, max: 0.8 },
    plotOptions: { series: { stacking: 'normal' } },
    series : [
        { name: 'Рейтинг', data: database.inRate }
    ]
};

var option3 =  {
    chart: { type: 'bar' },
    title: { text: '' },
    xAxis: { categories: ['Куліков', 'Батраченко', 'Дробітько', 'Протасова', 'Андрущенко', 'Білик', 'Кірнос', 'Ковальчук',
        'Красніков', 'Рубан', 'Симон', 'Тарасенко', 'Трусов', 'Холодько', 'Хоменко', 'Храмцова'] },
    yAxis: { title: { text: ''}, max: 5, allowDecimals: false },
    plotOptions: { series: { stacking: 'normal' } },
    series : [
        { name: 'І місце',   data: database.pPlaces[0] },
        { name: 'ІІ місце',  data: database.pPlaces[1] },
        { name: 'ІІІ місце', data: database.pPlaces[2] }
    ]
};

var option4 =  {
    chart: { type: 'bar' },
    title: { text: '' },
    xAxis: {
        categories: database.regTeams
    },
    yAxis: { title: { text: ''}, max: 0.5 },
    plotOptions: { series: { stacking: 'normal' } },
    series : [
        { name: 'Рейтинг', data: database.regRate },
    ]
};


var app = angular.module('myModule', ['lumx']);

app.controller('List', function($scope) {
    $scope.schools = [
        "Тростянецька спеціалізована школа I-III ступенів №1",
        "Тростянецька спеціалізована школа I-III ступенів №2",
        "Тростянецька спеціалізована школа I-III ступенів №3",
        "Тростянецька загальноосвітня школа I-III ступенів №4",
        "Тростянецька спеціалізована школа I-III ступенів №5",
        "Боромлянський навчально-виховний комплекс: загальноосвітня школа І-ІІІ ступенів - дошкільний навчальний заклад"
    ];

    $scope.items = [
        { id: '1', name: 'Холодько Оксана',      school: $scope.schools[4],
            subject: 'Інформаційні технології', place: '3' },
        { id: '2', name: 'Батраченко Владислав', school: $scope.schools[4],
            subject: 'Математика', place: '3' },
        { id: '3', name: 'Красніков Андрій',     school: $scope.schools[2],
            subject: 'Математика', place: '3' },
        { id: '4', name: 'Ковальчук Юлія',       school: $scope.schools[4],
            subject: 'Біологія', place: '3'},
        { id: '5', name: 'Куліков Денис',        school: $scope.schools[4],
            subject: 'Біологія', place: '2'},
        { id: '6', name: 'Андрущенко Юлія',      school: $scope.schools[4],
            subject: 'Біологія', place: '3'},
        { id: '5', name: 'Куліков Денис',        school: $scope.schools[4],
            subject: 'Інформатика', place: '2'},
        { id: '7', name: 'Трусов Богдан',        school: $scope.schools[4],
            subject: 'Інформатика', place: '3'},
        { id: '8', name: 'Кірнос Сергій',        school: $scope.schools[5],
            subject: 'Інформатика', place: '3'},
        { id: '9', name: 'Тарасенко Світлана',   school: $scope.schools[4],
            subject: 'Географія', place: '3'},
        { id: '2', name: 'Батраченко Владислав', school: $scope.schools[4],
            subject: 'Математика', place: '3'},
        { id: '10', name: 'Дробітько Дарія',     school: $scope.schools[2],
            subject: 'Українська мова та література', place: '2'},
        { id: '11', name: 'Хоменко Владислава',  school: $scope.schools[2],
            subject: 'Українська мова та література', place: '3'},
        { id: '12', name: 'Храмцова Юлія',       school: $scope.schools[4],
            subject: 'Хімія', place: '3'},
        { id: '2', name: 'Батраченко Владислав', school: $scope.schools[4],
            subject: 'Хімія', place: '3'},
        { id: '13', name: 'Рубан Єлизавета',     school: $scope.schools[4],
            subject: 'Хімія', place: '3'},
        { id: '6', name: 'Андрущенко Юлія',      school: $scope.schools[4],
            subject: 'Хімія', place: '3'},
        { id: '14', name: 'Протасова Альона',    school: $scope.schools[0],
            subject: 'Історія', place: '2'},
        { id: '15', name: 'Білик Ганна',         school: $scope.schools[5],
            subject: 'Історія', place: '3'},
        { id: '16', name: 'Симон Олексій',       school: $scope.schools[4],
            subject: 'Англійська мова', place: '3'}
    ];
});

app.directive('highcharts', function() {
    return {
        link: function(scope, el, attrs) {
            var options;
            var chartData = scope.$eval(attrs.chartdata);
            if (chartData == 1) {
                options = option1;
            } else if(chartData == 2) {
                options = option2;
            } else if(chartData == 3) {
                options = option3;
            } else if(chartData == 4) {
                options = option4;
            }
            options.chart.renderTo = el[0];
            new Highcharts.Chart(options);
        }
    };
});
