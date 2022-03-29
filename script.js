function spin() {
  const wheel = document.querySelector(".wheel");
  const startButton = document.querySelector("#myBtn");
  var modal1 = document.getElementById("myModal1");
  var modal2 = document.getElementById("myModal2");
  var spin_again = document.getElementById("spin-again");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  let deg = 0;
  let c = 0;
  var audio = new Audio("wheelsound.wav");
  var audio1 = new Audio("wheelsound.wav");

  function gimmick(el) {
    var exists = document.getElementById("gimmick");
    if (exists) {
      exists.parentNode.removeChild(exists);
      return false;
    }

    var element = document.querySelector(el);
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      focused = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200;
    canvas.id = "gimmick";

    var coin = new Image();
    coin.src = "coin-animation.png";
    // 440 wide, 40 high, 10 states
    coin.onload = function () {
      element.appendChild(canvas);
      focused = true;
      drawloop();
    };
    var coins = [];

    function drawloop() {
      if (focused) {
        requestAnimationFrame(drawloop);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 10) {
        coins.push({
          x: (Math.random() * canvas.width) | 0,
          y: -50,
          dy: 3,
          s: 0.5 + Math.random(),
          state: (Math.random() * 10) | 0,
        });
      }
      var i = coins.length;
      while (i--) {
        var x = coins[i].x;
        var y = coins[i].y;
        var s = coins[i].s;
        var state = coins[i].state;
        coins[i].state = state > 9 ? 0 : state + 0.1;
        coins[i].dy += 0.01;
        coins[i].y += coins[i].dy;

        ctx.drawImage(
          coin,
          44 * Math.floor(state),
          0,
          44,
          40,
          x,
          y,
          44 * s,
          40 * s
        );

        if (y > canvas.height) {
          coins.splice(i, 1);
        }
      }
    }
  }

  startButton.addEventListener("click", () => {
    // Disable button during spin
    startButton.style.pointerEvents = "none";
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(5000 + 4.5 * 5000);
    audio.play();
    // Set the transition on the wheel
    wheel.style.transition = "all 5s ease-out";
    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`;
    // Apply the blur
    wheel.classList.add("blur");
    c = c + 1;
    startButton.onclick = setTimeout(function () {
      if (c === 1) {
        modal1.style.display = "block";
        gimmick("body");
      } else {
        modal2.style.display = "block";
      }
    }, 6000);
  });

  spin_again.addEventListener("click", () => {
    document.getElementById("gimmick").style.display = "none";
    modal1.style.display = "none";
    audio1.play();
    // Disable button during spin
    startButton.style.pointerEvents = "none";
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(5000 + 8.5 * 5000);
    // Set the transition on the wheel
    wheel.style.transition = "all 5s ease-out";
    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`;
    // Apply the blur
    wheel.classList.add("blur");
    c = c + 1;

    startButton.onclick = setTimeout(function () {
      if (c === 1) {
        modal1.style.display = "block";
        document.getElementById("gimmick").style.display = "block";
      } else {
        modal2.style.display = "block";
        document.getElementById("gimmick").style.display = "block";
      }
    }, 6000);
    console.log(c);
  });

  wheel.addEventListener("transitionend", () => {
    // Remove blur
    wheel.classList.remove("blur");
    // Enable button when spin is over
    startButton.style.pointerEvents = "auto";
    // Need to set transition to none as we want to rotate instantly
    wheel.style.transition = "none";
    // Calculate degree on a 360 degree basis to get the "natural" real rotation
    // Important because we want to start the next spin from that one
    // Use modulus to get the rest value from 360
    const actualDeg = deg % 360;
    // Set the real rotation instantly without animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    // When the user clicks on <span> (x), close the modal
  });
}

spin();
