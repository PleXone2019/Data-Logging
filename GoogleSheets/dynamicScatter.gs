// ref: http://eric.sau.pe/google-spreadsheet-graph-with-dynamic-data/
//Runs on document open
function onOpen() {
  createGraph();
};
 
//Runs on any edit
function onEdit() {
  createGraph();
}
 
/**
 * This function reads the data in the Totals columns
 */
function createGraph() {
  var tabName = 'Sheet1';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName); // This grabs the tab with the name stored in tabName.
    // Read variables
    // Legend text is taken from entries in row 1
    var startRow = 1;  // What row to start reading at
    var startColumn = 1;  // What column to start reading
    var numOfColumns = 3;  // Number of columns to read
 
    // Graph variables
    var posX = 5;  // Column to anchor graph to
    var posY = 3;  // Row to anchor graph to
    var width = 600; // Graph Width
    var xTitle = 'Time'; // XAxis Title
    var yTitle = 'Quantity'; // YAxis Title
    var chartType = Charts.ChartType.SCATTER; // Chart Type

    var colBlue = '#0266C8'
    var colRed = '#F90101'
    var colYellow = '#F2B50F'
    var colGreen = '#00933B'

    var range = sheet.getRange(startRow, startColumn, sheet.getLastRow(), numOfColumns);
 
    //If charts already exist, update them
    if (sheet.getCharts().length > 0){
      var chart = sheet.getCharts()[0];
      chart = chart.modify()
      .removeRange(chart.getRanges()[0])
      .addRange(range)
      //.setPosition(posY, posX, 0, 0)
      //.setOption('legend', {position: 'bottom', textStyle: {color: 'black', fontSize: 16}})
      //.setOption('width', width)
      //.setOption('vAxis.title', yTitle)
      //.setOption('hAxis.title', xTitle)
      //.setChartType(chartType)
      .build();
      sheet.updateChart(chart);
    }
    //If not, create them
    else {
      // ref: undocumented chart options
      // https://groups.google.com/forum/#!topic/google-visualization-api/Iq96a6Uip0k
      var chartBuilder = sheet.newChart();
      chartBuilder.addRange(range)
      .setPosition(posY, posX, 0, 0)
      .setOption('title', 'DHT22 logging Temperature and Humidity on a Raspberry Pi')
      .setOption('titleFontSize', 20)
      .setOption('titleColor', colGreen)
      .setOption('legend', {position: 'bottom', textStyle: {color: 'black', fontSize: 16}})
      .setOption('tooltipFontSize', 12)
      .setOption('width', width)
      .setOption('vAxis.title', yTitle)
      .setOption('vAxis.titleColor', colYellow)
      .setOption('vAxis.titleFontSize', 18)
      .setOption('hAxis.title', xTitle)
      .setOption('hAxis.titleColor', colYellow)
      .setOption('hAxis.titleFontSize', 18)
      .setChartType(chartType);
      sheet.insertChart(chartBuilder.build());
    }
}

//return true;

