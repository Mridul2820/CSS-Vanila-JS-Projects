// Listen for submit
document.querySelector('#zip-form').addEventListener('submit', getLocationInfo);

// Listen for delete
document.querySelector("body").addEventListener("click", deleteLocation);

function getLocationInfo(e) {
    // Get Zip Value from input
    const zip = document.querySelector('.zip').value;

    // Fetch API
    // fetch(`https://app.zipcodebase.com/api/v1/search?apikey=766b9630-142a-11eb-a62c-4f4df70558d7&codes=${zip}`)
    fetch(`https://api.zippopotam.us/IN/${zip}`)
    .then(res => {
        if(res.status != 200){
            showIcon('remove');
            document.querySelector('#output').innerHTML = `<article class="message is-danger">
                <div class="message-body">
                    Invalid Zipcode Please Try Again
                </div>
            </article>`;

            throw Error(res.statusText);
        }

        else {
            showIcon('check');
            return res.json()
        }
    })
    .then(data => {
        // Show Locaton info
        let output = ``;
        data.places.forEach(place => {
            output += 
            `  <article class="message is-primary">
                <div class="message-header">
                    <p>Location Info</p>
                    <button class="delete"></button>
                </div>
                <div class="message-body">
                    <ul>
                        <li><strong>City: </strong>${place["place name"]}</li>
                        <li><strong>State: </strong>${place["state"]}</li>
                        <li><strong>Longitude: </strong>${place["longitude"]}</li>
                        <li><strong>Latitude: </strong>${place["latitude"]}</li>
                    </ul>
                </div>
            </article> `;
        });

        // Insert into output div
        document.querySelector("#output").innerHTML = output;
    })
    .catch(err => console.log(err))

    e.preventDefault();
}

function showIcon(icon) {
    // Clear icons
    document.querySelector(".icon-remove").style.display = "none";
    document.querySelector(".icon-check").style.display = "none";
    // Show correct icon
    document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}


// Delete location box
function deleteLocation(e) {
    if (e.target.className == "delete") {
        document.querySelector(".message").remove();
        document.querySelector(".zip").value = "";
        document.querySelector('.icon-check').style = 'none';
    }
}
  