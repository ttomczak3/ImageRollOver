var NorthShoreGallery = {};

NorthShoreGallery.init = function() {

    //alert("Hi from the North Shore");

    NorthShoreGallery.imageCounter = 0;

    // Set up two indexed arrays such taht an index value
    // that is plugged in to both of the arrrays will retrieve
    // related values from the arrrays.
    picFileNames = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);

    // Now, define another array to contain the captions for the
    // images
    captions = ["Split Rock Lighthouse", "Superior Trail", "Beach Rock", "Breakers", "AmericInn Beach", "Surf Spray", "Superior Red Rock", "Superior Sunset", "Gooseberry Falls", "Cascades at Squatch Rock", "The Temperance", "Fall colors"]

    // Get a reference to the first image
    var northShoreImage = document.querySelector('#northShorePic');

    // Get a reference to the second image
    NorthShoreGallery.timedImage = document.querySelector('#northShoreAutoPic');

    //console.log("the northShoreImage is a " + northShoreImage.nodeName + " and its source file path is " + northShoreImage.src);
    
    // Get references to our paragraphs the contain the captions
    picCaptions = document.querySelectorAll('p.picCaption');

    //console.log("The first paragraph's class name is: " + picCaptions[0].innerHTML);

    // Set up event handlers to handle a hover event which
    // actually consists of two separate events: mouseenter (mouseover)
    // and mouseleave (mouseout)
    //
    // Older way, but still good: event handlers
    //
    // Syntax:
    // element.onevent = handlerFunctionName;
    // myImage.onclick = handlerClick;
    //
    // handlerFunctionName will be called by JavaScript when the
    // event occurs (triggers/fires) on the element.
    //
    // Note: JavaScript will automatically pass a single argument
    // (parameter) to any event handler function when it is called.
    //
    // What argument you ask?
    // Answer: the event that occurred is passed as an object
    //          (event object)
    //
    // Note that you, the developer, can choose to receive and store
    // the passed-in event object in a parameter variable OR you can
    // just ignore it and not store it all...
    //northShoreImage.onmouseenter = NorthShoreGallery.showRandomImage;
    //northShoreImage.onmouseleave = NorthShoreGallery.resetImage;

    // Newer way - Event Listeners
    // 
    // element.addEventListener('event', listenerFunctionName, eventPropagation);
    northShoreImage.addEventListener('mouseenter', NorthShoreGallery.showRandomImage, false);
    northShoreImage.addEventListener('mouseleave', NorthShoreGallery.resetImage);

    // Start the time slideshow (circular carousel)
    NorthShoreGallery.slideShow();

};

NorthShoreGallery.showRandomImage = function(e) {

    //console.log("Hi from showRandomImage");
    // e receives the passed-in event object (mouseenter) and
    // contains useful properties that we then easily access
    //
    // *** Inside tthe context of a function (the{}'s),
    // the this keyword refers to the currently active object.
    //
    // In the context of an event handler/listner function,
    // JavaScript automagically sets the this keyword to refer
    // to the object the event occurred on.

    //console.log('the id of our moused over image is: ' + this.id + '(' + e.currentTarget.id +
    //')\nMouse postion where the mouseenter event occurred is ' + e.pageX + ', ' + e.pageY +
   //'\n\nMouse position relative to the edges of the image: ' + e.offsetX + ', ' + e.offsetY);

   // Get a random number that we can use as an index inot our arrays
   var randomIndex = NorthShoreGallery.randRange(1, picFileNames.length);

    // Change the image to reflect the randomly generated index
    this.src = 'images/northShore/pic' + picFileNames[randomIndex] + '.jpg';

    // Change the caption
    picCaptions[0].innerHTML = captions[randomIndex];

    // CSS Filter effects on our moused over image...
    this.className = "contrast";
    //this.className += " invert";
    this.className += " sepiaBlur";

    // To prevent the browser from performing its default behavior for an event,
    // like following a clicked linked to its tarrget, simply either return false
    // from the event handler function (older way, but still good) or run the
    // preventDefualt() method on the passed-in event object (newer way).
    //
    // return false;
    // or
    // e.preventDefault();

};

NorthShoreGallery.resetImage = function() {

    //console.log("Hi from resetImage");
    this.src = 'images/northShore/pic' + picFileNames[0] + '.jpg';
    picCaptions[0].innerHTML = captions[0];

    // Turn off any applied filter effects
    this.className = "";

};

NorthShoreGallery.randRange = function(min, max) {

    return Math.floor(Math.random() * (max - min) + min);

}

NorthShoreGallery.slideShow = function() {

    //imageCounter = 0; // Don't do this!

    // Do the image rollover
    NorthShoreGallery.timedImage.src = 'images/northShore/pic' + picFileNames[NorthShoreGallery.imageCounter] + '.jpg';

    // Update the caption
    picCaptions[1].innerHTML = captions[NorthShoreGallery.imageCounter];

    // Modify the counter (NorthShoreGallery.imageCounter)
    /*if (NorthShoreGallery.imageCounter < picFileNames.length - 1) {

        NorthShoreGallery.imageCounter++;

    }else {

        NorthShoreGallery.imageCounter = 0;

    }*/

    // Do the above decision logic in an alternative way...
    NorthShoreGallery.imageCounter = (++NorthShoreGallery.imageCounter) % picFileNames.length;

    // Repeat this functions' codde every so often using recursion.
    //
    // Keep calling the slideShow() method every 2 seconds for as long as
    // the user is on the page (heartbeat, game or animation loop, or ticker).
    //
    // The following function call would casue an overflow stack error
    // in memor whose console error message is:
    //      Uncaught RangeError: Maximum call stack size exceeded
    //NorthshoreGallery.slideShow();

    // Instead, call slideShow() every 2 seconds using a timer function
    // called setTimeout()
    setTimeout(NorthShoreGallery.slideShow, 2000);

}

window.onload = NorthShoreGallery.init;