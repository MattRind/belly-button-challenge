// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    all_metadata = data['metadata'];

    // Filter the metadata for the object with the desired sample number
    one_metadata_set = all_metadata[sample]
    total_fields = Object.keys(one_metadata_set).length

    // Use d3 to select the panel with id of `#sample-metadata`
    data_card = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    data_card.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let i = 0; i < total_fields; i++){

      let row = data_card.append("card-body");
      let field_name = Object.keys(one_metadata_set)[i].toUpperCase();
      // let field_name = field_name.toUpperCase();
      let field_value = Object.values(one_metadata_set)[i];
      row.append('table').text(field_name + ":  " + field_value + "" );
    };
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    all_samplesdata = data['samples'];

    // Filter the samples for the object with the desired sample number
    sample_data = all_samplesdata[sample];

    // Get the otu_ids, otu_labels, and sample_values
    otu_ids = sample_data['otu_ids'];
    sample_values = sample_data['sample_values'];
    otu_labels = sample_data['otu_labels'];

    // Build a Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color : otu_ids 
      },
      text: otu_labels
    };
    
    var bubble_data = [trace1];
    
    var bubble_layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {
        title: 'OTU ID'
      },
      yaxis: {
        title: 'Number of Bacteria'
      },
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubble_data, bubble_layout);










    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    names_id_list = data['names'];

    // Use d3 to select the dropdown with id of `#selDataset`
    dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

    for (let i = 0; i < names_id_list.length; i++){
      let name = names_id_list[i];
      dropdown.append('option').text(name);
    };

    // Get the first sample from the list
    first_sample = data['names'][0];
   
    // Build charts and metadata panel with the first sample
    buildMetadata(0);
    buildCharts(0);
  });
}

// Function for event listener
function optionChanged(newSample) {

  // Build charts and metadata panel each time a new sample is selected
  //   since the drop down returns the value of the id (person), but the metadata panel and 
  //   plots are based on the index of the sample, need to find corresponding index of value,
  //   assuming order of names (ids) is same as order of ids in metadata and samples lists --
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let names = data['names'];
    const index = names.indexOf(newSample);
    buildMetadata(index);
    buildCharts(index);
  }); 
}

// Initialize the dashboard
init();
