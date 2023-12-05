console.log("hi");

document.addEventListener('DOMContentLoaded', () => {
    msc_container = document.querySelector('#msc_containter')
    msc_button = document.querySelector('#msc_button');
    msc_container_state = 0;

    msc_data = document.querySelector('#msc_data');

    msc_button.onclick = () => {
        if (msc_container_state == 1) {
            msc_data.style.display = 'none';
            msc_container_state = 2;
            return true;
        } else if (msc_container_state == 2) {
            msc_data.style.display = 'block';
            msc_container_state = 1;
            return true;
        }
        msc_data.style.display = 'block';

        const request = new XMLHttpRequest();
        request.open('GET', '/api/msc/');

        request.onload = () => {
            const data = JSON.parse(request.responseText);

            for (obj_num in data) {
                line_obj = data[obj_num];
                line_id = line_obj['line']['id'];
                line_name = line_obj['line']['name'];
                
                var line_div = document.createElement('div');
                var line_name_div = document.createElement('div');
                var line_stationd_div = document.createElement('div');

                line_stationd_div.id = 'msc_line' + line_id + '_stations';

                line_div.id = 'msc_line' + line_id;

                line_name_div.innerHTML = line_display_name(line_id, line_name);
                line_name_div.style.textDecoration = 'underline';
                line_name_div.style.cursor = 'pointer';

                line_name_div.classList.add(line_id);

                line_stationd_div.style.display = 'none';

                line_name_div.onclick = (e) => {
                    console.log(e);
                    line_station_div_obj = document.querySelector('#msc_line' + e.target.classList[0] + '_stations')
                    if (line_station_div_obj.style.display == 'none') {
                        line_station_div_obj.style.display = 'block';
                    } else {
                        line_station_div_obj.style.display = 'none'
                    }
                    return true;
                };

                line_div.append(line_name_div);
                line_div.append(line_stationd_div);

                for (station_num in line_obj['stations']) {
                    station_obj = line_obj['stations'][station_num]
                    station_name = station_obj['name'];

                    var station_div = document.createElement('div');
                    var station_name_div = document.createElement('div');
                    var station_coords_div = document.createElement('div');
                    
                    station_div.classList.add('station');
                    station_coords_div.classList.add('coords');
                    
                    station_name_div.innerHTML = station_name;
                    station_coords_div.innerHTML = display_coords(station_obj['latlon']);

                    station_div.append(station_name_div);
                    station_div.append(station_coords_div);
                    line_stationd_div.append(station_div);
                }

                msc_data.appendChild(line_div);
            }

        }
        request.send();
        msc_container_state = 1;
    };

    spb_container = document.querySelector('#spb_container')
    spb_button = document.querySelector('#spb_button');
    spb_container_state = 0;

    spb_data = document.querySelector('#spb_data');

    spb_button.onclick = () => {
        if (spb_container_state == 1) {
            spb_data.style.display = 'none';
            spb_container_state = 2;
            return true;
        } else if (spb_container_state == 2) {
            spb_data.style.display = 'block';
            spb_container_state = 1;
            return true;
        }
        spb_data.style.display = 'block';

        const request = new XMLHttpRequest();
        request.open('GET', '/api/spb/');

        request.onload = () => {
            const data = JSON.parse(request.responseText);

            for (obj_num in data) {
                line_obj = data[obj_num];
                line_id = line_obj['line']['id'];
                line_name = line_obj['line']['name'];
                
                var line_div = document.createElement('div');
                var line_name_div = document.createElement('div');
                var line_stationd_div = document.createElement('div');

                line_stationd_div.id = 'spb_line' + line_id + '_stations';

                line_div.id = 'spb_line' + line_id;

                line_name_div.innerHTML = line_display_name(line_id, line_name);
                line_name_div.style.textDecoration = 'underline';
                line_name_div.style.cursor = 'pointer';

                line_name_div.classList.add(line_id);

                line_stationd_div.style.display = 'none';

                line_name_div.onclick = (e) => {
                    console.log(e);
                    line_station_div_obj = document.querySelector('#spb_line' + e.target.classList[0] + '_stations')
                    if (line_station_div_obj.style.display == 'none') {
                        line_station_div_obj.style.display = 'block';
                    } else {
                        line_station_div_obj.style.display = 'none'
                    }
                    return true;
                };

                line_div.append(line_name_div);
                line_div.append(line_stationd_div);

                for (station_num in line_obj['stations']) {
                    station_obj = line_obj['stations'][station_num]
                    station_name = station_obj['name'];

                    var station_div = document.createElement('div');
                    var station_name_div = document.createElement('div');
                    var station_coords_div = document.createElement('div');
                    
                    station_div.classList.add('station');
                    station_coords_div.classList.add('coords');
                    
                    station_name_div.innerHTML = station_name;
                    station_coords_div.innerHTML = display_coords(station_obj['latlon']);

                    station_div.append(station_name_div);
                    station_div.append(station_coords_div);
                    line_stationd_div.append(station_div);
                }

                spb_data.appendChild(line_div);
            }

        }
        request.send();
        spb_container_state = 1;
    };

    msc_button.addEventListener('mouseover', () => {
        msc_container.style.boxShadow = '0 0 0px 10px #cc4242';
    });

    msc_button.addEventListener('mouseout', () => {
        msc_container.style.boxShadow = 'none';
    });

    spb_button.addEventListener('mouseover', () => {
        spb_container.style.boxShadow = '0 0 0px 10px #26a1ff';
    });

    spb_button.addEventListener('mouseout', () => {
        spb_container.style.boxShadow = 'none';
    });

});


function line_display_name(line_id, line_name) {
    const lineSet1 = new Set(["D1", "D2", "15", "14", "13", "11"]);
    const lineSet2 = new Set(["D1", "D2"]);

    let linename = line_name;

    if (!lineSet1.has(line_id)) {
        linename += " линия";
    }
    if (lineSet2.has(line_id)) {
        linename += " диаметр";
    }
    return `${linename} (${line_id})`;
}

function display_coords(latlon) {
    return `${latlon[0]}, ${latlon[1]}`
}
