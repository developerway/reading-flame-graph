(function () {
  const goToWork = () => {
    console.log("Going to work...");

    const start = Date.now();
    while (Date.now() - start < 30);
    petADog();

    const startAgain = Date.now();
    while (Date.now() - startAgain < 30);
    grabSomeCoffee();
    const finalStart = Date.now();
    while (Date.now() - finalStart < 30);
  };

  const petADog = () => {
    console.log("There is a cute dog!!");
    const start = Date.now();
    while (Date.now() - start < 20);
  };

  const grabSomeCoffee = () => {
    console.log("Coffee. I need coffee...");
    orderCoffee();
    const start = Date.now();
    while (Date.now() - start < 20);
    return "Here's your coffee!";
  };

  const orderCoffee = () => {
    console.log("Ordering coffee...");
    const start = Date.now();
    while (Date.now() - start < 30);
  };

  goToWork();

  const div = document.createElement("div");
  div.innerText = "Arrived!";
  document.getElementById("root").appendChild(div);
})();
