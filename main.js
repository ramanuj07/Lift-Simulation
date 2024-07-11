const simulate = document.querySelector(".LiftFloorButton");

simulate.addEventListener("click", (e) => {
  e.preventDefault();
  const floorInputValue = document.getElementById("floorNumber").value;
  const liftInputValue = document.getElementById("liftNumber").value;

  if (floorInputValue == "" || liftInputValue == "") {
    alert("Please enter the value");
    return;
  }

  if (floorInputValue < "0" || liftInputValue < "0") {
    alert("Negative values not allowed");
    return;
  }

  if (floorInputValue == "0" || liftInputValue == "0") {
    alert("Please enter the value");
    return;
  } else {
    document.querySelector(".firstPage").style.display = "none";
    document.querySelector(".secondPage").style.display = "block";
    makingFloor();
  }
});

const makingFloor = () => {
  const floorInput = document.querySelector("#floorNumber").value;
  const liftInput = document.querySelector("#liftNumber").value;

  for (let i = floorInput; i > 0; i--) {
    const floordiv = document.createElement("div");
    floordiv.className = "box";

    floordiv.innerHTML = `
            <div class="buttonLift">
                <div class="button">
                    <button class="up" id="up${i}">Up</button>
                    <button class="down" id="down${i}">Down</button>
                </div>
                <div class ="mainLift"></div>
            </div>
                <div class="hrfloorName">
                    <hr>
                <span>Floor ${i}</span>
            </div>
            `;

    document.querySelector(".secondPage").appendChild(floordiv);
  }

  const mainLift = document.querySelectorAll(".mainLift");

  for (let j = 1; j <= liftInput; j++) {
    mainLift[floorInput - 1].innerHTML += `
    <div class="lift" id="lift${j}" flag="free">
        <div class="gates" id="gates">
            <div class="gate1"></div>
            <div class="gate2"></div>
        </div>
    <div>
    `;
  }

  document.querySelector("#down1").style.display = "none";
  document.querySelector(`#up${floorInput}`).style.display = "none";

  const upButtons = document.querySelectorAll(".up");
  const downButtons = document.querySelectorAll(".down");
  const allLifts = document.querySelectorAll(".lift");

  let liftCurrentFloor = new Array(allLifts.length).fill(1);

  upButtons.forEach((upbtn, i) => {
    const floorValue = upButtons.length - i;
    upbtn.addEventListener("click", (event) => {
      event.preventDefault();
      distanceCalculator(liftCurrentFloor, floorValue).every((liftNo, i) => {
        if (allLifts[liftNo].getAttribute("flag") == "free") {
          allLifts[liftNo].setAttribute("flag", "busy");

          moveLift(allLifts[liftNo], floorValue, liftCurrentFloor[liftNo]);
          liftCurrentFloor[liftNo] = floorValue;
          return false;
        } else return true;
      });
    });
  });

  downButtons.forEach((downbtn, i) => {
    const floorValue = downButtons.length - i;
    downbtn.addEventListener("click", (event) => {
      distanceCalculator(liftCurrentFloor, floorValue).every((liftNo, i) => {
        if (allLifts[liftNo].getAttribute("flag") == "free") {
          allLifts[liftNo].setAttribute("flag", "busy");

          moveLift(allLifts[liftNo], floorValue, liftCurrentFloor[liftNo]);
          liftCurrentFloor[liftNo] = floorValue;
          return false;
        } else return true;
      });
    });
  });
};
distanceCalculator = (liftsPositionArray, destinationFloor) => {
  const liftDistance = [...liftsPositionArray].map((position, i) => {
    return { distance: Math.abs(position - destinationFloor), index: i };
  });
  return liftDistance
    .sort((a, b) => a.distance - b.distance)
    .map((e) => e.index);
};

const moveLift = (lift, destinationFloor, liftCurrentFloor) => {
  const distance = Math.abs(destinationFloor - liftCurrentFloor);
  const travelTime = distance * 1000;
  lift.style.transform = `translateY(${-95 * (destinationFloor - 1)}px)`;
  lift.style.transitionDuration = `${distance}s`;

  setTimeout(() => {
    openCloseGates(lift);
    setTimeout(() => {
      lift.setAttribute("flag", "free");
    }, 3000);
  }, travelTime);
};

const openCloseGates = (lift) => {
  const gates = lift.children[0].children;
  setTimeout(() => {
    gates[0].style.width = "3px";
    gates[1].style.width = "3px";
  }, 500);

  setTimeout(() => {
    gates[0].style.width = "25px";
    gates[1].style.width = "25px";
  }, 2500);
};
