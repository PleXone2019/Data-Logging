#Google Sheets scripts

Some scripts I wrote using Google Apps Script for plotting dynamic data in Sheets.I used these to plot temperature and humidity collected from my Raspberry Pi.

Use **dynamicStatter.gs** to plot a single or multiple columns of dynamic data in a single chart. 

Use **dynamicScatter2.gs** to create 2 different charts of dynamic data, each plotting multiple columns, if needed. The two charts can plot data from non-contiguous columns (the (multi-)columns each chart uses need to be contiguous though, due to Google Apps script limitations). The charts can automatically be placed onto a new worksheet.

The scripts are customizable and allow fine-grained control over the chart plotting parameters. (color, font size, etc).

Comments and suggestions welcome.

(C) Sujay Phadke, 2015.
