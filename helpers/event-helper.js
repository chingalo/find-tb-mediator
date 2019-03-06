 function getEventDate() {
     const date = getRandomDate(new Date(2018, 5, 1), new Date())
     return date.split("T")[0];
 }

 function getRandomDate(start, end) {
     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
 }

 function getRandomEvent(orgUnit, program, programStage, dataValues) {
     const eventDate = getEventDate();
     return {
         "program": `${program}`,
         "programStage": `${programStage}`,
         "orgUnit": `${orgUnit}`,
         "status": "COMPLETED",
         "eventDate": `${eventDate}`,
         "dataValues": dataValues,
         "completedDate": `${eventDate}`
     }

 }
 module.exports = {
     getRandomEvent
 }