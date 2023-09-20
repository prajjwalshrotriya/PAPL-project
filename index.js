// Function to format and style the ignition values
function formatIgnition(value) {
    if (value == 0) {
        return '<span style="color: red;">OFF</span>';
    } else if (value == 1) {
        return '<span style="color: green;">ON</span>';
    }
}



// Fetch data from API and populate the table body
function fetchDataAndPopulateTable() {
fetch("http://vehicletrack.biz/api/companyvehiclelatestinfo?token=C_3BD0B0A02B")
    .then((data) => {
        return data.json();
    }).then((objectData) => {
        // console.log(objectData.Vehicle[0].Imei);
        let tableData = "";
        objectData.Vehicle.map((values,index) => {
            tableData += `<tr>
                        <td>${index+1}</td>
                        <td><input type="checkbox" name="" id="" /></td>
                        <td>${values.VehicleNo}</td>
                        <td>${values.Imei}</td>
                        <td>${values.Location}</td>
                        <td>${values.Date}</td>
                        <td>${values.Tempr}</td>
                        <td>${formatIgnition(values.Ignition)}</td>
                        <td>${values.Lat}</td>
                        <td>${values.Long}</td>
                        <td>${values.Speed}</td>
                        <td>${values.Angle}</td>
                        <td>${values.Odometer}</td>
                    </tr>`;
        });
        document.getElementById("table-body").innerHTML = tableData;
    }).catch((error) => {
        console.error("An error occurred: it can be due to CORS as it needs backend to solve this so insted install a extension to see API", error);
        document.getElementById("error").innerHTML = '<span style="color: red;">An error occurred: it can be due to CORS as it needs backend to solve this so insted install a extension to see API</span>';
    });
};

const fetchDataButton = document.getElementById('fetchDataButton');
fetchDataButton.addEventListener('click', function () {
    fetchDataAndPopulateTable();
});

// Function to toggle all checkboxes in the table body
function toggleCheckboxes(checked) {
    const checkboxes = document.querySelectorAll('#table-body input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = checked;
    });
}

// Event listener for the header checkbox
const selectAllCheckbox = document.getElementById('selectAll');
selectAllCheckbox.addEventListener('change', function () {
    toggleCheckboxes(this.checked);
});
