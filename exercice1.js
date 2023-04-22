var svg = d3.select("body")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

d3.json("regions.json", function(json) {
    // Créer une projection pour la carte
    var projection = d3.geoConicConformal()
        .center([2.454071, 46.279229])
        .scale(2800);

    // Créer un générateur de chemin pour dessiner la carte
    var path = d3.geoPath()
        .projection(projection);

    // Ajouter les chemins pour chaque région à la carte
    svg.selectAll("path.region")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "region")
        .attr("d", path);
});

d3.csv("GrippeFrance2014.csv", function(data) {
    // Définir la plage de couleurs pour l'intensité de la grippe
    var color = d3.scaleLinear()
        .domain([0, 2000])
        .range(["#FFFFFF", "#FF0000"]);

    // Ajouter les données de grippe à la carte
    svg.selectAll("path.region")

    .style("fill", function(d) {
        var value = d.properties.value;
        // Trouver l'intensité de la grippe pour cette région
        for (var i = 0; i < data.length; i++) {
            if (data[i].region === d.properties.name) {
                value = parseFloat(data[i].somme2014);
                break;


            }

        }
        return color(value);
    });


    for (var i = 0; i < data.length; i++) {
        var sum = 0;
        for (var j = 1; j <= 30; j++) {
            var dateStr = "01/" + (j < 10 ? "0" + j : j) + "/14";
            sum += parseFloat(data[i][dateStr]);
        }
        data[i].november2014 = sum;
    }
});