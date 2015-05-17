// Original script by Eric Saupe:
// http://eric.sau.pe/google-spreadsheet-graph-with-dynamic-data/
// Modified by Sujay Phadke, 2015
//
// Creates 2 scatter plots from a spreadsheet with variable
// number of rows

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
  
    var dataName = 'Sheet1';
    var chartName = 'Sheet2';
    var ss = SpreadsheetApp.getActiveSpreadsheet();
  
    var dataSheet = ss.getSheetByName(dataName);
   
    // try-catch trick to check for existing sheet
    // https://productforums.google.com/forum/#!topic/docs/-JmsVUBGcRY
    try {
      ss.setActiveSheet(ss.getSheetByName(chartName));
    }
    catch (e) {
      ss.insertSheet(chartName);
    }
    var chartSheet = ss.getSheetByName(chartName);
  
    // Read variables
    // Legend text is taken from entries in row 1
    var startRow = 1;  // What row to start reading at
    var startColumn1 = 1;  // What column to start reading
    var startColumn2 = 3;  // What column to start reading
    var numOfColumns = 2;  // Number of columns to read
 
    // Graph variables
    var posX1 = 5;  // Column to anchor graph to
    var posY1 = 2;  // Row to anchor graph to  
    var width1 = 500; // Graph Width
    var xTitle1 = 'Time'; // XAxis Title
    var yTitle1 = 'Temperature (°C)'; // YAxis Title
    var chartType1 = Charts.ChartType.SCATTER; // Chart Type
  
    var posX2 = 10;  // Column to anchor graph to
    var posY2 = 2;  // Row to anchor graph to
    var width2 = 500; // Graph Width
    var xTitle2 = 'Time'; // XAxis Title
    var yTitle2 = 'Humidity (%)'; // YAxis Title
    var chartType2 = Charts.ChartType.SCATTER; // Chart Type

    var colBlue = '#0266C8'
    var colRed = '#F90101'
    var colYellow = '#F2B50F'
    var colGreen = '#00933B'

    var range1 = dataSheet.getRange(startRow, startColumn1, dataSheet.getLastRow(), numOfColumns);
    var range2 = dataSheet.getRange(startRow, startColumn2, dataSheet.getLastRow(), numOfColumns);
  
    //If charts already exist, update them
    if (dataSheet.getCharts().length > 0){
      
      var chart = chartSheet.getCharts()[0];
      chart = chart.modify()
      .removeRange(chart.getRanges()[0])
      .addRange(range1)
      //.setPosition(posY, posX, 0, 0)
      //.setOption('legend', {position: 'bottom', textStyle: {color: 'black', fontSize: 16}})
      //.setOption('width', width)
      //.setOption('vAxis.title', yTitle)
      //.setOption('hAxis.title', xTitle)
      //.setChartType(chartType)
      .build();
      chartSheet.updateChart(chart);
  
      var chart = chartSheet.getCharts()[1];
      chart = chart.modify()
      .removeRange(chart.getRanges()[0])
      .addRange(range2)
      //.setPosition(posY, posX, 0, 0)
      //.setOption('legend', {position: 'bottom', textStyle: {color: 'black', fontSize: 16}})
      //.setOption('width', width)
      //.setOption('vAxis.title', yTitle)
      //.setOption('hAxis.title', xTitle)
      //.setChartType(chartType)
      .build();
      chartSheet.updateChart(chart);
    }
  
    //If not, create them
    else {
      // ref: undocumented chart options
      // https://groups.google.com/forum/#!topic/google-visualization-api/Iq96a6Uip0k
      
      var chartBuilder = chartSheet.newChart();
      chartBuilder.addRange(range1)
      .setPosition(posY1, posX1, 0, 0)
      .setOption('title', 'DHT22 logging Temperature on a Raspberry Pi')
      //.setOption('titleFontSize', 20)
      //.setOption('titleColor', colGreen)
      .setOption('titleTextStyle', {color: colGreen, fontName: 'Arial', fontSize: '20', fontWidth: 'normal'})
      //.setOption('legend', {position: 'bottom', textStyle: {color: 'black', fontSize: 16}})
      .setOption('legend', {position: 'none'})
      .setOption('tooltipFontSize', 12)
      .setOption('width', width1)
      .setOption('vAxis.title', yTitle1)
      .setOption('vAxis.titleColor', colYellow)
      .setOption('vAxis.titleFontSize', 18)
      .setOption('hAxis.title', xTitle1)
      .setOption('hAxis.titleColor', colRed)
      .setOption('hAxis.titleFontSize', 18)
      .setOption('pointSize', 2)
      .setOption('lineWidth', 1)
      .setChartType(chartType1);
      chartSheet.insertChart(chartBuilder.build());
      
      var chartBuilder = chartSheet.newChart();
      chartBuilder.addRange(range2)
      .setPosition(posY2, posX2, 0, 0)
      .setOption('title', 'DHT22 logging Relative Humidity on a Raspberry Pi')
      //.setOption('titleFontSize', 20)
      //.setOption('titleColor', colGreen)
      .setOption('titleTextStyle', {color: colGreen, fontName: 'Arial', fontSize: '20', fontWidth: 'normal'})
      //.setOption('legend', {position: 'bottom', textStyle: {color: 'black', fontSize: 16}})
      .setOption('legend', {position: 'none'})
      .setOption('tooltipFontSize', 12)
      .setOption('width', width1)
      .setOption('vAxis.title', yTitle2)
      .setOption('vAxis.titleColor', colYellow)
      .setOption('vAxis.titleFontSize', 18)
      //.setOption('vAxis', {maxValue: 10, format: '0.00'})
      .setOption('hAxis.title', xTitle2)
      .setOption('hAxis.titleColor', colRed)
      .setOption('hAxis.titleFontSize', 18)
      .setOption('pointSize', 2)
      .setOption('lineWidth', 1)
      .setChartType(chartType2);
      chartSheet.insertChart(chartBuilder.build());
      
    }
  
    return true;
}
