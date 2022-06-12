function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });


    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
};

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sample_data=data.samples;
    var metadata = data.metadata;

 

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var results_arr = sample_data.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    
    
    var result = results_arr[0];
  
    var metadata = metadata.filter(sampleObj => sampleObj.id == sample);
    var metadata = metadata[0];
    var metadata = metadata.wfreq


  
    





    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids
    var otu_labels = result.otu_labels
    var sample_values = result.sample_values
  
  
  
    
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    //  so the otu_ids with the most bacteria are last.
    var sorted_ids = otu_ids.sort((a,b) =>
    a.sample_values - b.sample_values);
    var top_10_ids = sorted_ids.slice(0,10);
    var mapped_ids = top_10_ids.map(String);
    //var mapped_ids = top_10_ids.map(i => 'otu' + i);
    for (var i=mapped_ids.length; i--;){
      mapped_ids[i] = 'Otu ' + mapped_ids[i];
    };

    var sorted_samples = sample_values.sort((a,b) =>
    a.sample_values - b.sample_values);

    var top_10_samples = sorted_samples.slice(0,10);
    var sorted_10_samples = top_10_samples
    var bar_info = {
      'samples': top_10_samples, 
      'ids': mapped_ids
    };
  

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: bar_info['samples'].reverse(),
      y: bar_info['ids'].reverse(),
      type: "bar",
      orientation: 'h'

    };
    

      
    // 9. Create the layout for the bar chart. 
    var layout = {
      title: 'Top 10 Bacteria Types',
      xaxis: {title: 'Sample values'},
      yaxis: {title: 'IDs'}
    };
  
  



     
    
    //10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar',[trace], layout);

    // for (var i=otu_ids.length; i--;){
    //   otu_ids[i] = 'Otu ' + otu_ids[i];
    // };

    var bubbletrace = {
      type: "bubble",
      mode: 'markers',
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      marker: {
        size: sample_values,
        color: otu_ids
      }
    };
    var bubbleData = [bubbletrace];

    var bubbleLayout = {
      title: 'Cultures Per Sample',
      xaxis: {
        title: {
          text: 'OTU ID Number'
        }
      },
      hovermode: 'closest'
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    var gaugeData = [
      {
        domain: {x: [0,1], y: [0,1]},
        value: metadata,
        title: {text: "Wash frequency"},
        type: 'indicator',
        mode: 'gauge+number',
        gauge: {
          axis: {range: [null, 10]},
          bar: {color: 'black'},
          steps: [
            { range: [0, 2], color: "red"},
            { range: [2, 4], color: "orange"},
            { range: [4, 6], color: "yellow"},
            { range: [6, 8], color: "lightgreen"},
            { range: [8, 10], color: "green"}

          ]
        }
      }
     
     ];
    
     // 5. Create the layout for the gauge chart.
     var gaugeLayout = { width: 500, height: 400, margin: {t: 0, b: 0}};

     // 6. Use Plotly to plot the gauge data and layout.
     Plotly.newPlot('gauge',gaugeData,gaugeLayout);


    
  });
  
};
// // Create a variable that holds the samples array. 

//     // Create a variable that filters the samples for the object with the desired sample number.

//     // 1. Create a variable that filters the metadata array for the object with the desired sample number.

//     // Create a variable that holds the first sample in the array.
  

//     // 2. Create a variable that holds the first sample in the metadata array.
    

//     // Create variables that hold the otu_ids, otu_labels, and sample_values.


//     // 3. Create a variable that holds the washing frequency.

//     // Create the yticks for the bar chart.

//     // Use Plotly to plot the bar data and layout.
//     Plotly.newPlot();
    
//     // Use Plotly to plot the bubble data and layout.
//     Plotly.newPlot();
   
    
//     // 4. Create the trace for the gauge chart.
     var gaugeData = [
      {
        domain: {x: [0,1], y: [0,1]},
        value: metadata,
        title: {text: "Wfreq"},
        type: 'indicator',
        mode: 'gauge+number'
      }
     
     ];
    
//     // 5. Create the layout for the gauge chart.
     var gaugeLayout = {
      width: 600,
      height: 500,
      margin: {t: 0, b: 0} 
     
     };

//     // 6. Use Plotly to plot the gauge data and layout.
     Plotly.newPlot('gauge',guagedata.gaugeLayout);
  // });
// }

// // // Bar and Bubble charts
// // // Create the buildCharts function.
// // function buildCharts(sample) {
// //   // Use d3.json to load and retrieve the samples.json file 
// //   d3.json("samples.json").then((data) => {
// //     var sample_data=data.samples;
// //     var results_arr = sample_data.filter(sampleObj => sampleObj.id == sample);
// //     var result = results_arr[0];
// //     var otu_ids = result.otu_ids
// //     var otu_labels = result.otu_labels
// //     var sample_values = result.sample_values
    

// //     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
// //     //Plotly.newPlot('bar', data, layout); 

// //     // 1. Create the trace for the bubble chart.
// //     var bubbleData = {
// //       x: otu_ids,
// //       y: sample_values,
// //       text: otu_labels,
// //       mode: 'markers',
// //       marker: {
// //         size: [sample_values],
// //         color: otu_ids
// //       }
   
// //     };

// //     // 2. Create the layout for the bubble chart.
// //     var bubbleLayout = {
// //       Title: 'my bubble',
// //       xaxis: 'ID',
// //       yaxis: 'Samples',
// //       hovermode: [otu_ids, sample_values]
// //     };

// //     // 3. Use Plotly to plot the data with the layout.
// //     Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
// //   });

// // };


