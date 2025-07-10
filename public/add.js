
window.addEventListener('message', function (event) {
    console.log("added bruh");
    if (event.data && event.data.dataArrId) {
      console.log("Received dataArrId:", event.data.dataArrId);
     
    }
  });
  