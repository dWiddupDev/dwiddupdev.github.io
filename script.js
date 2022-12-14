var salmonWeight = {
    type: "Salmon_weight",
    qty: 0
};
var salmonSides = {
    type: "Salmon_sides",
    qty: 0
};
var seabassXsmall = [];
var seabassSmall = [];
var seabassMedium = [];
var seabassLarge = [];
var seabassXlarge = [];
var brillWeight = {
    type: "Brill_weight",
    qty: 0
};
var brill = {
    type: "Brill_fish",
    qty: 0
};
var codWeight = {
    type: "Cod_weight",
    qty: 0
};
var cod = {
    type: "Cod_fish",
    qty: 0
};
var countsEightTens = [];
var countsTentwelves = [];
var countsTwelveSixteens = [];
var countsTwenties = [];
var countsTwentyFives = [];
var countsThirties = [];
var countsThirtyFives = [];
var countsForties = [];
var countsFortyFives = [];
var countsFifties = [];
var coley = {
    type: "Coley_fish",
    qty: 0
};
var coleyWeight = {
    type: "Coley_weight",
    qty: 0
};
var doradeXsmall = [];
var doradeSmall = [];
var doradeMedium = [];
var doradeLarge = [];
var doradeXlarge = [];
var dovers = [];
var doversWeight = [];
var fishpie = {
    type: "Fishpie",
    qty: 0
};
var fishpieWhite = {
    type: "Fishpie White",
    qty: 0
};
var fishpieSalmon = {
    type: "Fishpie Salmon",
    qty: 0
};
var hake = {
    type: "Hake_fish",
    qty: 0
};
var hakeWeight = {
    type: "Hake_weight",
    qty: 0
};
var halibutWeight = [];
var lemonsole = [];
var lemonWeight = [];
var mackerel = [];
var mackerelWeight = [];
var monkfish = [];
var plaice = [];
var plaiceWeight = [];
var pollock = {
    type: "Pollock_fish",
    qty: 0
};
var pollockWeight = {
    type: "Pollock_weight",
    qty: 0
};
var octopus = [];
var sardines = [];
var sardinesWeight = [];
var seatrout = {
    type: "Seatrout_fish",
    qty: 0
};
var seatroutWeight = {
    type: "Seatrout_weight",
    qty: 0
};
var shark = [];
var smokedhaddock = [];
var smokedhaddockWeight = [];
var sword = [];
var squid = {
    type: "Squid",
    qty: 0
};
var trout = [];
var troutWeight = [];
var tuna = [];
var wildbass = {
    type: "Wild Bass_fish",
    qty: 0
};
var wildbassWeight = {
    type: "Wild Bass_weight",
    qty: 0
};

// function createStockList() {

// }

function done() {
    console.log("Working.....");
    document.getElementById("fishSelectionCont").style.display = "none";
    document.getElementById("elementsToPrint").style.display = "block";

    // create pdf by creating the html first and then convert using the function below
    // gitlink: https://github.com/eKoopmans/html2pdf.js

    // do salmon
    var local = window.localStorage;
    var salmon = [];
    var miscFish = [];
    var seabass = [];
    var counts = [];
    for (var i = 0; local.length; i ++) {
        var fishType = window.localStorage.key(i);

        if (fishType != null){
            var orders = window.localStorage.getItem(fishType)
            var typeObj = {
                type: fishType,
                qty: orders
            }           
            
            if (fishType.includes("salmon") && fishType.includes("fishpie") == false)       
                salmon.push(typeObj);
            
            else if (fishType.includes("seaBass"))   
                seabass.push(typeObj);
                
            else if (fishType.includes("counts"))
                counts.push(typeObj);
                
            else   
                miscFish.push(typeObj);
                    
            // console.log("Salmon = ", salmon);
            // console.log("seabass = ", seabass);
            // console.log("counts = ", counts);
            // console.log("miscFish = ", miscFish);
            
        }
        else 
            break;
    }

    if (salmon.length == 0) { 
        document.getElementById("elementsToPrint").innerHTML += "<h2>No Salmon Selected</h2>";
    } else {
        printSalmon(salmon);
    }
        
    if (seabass.length == 0) {
         document.getElementById("elementsToPrint").innerHTML += "<h2>No Sea Bass Selected</h2>";
       
    }else {
         printSeabass(seabass);
    }

    if (counts.length == 0) {
         document.getElementById("elementsToPrint").innerHTML += "<h2>No Counts Selected</h2>";
        
    } else {
         printCounts(counts);
    }

    if (miscFish.length == 0) {
         document.getElementById("elementsToPrint").innerHTML += "<h2>No Other Fish Selected</h2>";
    } else {
         printMisc(miscFish); 
    }

    //createStockList();
        
}

