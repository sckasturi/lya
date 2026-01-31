import axios from "axios";

const sheet_id = "11M_JA-InGbjIBDbe-SumMYAvf7BSBymcy_JPHoCBCjU";
const api_key = "AIzaSyDRcQeHoQaMYry6CjGOqWs3Ld6cAufJWjs";

function WebText(section) {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${section}?valueRenderOption=FORMATTED_VALUE&key=${api_key}`

	axios.get(url)
            .then(function (response) {
                // handle success
                formatResponse(response.data);
            })
            .catch(function (error) {
                // handle error
                //onError(error);
            })
            .finally(function () {
                // always executed
                console.log('ALL DONE LOADING DATA');
            });
}


export default WebText;