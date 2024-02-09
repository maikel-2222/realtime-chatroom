
//maakt berichten klaar om te worden weergegeven. 
//Het voegt de gebruikersnaam, berichttekst en het tijdstip toe waarop het bericht is verzonden.



const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}
 
module.exports = formatMessage;