function seeList() {
    document.getElementById("elementsToPrint").style.display = "block";
    document.getElementById("fishSelectionCont").style.display = "none ";

    document.getElementById("seeListBtn").style.display = "none";

}

function listHide() {
    document.getElementById("elementsToPrint").style.display = "none";
    document.getElementById("fishSelectionCont").style.display = "block";

    document.getElementById("seeListBtn").style.display = "block";
}

function printSalmon(salmonObj) {
    var element = document.getElementById("element-to-print-salmon");    

    element.innerHTML = "<h1>Salmon</h1>";
    var fishAndOrders = "";

    var whole = [];
    var fsp = [];
    var fp = [];

    for (var i = 0; i < salmonObj.length; i ++) {
        if (salmonObj[i].type.includes("whole") || salmonObj[i].type.includes("gutted") || salmonObj[i].type.includes("g+s"))
            whole.push(salmonObj[i]);
        if (salmonObj[i].type.includes("FSP"))
            fsp.push(salmonObj[i]);
        if (salmonObj[i].type.includes("F+P"))
            fp.push(salmonObj[i]);
    }

    // seperate the types into sections
    for (var w = 0; w < whole.length; w++) {
        var type = whole[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }

        fishAndOrders += "<pdfItem>" +
         "<h4>" + type + "</h4>";
        
        var indOrders = whole[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < fsp.length; w++) {
        var type = fsp[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }

        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = fsp[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }
    // F+P
    for (var w = 0; w < fp.length; w++) {
        var type = fp[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }       
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ").replaceAll("-", " ") + "</h4>";
        
        var indOrders = fp[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    element.innerHTML += fishAndOrders;
    fishAndOrders = "";
    var date = new Date().toLocaleDateString();
    html2pdf(element, {
        filename: "salmon_" + date + ".pdf", 
        html2canvas: { scale: 5},
        pagebreak: { mode: 'css', avoid: ['.count_label', 'span', 'h3' ] }
    });
}

function printSeabass(seabassObj) {
    // change to specific element to show in UI
    var element = document.getElementById("element-to-print-seabass");   
    element.innerHTML = "<h1>SeaBass</h1>";

    var fishAndOrders = "";

    var whole = [];
    var xsmall = [];
    var small = [];
    var medium = [];
    var large = [];
    var xlarge = [];

    for (var i = 0; i < seabassObj.length; i ++) {
        if (seabassObj[i].type.includes("Whole"))
            whole.push(seabassObj[i]);
        if (seabassObj[i].type.includes("<400"))
            xsmall.push(seabassObj[i]);
        if (seabassObj[i].type.split("_")[1].includes("4-6") && seabassObj[i].type.split("_")[0].includes("Whole") == false)
            small.push(seabassObj[i]);
        if (seabassObj[i].type.includes("550"))
            medium.push(seabassObj[i]);
        if (seabassObj[i].type.includes("6-8"))
            large.push(seabassObj[i]);
        if (seabassObj[i].type.includes("800+"))
            xlarge.push(seabassObj[i]);
    }

    // seperate the types into sections
    for (var w = 0; w < whole.length; w++) {
        var type = whole[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }

        fishAndOrders += "<pdfItem>" +
         "<h4>" + type + "</h4>";
        
        var indOrders = whole[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < xsmall.length; w++) {
        var type = xsmall[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }

        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = xsmall[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }
    // F+P
    for (var w = 0; w < small.length; w++) {
        var type = small[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = small[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < medium.length; w++) {
        var type = medium[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = medium[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < large.length; w++) {
        var type = large[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = large[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    for (var w = 0; w < xlarge.length; w++) {
        var type = xlarge[w].type.split("_");
        switch(type.length) {
            case 2:
                var fish = type[0];
                var cut = type[1];
                type = `${fish} ${cut}`
                break;
            case 3:
                var fish = type[0];
                var size = type[1] + "oz";
                var cut = type[2];
                type = `${fish} ${size} ${cut}`
                break;
        }
        
        fishAndOrders += "<pdfItem>" +
         "<h4>" + type.replaceAll(",", " ") + "</h4>";
        
        var indOrders = xlarge[w].qty.trim().split(",");

        fishAndOrders += "<values>";
        for (var o = 0; o < indOrders.length; o++) {
            var value = indOrders[o];
            if (value == "0.5")
                value = "1/2";
            fishAndOrders += '<span> ' + value + ' </span>';
        }
        fishAndOrders += "</values>";
        fishAndOrders += "</pdfItem>";
    }

    element.innerHTML += fishAndOrders;
    fishAndOrders = "";

    var date = new Date().toLocaleDateString();
    html2pdf(element, {
        filename: "seabass_" + date + ".pdf", 
        html2canvas: { scale: 5},
        pagebreak: { mode: 'css', avoid: ['.count_label', 'span', 'h3' ] }
    });
}

function printCounts(countsObj) {

    var element = document.getElementById("element-to-print-counts");   
    element.innerHTML = "<h1>Counts</h1>";

    var fishAndOrders = "";  
    var cod = [];
    var haddock = [];  
    var whiting = [];

    for (var i = 0; i < countsObj.length; i ++) {
        if (countsObj[i].type.includes("cod"))
            cod.push(countsObj[i]);
        if (countsObj[i].type.includes("haddock"))
            haddock.push(countsObj[i]);  
        if (countsObj[i].type.includes("whiting"))
            whiting.push(countsObj[i]);        
    }

    var eightTens = [];
    var tenTwelves = [];
    var twelvesSixteens = [];
    var twenties = [];
    var twentyFives = [];
    var thirties = [];
    var thirtyFives = [];
    var forties = [];
    var fortyfives = [];
    var fifties = [];
    
    // create cod counts list
    for (var i = 0; i < cod.length; i ++) {
        if (cod[i].type.includes("8-10"))
            eightTens.push(cod[i]);
        if (cod[i].type.includes("10-12"))
            tenTwelves.push(cod[i]);
        if (cod[i].type.includes("12-16"))
            twelvesSixteens.push(cod[i]);
        if (cod[i].type.includes("20"))
            twenties.push(cod[i]);
        if (cod[i].type.includes("25"))
            twentyFives.push(cod[i]);
        if (cod[i].type.includes("30"))
            thirties.push(cod[i]);
        if (cod[i].type.includes("35"))
            thirtyFives.push(cod[i]);
        if (cod[i].type.includes("40"))
            forties.push(cod[i]);
        if (cod[i].type.includes("45"))
            fortyfives.push(cod[i]);
        if (cod[i].type.includes("50"))
            fifties.push(cod[i]);
    }
    
    // create haddock counts list
    for (var i = 0; i < haddock.length; i ++) {
        if (haddock[i].type.includes("8-10"))
            eightTens.push(haddock[i]);
        if (haddock[i].type.includes("10-12"))
            tenTwelves.push(haddock[i]);
        if (haddock[i].type.includes("12-16"))
            twelvesSixteens.push(haddock[i]);
        if (haddock[i].type.includes("20"))
            twenties.push(haddock[i]);
        if (haddock[i].type.includes("25"))
            twentyFives.push(haddock[i]);
        if (haddock[i].type.includes("30"))
            thirties.push(haddock[i]);
        if (haddock[i].type.includes("35"))
            thirtyFives.push(haddock[i]);
        if (haddock[i].type.includes("40"))
            forties.push(haddock[i]);
        if (haddock[i].type.includes("45"))
            fortyfives.push(haddock[i]);
        if (haddock[i].type.includes("50"))
            fifties.push(haddock[i]);
    }

    // create whiting counts list
    for (var i = 0; i < whiting.length; i ++) {
        if (whiting[i].type.includes("8-10"))
            eightTens.push(whiting[i]);
        if (whiting[i].type.includes("10-12"))
            tenTwelves.push(whiting[i]);
        if (whiting[i].type.includes("12-16"))
            twelvesSixteens.push(whiting[i]);
        if (whiting[i].type.includes("20"))
            twenties.push(whiting[i]);
        if (whiting[i].type.includes("25"))
            twentyFives.push(whiting[i]);
        if (whiting[i].type.includes("30"))
            thirties.push(whiting[i]);
        if (whiting[i].type.includes("35"))
            thirtyFives.push(whiting[i]);
        if (whiting[i].type.includes("40"))
            forties.push(whiting[i]);
        if (whiting[i].type.includes("45"))
            fortyfives.push(whiting[i]);
        if (whiting[i].type.includes("50"))
            fifties.push(whiting[i]);
    }

    // console.log("cod = ", cod);
    // console.log("haddock = ", haddock);
    // console.log("8/10 = ", eightTens);

    var countSizes = [eightTens, tenTwelves, twelvesSixteens, twenties, twentyFives, thirties, thirtyFives, forties, fortyfives, fifties];
    // seperate the types into sections

    var countsList = "";
    countsList = "<div class='counts_table_cont'>"
    for (var c = 0; c < countSizes.length; c++) {

        for (var w = 0; w < countSizes[c].length; w++) {

            // create labels and list
            var type = countSizes[c][w].type.split("_");
            var fish = type[0];
            var size = type[2];
            type = `${fish} ${size}`;                
            var total = 0;
            // start list
            countsList += "<table>";
            countsList += "<thead>";
            countsList += "<th>Restaurants</th>"; // create headers
            countsList += `<th>${fish} ${size}s</th>`;
            countsList += "</thead>";

            // start list body
            countsList += "<tbody>"

            // start labels
            fishAndOrders += "<pdfItem>";
            fishAndOrders += `<h3>${fish} ${size}s</h3>`;
            
            var indOrders = countSizes[c][w].qty.trim().split(",");
    
            fishAndOrders += "<values>";
            for (var o = 0; o < indOrders.length; o++) {
                
                var vac = "";
                var value = indOrders[o].split("-")[0];
                var rest = indOrders[o].split("-")[1].split("/")[0].replaceAll("_", " ");

                if (indOrders[o].split("/").length == 2) {
                    vac = indOrders[o].split("/")[1];
                }      

                // for labels
                fishAndOrders += '<div class="count_label">' +
                `<span>${rest}</span>` +
                `<span>${value} x ${size}s ${vac}</span>` +
                '</div>';
                console.log(size)
                // build list
                countsList += '<tr>' +
                    `<td>${rest}</td>` +
                    `<td>${value} ${vac}</td>` +
                    '</tr>';

                total += Number(value);
            }

            // totals
            var totalInStones;
            switch (size) {
                case "8-10":
                    totalInStones = ((total * 285) / 6350).toFixed(2);
                    break;
                case "10-12":
                    totalInStones = ((total * 340) / 6350).toFixed(2);
                    break;
                case "12-16":
                    totalInStones = ((total * 454) / 6350).toFixed(2);
                    break;
                default: 
                    totalInStones = (total / Number(size)).toFixed(2);
                    break;
            }
            
            countsList += '<tr class="final_row">' +
                '<td><strong>Total</strong></td>' +
                `<td><strong>${total} or ${totalInStones}st</strong></td>` +
                '</tr>';

            // end List
            countsList += "</tbody>";
            countsList += "</table>";

            // end labels
            fishAndOrders += "</values>";
            fishAndOrders += "</pdfItem>";
        }
    }    

    // close counts list
    countsList += '</div>';
    element.innerHTML += countsList;
    element.innerHTML += fishAndOrders;
    fishAndOrders = "";
    countsList = "";

    var date = new Date().toLocaleDateString();
    html2pdf(element, {
        filename: "counts_" + date + ".pdf", 
        html2canvas: { scale: 5}, 
        pagebreak: { mode: 'css', avoid: ['.count_label', 'span', 'h3', 'table' ] }
    });
}

function printMisc(miscObj) {
    //console.log("misc = ", miscObj)

    var brill = [];
    var cod = [];
    var coley = [];
    var dorade = [];
    var dovers = [];
    var fishpie = [];
    var hake = [];
    var halibut = [];
    var lemonsole = [];
    var mackerel = [];
    var monkfish = [];
    var plaice = [];
    var pollock = [];
    var octopus = [];
    var sardines = [];
    var seatrout = [];
    var shark = [];
    var smokedhaddock = [];
    var sword = [];
    var squid = [];
    var trout = [];
    var tuna = [];
    var wildbass = [];

    for (var f = 0; f < miscObj.length; f++) {
        if (miscObj[f].type.includes("brill"))
            brill.push(miscObj[f]);
        if (miscObj[f].type.includes("cod"))
            cod.push(miscObj[f]);
        if (miscObj[f].type.includes("coley"))
            coley.push(miscObj[f]);
        if (miscObj[f].type.includes("dorade"))
            dorade.push(miscObj[f]);
        if (miscObj[f].type.includes("dovers"))
            dovers.push(miscObj[f]);
        if (miscObj[f].type.includes("fishpie"))        
            fishpie.push(miscObj[f]);
        if (miscObj[f].type.includes("hake"))
            hake.push(miscObj[f]);
        if (miscObj[f].type.includes("halibut"))
            halibut.push(miscObj[f]);
        if (miscObj[f].type.includes("lemonsole"))
            lemonsole.push(miscObj[f]);
        if (miscObj[f].type.includes("mackerel"))
            mackerel.push(miscObj[f]);
        if (miscObj[f].type.includes("monkfish"))
            monkfish.push(miscObj[f]);
        if (miscObj[f].type.includes("plaice"))
            plaice.push(miscObj[f]);
        if (miscObj[f].type.includes("pollock"))
            pollock.push(miscObj[f]);
        if (miscObj[f].type.includes("octopus"))
            octopus.push(miscObj[f]);
        if (miscObj[f].type.includes("sardines"))
            sardines.push(miscObj[f]);
        if (miscObj[f].type.includes("seatrout"))
            seatrout.push(miscObj[f]);
        if (miscObj[f].type.includes("shark"))
            shark.push(miscObj[f]);
        if (miscObj[f].type.includes("smoked-haddock"))
            smokedhaddock.push(miscObj[f]);
        if (miscObj[f].type.includes("sword"))
            sword.push(miscObj[f]);
        if (miscObj[f].type.includes("squid"))
            squid.push(miscObj[f]);
        if (miscObj[f].type.includes("trout"))
            trout.push(miscObj[f]);
        if (miscObj[f].type.includes("tuna"))
            tuna.push(miscObj[f]);
        if (miscObj[f].type.includes("wildbass"))
            wildbass.push(miscObj[f]);        
    }
    
    var fishObj = [brill, cod, coley, dorade, dovers, fishpie, hake, halibut, lemonsole, 
        mackerel, monkfish, plaice, pollock, octopus, sardines, seatrout, shark, smokedhaddock,
        sword, squid, trout, tuna, wildbass];

    var element = document.getElementById("element-to-print-misc");    

    element.innerHTML = "<h1>Misc</h1>";
    var fishAndOrders = "";    

    for (var x = 0; x < fishObj.length; x ++) {
    // seperate the types into sections
        for (var w = 0; w < fishObj[x].length; w++) {
            var type = fishObj[x][w].type.split("_");
            switch(type.length) {
                case 2:
                    var fish = type[0];
                    var cut = type[1];
                    if (type[0].includes("tuna") || type[0].includes("sword")) {
                        
                        type = type[0] + " " + type[1] + "oz";
                    } else {
                        type = `${fish} ${cut}`;
                    }

                    break;
                case 3:
                    var fish = type[0];
                    var size = type[1] + "oz";
                    var cut = type[2];
                    type = `${fish} ${size} ${cut}`
                    break;            
            }

            fishAndOrders += "<pdfItem>" +
            "<h4>" + type + "</h4>";
            
            var indOrders = fishObj[x][w].qty.trim().split(",");

            fishAndOrders += "<values>";
            for (var o = 0; o < indOrders.length; o++) {
                var value = indOrders[o];
                if (value == "0.5")
                    value = "1/2";
                fishAndOrders += '<span> ' + value + ' </span>';
            }
            fishAndOrders += "</values>";
            fishAndOrders += "</pdfItem>";
        }
    }    

    element.innerHTML += fishAndOrders;
    fishAndOrders = "";

    var date = new Date().toLocaleDateString();
    html2pdf(element, {
        filename: "miscFish-" + date + ".pdf", 
        html2canvas: { scale: 5},
        pagebreak: { mode: 'css', avoid: ['.count_label', 'span', 'h3' ] }
    });
}

function togglePanel(el) {

    var thisId = el.parentNode.parentNode;
    var panelSection = document.querySelector(`.${thisId.classList[0]} .fish_variation_cont`);

    if (panelSection.style.display != "none") {
        panelSection.style.display = "none"
        el.innerText = "+";

    } else {
        panelSection.style.display = "flex";
        el.innerText = "-";
    }
}

function closeThisPanel(fishId) {
    document.getElementById(`${fishId}_cont`).style.display = "none";
    //console.log("inner = ", fishId);

    var sideListElSelected = document.querySelectorAll(".sidebar_selected");
    var el;
    for (var i = 0; i < sideListElSelected.length; i++) {
        var selected = sideListElSelected[i].innerText.toLowerCase();
        var cleanFish = fishId.replaceAll("_", " ");
        if (selected == cleanFish) {
            el = sideListElSelected[i];
        }
    }

    var p = el.childNodes[1];
    if (!el.classList.contains("sidebar_selected")) {
        el.classList.add("sidebar_selected");
        p.classList.replace("fa-caret-down", "fa-caret-right");
        //el.className.replace("fa-caret-down", "fa-caret-right");
    } else {
        el.classList.remove("sidebar_selected");
        p.classList.replace("fa-caret-right", "fa-caret-down");
    }
}

// plan out how this will save properly
function selectFish(el) {
    // add selected class to anchor
    var fishId = el.innerText.toLowerCase().replaceAll(" ", "");
    //console.log("inner = ", fishId);
    var p = el.childNodes[1];
    if (!el.classList.contains("sidebar_selected")) {
        el.classList.add("sidebar_selected");
        p.classList.replace("fa-caret-down", "fa-caret-right");
        //el.className.replace("fa-caret-down", "fa-caret-right");
    } else {
        el.classList.remove("sidebar_selected");
        p.classList.replace("fa-caret-right", "fa-caret-down");
    }

    // show selection options
    var fishCont = document.getElementById(`${fishId}_cont`);

    if (fishCont.style.display == "flex")
        fishCont.style.display = "none";
    else
        fishCont.style.display = "flex";

    //scroll to position  
          
}

function getWeight(weight, numberOfPortions) {
    var grams = 28; // 1 oz = 28 grams
    var weightInGrams = weight * grams;

    var totalInGrams = weightInGrams * numberOfPortions;

    return totalInGrams
}

function addSelectionToLocal(fish, value) {
    var selectionType;

    // find fish by removing the name from any extra information
    var fishName = fish.split("_")[0];
    switch (fishName) {
        // find type and other information
        case "salmon":
            var vac = document.getElementById("salmon_vac").value;
            var amount = Number(value.replace("k","").split("-")[0]);
            selectionType = document.getElementById("salmon_type_select").value;
            fish = fish + "_" + selectionType;
            if (vac != "")
                value = value + "-" + vac;

            // add to totals
            if (fish.split("_").length == 3) {
                var portionWeight = fish.split("_")[1];
                var totalWeight = getWeight(portionWeight, Number(amount)); // returns grams
                salmonWeight.qty += totalWeight;
            } else {
                if (value.includes("k")) {                    
                    salmonWeight.qty += (amount * 1000)
                } else {
                salmonSides.qty += Number(amount);
                }
            }
            console.log("salmon = ", salmonSides, salmonWeight);
            break;
        case "cod":
            var vac = document.getElementById("cod_vac").value;
            var amount = Number(value.replace("k","").split("-")[0]);
            selectionType = document.getElementById("cod_type_select").value;
            fish = fish + "_" + selectionType;
            if (vac != "")
                value = value + "-" + vac;

                // add to totals
            if (fish.split("_").length == 3) {
                var portionWeight = fish.split("_")[1];
                var totalWeight = getWeight(portionWeight, amount); // returns grams
                codWeight.qty += totalWeight;
            } else {
                if (value.includes("k")) {                    
                    codWeight.qty += (amount * 1000)
                } else {
                cod.qty += Number(amount);
                }
            }
            console.log("cod = ", cod, codWeight);
            break;
        case "counts":
            //debugger;
            var vac = document.getElementById("counts_vac").value;
            var typeOFish = document.getElementById("counts_fish").value;
            var restaurant = document.getElementById("counts_custom_rest").value != "" ? document.getElementById("counts_custom_rest").value : document.getElementById("counts_cust").value
            selectionType = document.getElementById("counts_type_select").value;
            fish = typeOFish + "_" + fish + "_" + selectionType;            
            if (vac != "") {
                value = value + "-" + restaurant.replaceAll(" ", "_") + "/" + vac;
            } else {
                value = value + "-" + restaurant.replaceAll(" ", "_");
            }

            document.getElementById("counts_custom_rest").value = ""
            break;

        case "hake":
            var vac = document.getElementById("hake_vac").value;
            var amount = Number(value.replace("k","").split("-")[0]);
            selectionType = document.getElementById("hake_type_select").value;
            fish = fish + "_" + selectionType;
            if (vac != "")
                value = value + "-" + vac;

            if (fish.split("_").length == 3) {
                var portionWeight = fish.split("_")[1];
                var totalWeight = getWeight(portionWeight, amount); // returns grams
                hakeWeight.qty += totalWeight;
            } else {
                if (value.includes("k")) {                    
                    hakeWeight.qty += (amount * 1000)
                } else {
                hake.qty += Number(amount);
                }
            }
            console.log("cod = ", hake, hakeWeight);
            break;

        case "coley":            
            var vac = document.getElementById("coley_vac").value;
            var amount = Number(value.replace("k","").split("-")[0]);
            selectionType = document.getElementById("coley_type_select").value;
            fish = fish + "_" + selectionType;
            if (vac != "")
                value = value + "-" + vac;

            if (fish.split("_").length == 3) {
                var portionWeight = fish.split("_")[1];
                var totalWeight = getWeight(portionWeight, amount); // returns grams
                coleyWeight.qty += totalWeight;
            } else {
                if (value.includes("k")) {                    
                    coleyWeight.qty += (amount * 1000)
                } else {
                coley.qty += Number(amount);
                }
            }
            console.log("cod = ", coley, coleyWeight);

            break;

        case "seatrout":
            var vac = document.getElementById("seatrout_vac").value;
            var amount = Number(value.replace("k","").split("-")[0]);
            selectionType = document.getElementById("seatrout_type_select").value;
            fish = fish + "_" + selectionType;
            if (vac != "")
                value = value + "-" + vac;

            if (fish.split("_").length == 3) {
                var portionWeight = fish.split("_")[1];
                var totalWeight = getWeight(portionWeight, amount); // returns grams
                seatroutWeight.qty += totalWeight;
            } else {
                if (value.includes("k")) {                    
                    seatroutWeight.qty += (amount * 1000)
                } else {
                seatrout.qty += Number(amount);
                }
            }
            console.log("cod = ", seatrout, seatroutWeight);
            break;

        case "pollock":
            var vac = document.getElementById("pollock_vac").value;
            var amount = Number(value.replace("k","").split("-")[0]);
            selectionType = document.getElementById("pollock_type_select").value;
            fish = fish + "_" + selectionType;
            if (vac != "")
                value = value + "-" + vac;

            if (fish.split("_").length == 3) {
                var portionWeight = fish.split("_")[1];
                var totalWeight = getWeight(portionWeight, amount); // returns grams
                pollockWeight.qty += totalWeight;
            } else {
                if (value.includes("k")) {                    
                    pollockWeight += (amount * 1000)
                } else {
                pollock.qty += Number(amount);
                }
            }
            console.log("cod = ", pollock, pollockWeight);
            break;

        case "wildbass":
            var vac = document.getElementById("wildbass_vac").value;
            var amount = Number(value.replace("k","").split("-")[0]);
            selectionType = document.getElementById("wildbass_type_select").value;
            fish = fish + "_" + selectionType;
            if (vac != "")
                value = value + "-" + vac;

            if (fish.split("_").length == 3) {
                var portionWeight = fish.split("_")[1];
                var totalWeight = getWeight(portionWeight, amount); // returns grams
                wildbassWeight.qty += totalWeight;
            } else {
                if (value.includes("k")) {                    
                    wildbassWeight.qty += (amount * 1000)
                } else {
                wildbass.qty += Number(amount);
                }
            }
            console.log("cod = ", wildbass, wildbassWeight);
            break;
        case "seaBass":
           // debugger;
            var vac = document.getElementById("bass_vac").value;
            selectionType = "";
            value += vac;
            break;
        case "seaBassWhole":
            //debugger;
            var vac = document.getElementById("bass_vac").value;
            selectionType = document.getElementById("seabass-extra-options").value;
            var size = document.getElementById("seaBass_portion_weight").value;
            fish = fish + "_" + size;
            if (selectionType != "normal")
                value = value + "-" + selectionType;          
            value += vac;
            break;
        case "dorade":
            //debugger;
            var vac = document.getElementById("dorade_vac").value;
            selectionType = "";
            value += vac;
            break;
        case "doradeWhole":   
            //debugger;   
            var vac = document.getElementById("dorade_vac").value;
            selectionType = document.getElementById("dorade-extra-options").value;
            var size = document.getElementById("dorade_portion_weight").value;
            fish = fish + "_" + size;
            if (selectionType != "normal")
                value = value + "-" + selectionType; 
            value += vac;
            break;
            
        case "brill":
            
            var vac = document.getElementById("brill_vac").value;
            var amount = Number(value.replace("k","").split("-")[0]);
            selectionType = document.getElementById("brill_type_select").value;
            fish = fish + "_" + selectionType;
            if (vac != "")
                value = value + "-" + vac;

            if (fish.split("_").length == 3) {
                var portionWeight = fish.split("_")[1];
                var totalWeight = getWeight(portionWeight, amount); // returns grams
                brillWeight.qty += totalWeight;
            } else {
                if (value.includes("k")) {                    
                    brillWeight.qty += (amount * 1000)
                } else {
                brill.qty += Number(amount);
                }
            }
            console.log("cod = ", brill, brillWeight);
            break;

        case "fishpie":

            var vac = document.getElementById("fishpie_vac").value;
            var amount = Number(value);  
            selectionType = document.getElementById("piemix_type").value;
            if (selectionType != "")
                fish = fish + "_"+ selectionType;
            value += "k" + vac;

            if (fish.includes("salmon")) {
                fishpieSalmon.qty += amount;
            } else if (fish.includes("white")) {
                fishpieWhite.qty += amount
            } else {
                fishpie.qty += amount
            }
            console.log("cod = ", fishpie, fishpieSalmon, fishpieWhite);
            break;
            
        case "squid":
            var vac = document.getElementById("squid_vac").value;
            var amount = Number(value.replaceAll("k", ""));
            selectionType = document.getElementById("squid_type").value;
            fish = fish  + "-"+ selectionType;
            value += vac;
            squid.qty += amount;
            console.log("squid", squid);

            break;
        case "octopus":
            //debugger;
            var vac = document.getElementById("octopus_vac").value;
            selectionType = document.getElementById("octopus_type").value;
            fish = fish  + "-"+ selectionType;
            value += vac;
            break;
        case "smoked-haddock":
            //debugger;
            var vac = document.getElementById("smokedhaddock_vac").value;
            selectionType = document.getElementById("smoked-haddock_type_select").value;
            fish = fish  + "_"+ selectionType;
            value += vac;
            break;
        case "halibut":
           // debugger;
            var vac = document.getElementById("halibut_vac").value;
            selectionType = document.getElementById("halibut_type_select").value;
            fish = fish  + "_"+ selectionType;
            value += vac;
            break;
        case "monkfish":
           // debugger;
            var vac = document.getElementById("monkfish_vac").value;
            selectionType = document.getElementById("monkfish_type_select").value;
            fish = fish  + "_"+ selectionType;
            value += vac;
            break;
        case "lemonsole":
           // debugger;
            var vac = document.getElementById("lemonsole_vac").value;
            selectionType = document.getElementById("lemonsole_type_select").value;
            fish = fish  + "_"+ selectionType;
            value += vac;
            break;
        case "plaice":
           // debugger;
            var vac = document.getElementById("plaice_vac").value;
            selectionType = document.getElementById("plaice_type_select").value;
            fish = fish  + "_"+ selectionType;
            value += vac;
            break;
        case "mackerel":
            //debugger;
            var vac = document.getElementById("mackerel_vac").value;
            selectionType = document.getElementById("mackerel_type_select").value;
            fish = fish  + "_"+ selectionType;  
            value += vac;
            break;
        case "trout":
           // debugger;
            var vac = document.getElementById("trout_vac").value;
            selectionType = document.getElementById("trout_type_select").value;
            fish = fish  + "_"+ selectionType;  
            value += vac;
            break;
        case "sardines":
           // debugger;
            var vac = document.getElementById("sardines_vac").value;
            selectionType = document.getElementById("sardines_type_select").value;
            fish = fish  + "_"+ selectionType;  
            value += vac;
            break;
        case "shark":
           // debugger;
            var vac = document.getElementById("shark_vac").value;
            selectionType = document.getElementById("shark_type_select").value;
            fish = fish  + "_"+ selectionType;
            value += vac;
            break;
        case "dovers":
           // debugger;
            var vac = document.getElementById("dover_vac").value;
            selectionType = document.getElementById("dovers_type_select").value;
            fish = fish  + "_"+ selectionType;
            value += vac;
            break;

    }

    if (localStorage.getItem(fish) == null) {
        var local = value + " ";
        localStorage.setItem(fish, local);
        
    } else {
        var local = localStorage.getItem(fish);
        local = local.split(" ");
        local += value + " ";

        window.localStorage.setItem(fish, local);
    }

    document.getElementById("itemAddedText").innerHTML = value.replaceAll("_", " ").replaceAll("-", " ")  + "<br /> " + fish.replaceAll("_", " ");
    document.getElementById("selectSuccess").style.display = "flex";

    setTimeout(function() {
        document.getElementById("selectSuccess").style.display = "none";
    }, 3000);
    //console.log("Local = ", localStorage);
    //CHANGING THE FISH PASSED IN WILL SAVE THE NEW FISH TO LOCAL STORAGE
    // split the local storage into the array
    //localStorage.salmon.trim().split(",");
}

function addPortionsToLocal(fish, value) {
    
    var spec = document.getElementById(`${fish}_portion_spec`).value;
    if (fish != "mackerel") {
        var porSize = document.getElementById(`${fish}_portion_weight`).value
        fish = fish + "_" + porSize;
    }
    
    if (spec != "normal")
        value = value + "-" + spec;

    addSelectionToLocal(fish, value);
}

function addFishToLocal(fish, value) {
    var spec = document.getElementById(`${fish}_portion_spec`).value;    
    
    if (spec != "normal")
        value = value + "-" + spec;

    addSelectionToLocal(fish, value);
}

function addCustomToLocal(inputId) {
    var fish = inputId.split("_")[0];
    var value = document.getElementById(`${inputId}`).value; // add space so there it can be split

    if (inputId == "smoked-haddock_custom" || inputId == "halibut_custom" 
    || inputId == "monkfish_custom" || inputId == "lemonsole_custom_por"
    || inputId == "plaice_custom_por" || inputId == "mackerel_custom"
    || inputId == "trout_custom" || inputId == "sardines_custom"
    || inputId == "shark_custom" || inputId == "tuna_custom" 
    || inputId == "sword_custom" || inputId == "squid_custom"
    || inputId == "octopus_custom" || inputId == "cod_custom_weight" || inputId == "hake_custom_weight"
    || inputId == "coley_custom_weight" || inputId == "salmon_custom_weight" || inputId == "seatrout_custom_weight"
    || inputId == "pollock_custom_weight" || inputId == "wildbass_custom_weight" || inputId == "brill_custom_weight") {
        value = value + "k";
    }
    
    addSelectionToLocal(fish, value);
    document.getElementById(`${inputId}`).value = "";
}

function addCustomPortions(inputId) {
    var fish = inputId.split("_")[0];

    var value = document.getElementById(`${fish}_custom_por`).value;
    var spec = document.getElementById(`${fish}_portion_spec`).value;
    var porSize = document.getElementById(`${fish}_portion_weight`).value

    fish = fish + "_" + porSize;
    if (spec != "normal")
        value = value + "-" + spec;

    document.getElementById(`${inputId}`).value = "";
    addSelectionToLocal(fish, value);
}

function addCustomFish(inputId) {
    var fish = inputId.split("_")[0];

    var spec = document.getElementById(`${fish}_portion_spec`).value;
    var value = document.getElementById(`${inputId}`).value;

    if (inputId == "sardines_custom" || inputId == "dovers_custom")
        value = value + "k";
    
    if (spec != "normal")
        value = value + "-" + spec;   

    document.getElementById(`${inputId}`).value = "";
    addSelectionToLocal(fish, value);

}