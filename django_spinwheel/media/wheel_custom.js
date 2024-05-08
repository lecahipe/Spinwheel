// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
    'numSegments'   : 5,   // Specify number of segments.
    'outerRadius'   : 158,  // Set radius to so wheel fits the background.
    'innerRadius'   : 65,  // Set inner radius to make wheel hollow.
    'textFontSize'  : 19,   // Set font size accordingly.
    'textMargin'    : 0,    // Take out default margin.
    'segments'      :       // Define segments including colour and text.
    [
       {'fillStyle' : '#ffec55', 'text' : 'color1', 'percentage': 25},
       {'fillStyle' : '#b14191', 'text' : 'color2', 'percentage': 25},
       {'fillStyle' : '#a39272', 'text' : 'color4', 'percentage': 10},
       {'fillStyle' : '#f6a000', 'text' : 'color3', 'percentage': 15},
       {'fillStyle' : '#70c8dd', 'text' : 'color5', 'percentage': 25},
    ],
    'animation' :           // Define spin to stop animation.
    {
        'type'     : 'spinToStop',
        'duration' : 5,
        'spins'    : 8,
        'callbackFinished' : sendResults
    }
});

// Vars used by the code in this page to do power controls.
let wheelPower    = 0;
let wheelSpinning = false;

// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel)
{
    // Ensure that power can't be changed while wheel is spinning.
    if (wheelSpinning == false) {
        // Reset all to grey incase this is not the first time the user has selected the power.
        document.getElementById('pw1').className = "";
        document.getElementById('pw2').className = "";
        document.getElementById('pw3').className = "";

        // Now light up all cells below-and-including the one selected by changing the class.
        if (powerLevel >= 1) {
            document.getElementById('pw1').className = "pw1";
        }

        if (powerLevel >= 2) {
            document.getElementById('pw2').className = "pw2";
        }

        if (powerLevel >= 3) {
            document.getElementById('pw3').className = "pw3";
        }

        // Set wheelPower var used when spin button is clicked.
        wheelPower = powerLevel;

        // Light up the spin button by changing it's source image and adding a clickable class to it.
        document.getElementById('spin_button').src = "/media/spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    }
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
        // Based on the power level selected adjust the number of spins for the wheel, the more times is has
        // to rotate with the duration of the animation the quicker the wheel spins.
        if (wheelPower == 1) {
            theWheel.animation.spins = 3;
        } else if (wheelPower == 2) {
            theWheel.animation.spins = 8;
        } else if (wheelPower == 3) {
            theWheel.animation.spins = 15;
        }

        // Disable the spin button so can't click again while wheel is spinning.
        document.getElementById('spin_button').src       = "/media/spin_off.png";
        document.getElementById('spin_button').className = "";

        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

        // Set to true so that power can't be changed and spin button re-enabled during
        // the current animation. The user will have to reset before spinning again.
        wheelSpinning = true;
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";
    document.getElementById('results').innerHTML ="<br/>";
    
    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function sendResults(indicatedSegment)
{
    // send results to the database
    fetch("create/", {
        method: "POST",
        body: JSON.stringify({
            user: 1,
            color: indicatedSegment.text,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8", 'X-CSRFToken': csrftoken,
        }
      }, writeResults(indicatedSegment.text));
}

function writeResults(indicatedSegment){
    document.getElementById('results').innerHTML ="<strong> you won: " + indicatedSegment + "</strong>";
}