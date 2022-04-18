
function SeatsAPI(api_key) {
    if (api_key === "09876554332fghj") {
        return seats
    } else {
        return { 
            statusCode: 400,
            status: "error",
            message: "You must provide a valid api key!"
        }
    }
}
module.exports = SeatsAPI;