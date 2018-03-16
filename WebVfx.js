/*
				=====================================================================
				Elusien's WebVfx framework for Shotcut (http://elusien.co.uk/shotcut)
				=====================================================================
	
	This framework enables Shotcut HTML Overlay filters to be developed quickly using a modern browser,
	with all its development tools (e.g. using function key F12) at your disposal. Shotcut does not have any
	such tools, other than a basic console.log, and in many cases of error you just end up with a blank screen.
	
	You can style the HTML elements as normal using CSS then modify the properties you want to animate
	using this framework.
	
	When you apply this filter to a clip in Shotcut, you need to tick the box that says
	'Use WebVfx javascript extension' and confirm that you know how to use it.
	
	There are 3 parts to this framework two of which are exposed to the user via HTML tag parameters:
	
	1) Animation effects:
		This enables you to animate CSS properties for any of the HTML elements in the HTML Overlay filter.
		It also enables the use of "keyframes" for fine control of the animation.
		
		Format:
			class='webvfx'
				This identifies the HTML element as one that is under the control of the framework.
			
			data-control='<duration>:<fps>'
				This is only used for the animation in the browser, not in shotcut. It informs the browser
				as to how many seconds to run the animation and what the "frames per second" is. It is not
				required by Shotcut as the length is determined by the length of the clip to which it is
				applied, as is the 'fps'. 
				Default: data-control='8:30'
				
			data-animate='<animation structure>'
				This provides the animation parameters to both the browser and Shotcut. It is in a form
				similar to what would be supplied to CSS to do the animation. All the parameters apart from
				the "0%" and the "100%" are optional. Times are "normalised times", where 0.0 means the
				first fram of the clip and 1.0 means the last frame of the clip. For a list of the easings
				see the "Easing_Funs()" function below.
				
				These parameters are:
				
					start: <time to start the animation>    Default:  start:0.0
					  end: <time to  end  the animation>    Default:    end:1.0
					 ease: <an "easing" to describe how the property changes during the duration of the effect>
															Default:  ease: "linearTween"
					   0%: <structure detailing the CSS property/properties to animate and their initial value(s)>
					 100%: <structure detailing THE SAME CSS property/properties and their final value(s)>
				
				The 0% and 100% are "keyframes" that specify the values at the start and end times. Other keyframes
				can be used to specify the values at other specific times. e.g "50%"  for the values halfway through
				or "25%" for the value a quarter of the way into the animation. These values donot have to be whole
				numbers, e.g. you could have "16.125%". These are best illustrated by examples:
				
				a) Fadeout an element:
					<div class='webvfx' data-animate='{0%: {opacity: 1;}, 100%: {opacity: 0%;}}'>
						FADING TEXT
					</div>
				b) Fadeout an element, then fade it back in:
					<div class='webvfx' data-animate='{0%: {opacity: 1;}, 50%: {opacity: 0%;}, 100%: {opacity: 1;}}'>
						TEXT FADING OUT THEN BACK IN
					</div>
				c) Change an element's colour, move it around, change it from a square shape to a circle. 
					<div  class='webvfx' data-animate=
						'{start: 0.2, end: 1.0, ease: "easeOutSine",
					       0%: {backgroundColor: #f00; left:  0px; top:  0px; borderRadius:  0%;},
					      25%: {backgroundColor: #00f; left:100px; top:  0px; borderRadius: 50%;},
						  50%: {backgroundColor: #0f0; left:200px; top:200px; borderRadius:  0%;},
						  75%: {backgroundColor: #f0f; left:  0px; top:200px; borderRadius: 50%;},
						 100%: {backgroundColor: #ff0; left:100px; top:  0px; borderRadius:  0%;}
					   }'>
						HI
					</div>
				
				common mistakes:
					Forgetting that the "ease" function name is case-sensitive;
					Forgetting to put a semi-colon (;) after the last CSS property value in a keyframe;
					Adding a comma (,) after the last keyframe;
					Not having the same property names in each keyframe;
					Not using the "camelCase" names for properties
						(e.g. you must use "borderRadius", NOT "border-radius");
					Using some of the more recent CSS constructs
						(e.g. transform-style: preserve-3d;)
					Some CSS properties have to be the "webkit" version
						(e.g. you must use "webkitTransform", NOT "transform"
					

	2) Stopwatch effects:
		This enables you to have 1 or more stopwatches in the HTML Overlay filter. It also enables the
		use of "keyframes" for fine control of the stopwatches.
		
		A stopwatch consists of 4 elements specified using HTML '<span></span>' tags.
		<span> number 1 is the frame       number;
		<span> number 2 is the hour        number;
		<span> number 3 is the minute      number;
		<span> number 4 is the millisecond number
		
		Normally you would initialise each of the <span> elements by placing a zero (0) in it. Placing any
		other number will initialise it to that value. Leaving the <span> empty will hide it (see examples).
		
		Format:
			class='webvfx'
				This identifies the HTML element as one that is under the control of the framework.
			
			data-control='<duration>:<fps>'
				This is only used for the stopwatch in the browser, not in shotcut. It informs the browser
				as to how many seconds to run the stopwatch and what the "frames per second" is. It is not
				required by Shotcut as the length is determined by the length of the clip to which it is
				applied, as is the 'fps'. 
				Default: data-control='8:30'
				
			data-animate='<stopwatch structure>'
				This provides the stopwatch parameters to both the browser and Shotcut.
				All the parameters are optional. Times are "normalised times", where 0.0 means the
				first fram of the clip and 1.0 means the last frame of the clip.
				
				These parameters are:
				
					start: <time to start the animation>    Default:  start:0.0
					  end: <time to  end  the animation>    Default:    end:1.0
				
				Keyframes can be used to specify when to pause and resume the stopwatch. e.g "50%" for halfway
				through	or "25%" for a quarter of the way into the animation. These values do not have to be whole
				numbers, e.g. you could have "16.125%". If you "pause" the stopwatch, then the next keyframe would
				"resume" it. When you resume it you have the option of:
				
					"normal" (the default) at which point the times will start up where they left off;
					"skip"   at which point the times will skip to the value they would have had if the stopwatch
							 had not been paused;
					<nnn> 	 a number representing a time in milliseconds to at which the times will start
							 (eg resume: 0     will resume the stopwatch times from the beginning,
							     resume: 50000 will resume the stopwatch times from 50 seconds).
				These are best illustrated by examples:
				
				a) Stopwatch showing frame-number, minutes and seconds:
					<div class="webvfx"	 data-stopwatch=''>
						Frame <span>0</span> => <span></span><span>00</span>m <span>00</span>s <span></span>
					</div>
					
				b) Stopwatch showing minutes and seconds, running for 120 seconds with various pauses and resumes:
				
					<div class="webvfx"	data-control='120:24' data-stopwatch=
						'{10%: {pause;},
						  20%: {resume;},
						  40%: {pause;},
						  60%: {resume: skip;},
						  80%: {pause;},
						  90%: {resume: 60000;}
						 }'>
						<span></span></span><span></span><span>00</span>m <span>00</span>s <span></span>
					</div>
	
	3) User-supplied effects:
		This enables you to provide your own javascript function to do something to the HTML. This function
		will be called for each frame with the parameters:
			time: 		  the "normalised time" of this frame (0.0 to 1.0);
			frame_number: the number of this frame
			frame_rate  : the frame-rate in frames per second
		
		To do this you need to create the javascript function, then add it to a GLOBAL-scope array called
		"webvfx_add_to_frame" e.g.
		
		<script>
			function flash(time, frame_number, frame_rate) {
				bulb = document.getElementById("bulb");
					bulb.style.opacity = ((frame_number % 10) < 5) ? 0.1 : 1.0;
			}
			webvfx_add_to_frame = [flash];
		<script>
		
	A COMPLETE EXAMPLE
	==================

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css?family=Audiowide|Iceland" rel="stylesheet">
<!-- WebVfx does not recognise Google web fonts in "<link>", so make sure you also have the font downloaded on your computer. -->
<!-- WebVfx does not recognise some recent CSS constructs, try using the -webkit- prefix for these -->
<title>WebVfx Example</title>
<style>
	body * {
		color:#888;	font-family: 'Iceland', monospace; font-size: 30px;
	}
	#wanderer {
	    width: 150px; height: 150px;
	    background-color: #f00;
	    position: relative;
		z-index: -1;
	}
	[data-stopwatch]>span {
		display: inline-block;
		border: solid 1px #f00;
		padding: 2px; margin: 2px 0;
	}
	#middle {
		position: absolute;
		top:      50%; left:     50%;
				transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%0);
	}
	#bulb {
		width:  2em; height: 2em; margin: auto;
		background-color: #f00;
		        border-radius: 50%;
		-webkit-border-radius: 50%;
	}
</style>
</head>
<body>
	<div id='wanderer' class='webvfx'  data-control='20:30'
		 data-animate='{start: 0.1, end: 1.0, ease: "easeOutSine",
					       0%: {backgroundColor: #f00; left:  0px; top:  0px; borderRadius:  0%;},
					      25%: {backgroundColor: #00f; left:100px; top:  0px; borderRadius: 50%;},
						  50%: {backgroundColor: #0f0; left:200px; top:200px; borderRadius:  0%;},
						  75%: {backgroundColor: #f0f; left:  0px; top:200px; borderRadius: 50%;},
						 100%: {backgroundColor: #ff0; left:100px; top:  0px; borderRadius:  0%;}
					   }'>
	</div>
	<div class='webvfx'
		 data-stopwatch='{start: 0.2, end: 0.8,
							10%: {pause;},
							20%: {resume;},
							40%: {pause;},
							60%: {resume: skip;},
							80%: {pause;},
							90%: {resume: 100000;}
						 }'>
		Frame <span>0</span> => </span><span>00</span>h <span>00</span>m <span>00</span>s <span>000</span>ms
	</div>
	<div class='webvfx' data-stopwatch=''>
	   <span>0</span> => <span></span><span>00</span>:<span>00</span>.<span>000</span>
	</div>
	<div id='middle' class="webvfx" data-stopwatch=''>						
	   <span>9000</span> => <span></span><span>08</span>:<span>10</span><span></span>
	</div>
	<p>	Assuming a framerate of 30fps. </p>
	<div id='bulb'> </div>
</body>
<script>
	webvfx_add_to_frame = [flash];
	function flash(time, frame_number, frame_rate) {
		bulb = document.getElementById("bulb");
		if ((frame_number % 10) < 5) {
			bulb.style.opacity = 0.1;
		} else {
			bulb.style.opacity = 1.0
		}
	}
</script>
<script src="WebVfx.js"></script>
</html>
	
 * The MIT License (MIT)
 * 
 * Copyright (c) 2018 Elusien Entertainment
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @version 1.0

*/
	var Elusien = {
		iter        : 0,
		niters      : 0,
		delay       : 0,
		frame_number: 0,
		frame_length: 0
	};
	
	function Easing_Funs(){
    /*
        USERS SHOULD NOT MODIFY THIS FUNCTION
        #####################################
        
        Easing Equations v1.3, Oct. 29, 2002, Open source under the BSD License. 
        Copyright © 2001-2002 Robert Penner. All rights reserved.
  
        These tweening functions provide different flavors of math-based motion under a consistent API.
      
        Math.easingType(t,b,c,d)
            t: current time,
            b: beginning value  (i.e  value at time_start),
            c: change in value  (end_value - b), can be negative
            d: duration         (i.e. time_end - time_start)
  
        Type of easing  HTML data-easing value      Description
        --------------  ----------------------      -----------
            Linear      "linearTween"                           linear tweening - no easing is performed
            Quadratic   "easeInQuad"              t^2         acceleration from zero velocity
                        "easeOutQuad"             t^2         deceleration  to  zero velocity
                        "easeInOutQuad"           t^2         acceleration until halfway, then deceleration
            Cubic       "easeInCubic"             t^3         acceleration from zero velocity
                        "easeOutCubic"            t^3         deceleration  to  zero velocity
                        "easeInOutCubic"          t^3         acceleration until halfway, then deceleration
            Quartic     "easeInQuartic"           t^4         acceleration from zero velocity
                        "easeOutQuartic"          t^4         deceleration  to  zero velocity
                        "easeInOutQuartic"        t^4         acceleration until halfway, then deceleration
            Quintic     "easeInQuintic"           t^5         acceleration from zero velocity
                        "easeOutQuintic"          t^5         deceleration  to  zero velocity
                        "easeInOutQuintic"        t^5         acceleration until halfway, then deceleration
            Sinusoidal  "easeInSine"              sinusoidal  acceleration from zero velocity
                        "easeOutSine"             sinusoidal  deceleration  to  zero velocity
                        "easeInOutSine"           sinusoidal  acceleration until halfway, then deceleration
            Exponential "easeInExpo"              exponential acceleration from zero velocity
                        "easeOutExpo"             exponential deceleration  to  zero velocity
                        "easeInOutExpo"           exponential acceleration until halfway, then deceleration
            Circular    "easeInCirc"              circular    acceleration from zero velocity
                        "easeOutCirc"             circular    deceleration  to  zero velocity
                        "easeInOutCirc"           circular    acceleration until halfway, then deceleration
            Bounce      "easeInBounce"            elastic     bounce, then acceleration from zero velocity
                        "easeOutBounce"           elastic     deceleration  to  zero velocity, then bounce
                        "easeInOutBounce"         elastic     bounce, then acceleration until halfway, then deceleration, then bounce
          
      Changes:
          1.3 - tweaked the exponential easing functions to make endpoints exact
          1.2 - inline optimizations (changing t and multiplying in one step)--thanks to Tatsuo Kato for the idea
  
      Discussed in Chapter 7 of Robert Penner's Programming Macromedia Flash MX (including graphs of the easing equations)
      http://www.robertpenner.com/profmx
      http://www.amazon.com/exec/obidos/ASIN/0072223561/robertpennerc-20
    */

        this.linearTween    = function (t, b, c, d) {return c*t/d + b;};
        this.easeInQuad     = function (t, b, c, d) {return c*(t/=d)*t + b;};
        this.easeOutQuad    = function (t, b, c, d) {return -c *(t/=d)*(t-2) + b;};
        this.easeInOutQuad  = function (t, b, c, d) {return ((t/=d/2) < 1) ? c/2*t*t + b : -c/2*((--t)*(t-2) - 1) + b;};
        this.easeInCubic    = function (t, b, c, d) {return c*(t/=d)*t*t + b;};
        this.easeOutCubic   = function (t, b, c, d) {return c*((t=t/d-1)*t*t + 1) + b;};
        this.easeInOutCubic = function (t, b, c, d) {return ((t/=d/2) < 1) ? c/2*t*t*t + b : c/2*((t-=2)*t*t + 2) + b;};
        this.easeInQuart    = function (t, b, c, d) {return c*(t/=d)*t*t*t + b;};
        this.easeOutQuart   = function (t, b, c, d) {return -c * ((t=t/d-1)*t*t*t - 1) + b;};
        this.easeInOutQuart = function (t, b, c, d) {return ((t/=d/2) < 1) ? c/2*t*t*t*t + b : -c/2*((t-=2)*t*t*t - 2) + b;};
        this.easeInQuint    = function (t, b, c, d) {return c*(t/=d)*t*t*t*t + b;};
        this.easeOutQuint   = function (t, b, c, d) {return c*((t=t/d-1)*t*t*t*t + 1) + b;};
        this.easeInOutQuint = function (t, b, c, d) {return ((t/=d/2) < 1) ? c/2*t*t*t*t*t + b :  c/2*((t-=2)*t*t*t*t + 2) + b;};
        this.easeInSine     = function (t, b, c, d) {return -c * Math.cos(t/d * (Math.PI/2)) + c + b;};
        this.easeOutSine    = function (t, b, c, d) {return c * Math.sin(t/d * (Math.PI/2)) + b;};
        this.easeInOutSine  = function (t, b, c, d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;};
        this.easeInExpo     = function (t, b, c, d) {return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;};
        this.easeOutExpo    = function (t, b, c, d) {return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;};
        this.easeInOutExpo  = function (t, b, c, d) {return (t===0) ? b : ((t==d) ? b+c : (((t/=d/2) < 1) ? c/2 * Math.pow(2, 10 * (t - 1)) + b : c/2*(-Math.pow(2, -10 * --t) + 2) + b));};
        this.easeInCirc     = function (t, b, c, d) {return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;};
        this.easeOutCirc    = function (t, b, c, d) {return c * Math.sqrt(1 - (t=t/d-1)*t) + b;};
        this.easeInOutCirc  = function (t, b, c, d) {return ((t/=d/2) < 1) ? -c/2 * (Math.sqrt(1 - t*t) - 1) + b : c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;};
		this.easeInBounce   = function (t, b, c, d) {return (t===0) ? b :  (((t/=d)   == 1) ? b + c :                -(c * Math.pow(2,  10 * (t -= 1)) * Math.sin((t * d - (d*0.3    /4)) * (2 * Math.PI) / (d*0.3    )))           + b);};
		this.easeOutBounce  = function (t, b, c, d) {return (t===0) ? b :  (((t/=d/2) == 2) ? b + c :                 (c * Math.pow(2, -10 *  t      ) * Math.sin((t * d - (d*0.3    /4)) * (2 * Math.PI) / (d*0.3    )))       + c + b);};
        this.easeInOutBounce= function (t, b, c, d) {return (t===0) ? b :  (((t/=d/2) == 2) ? b + c : ((t<1) ? -0.5 * (c * Math.pow(2,  10 * (t -= 1)) * Math.sin((t * d - (d*0.3*1.5/4)) * (2 * Math.PI) / (d*0.3*1.5)))           + b :
																											          (c * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - (d*0.3*1.5/4)) * (2 * Math.PI) / (d*0.3*1.5))) * 0.5 + c + b));};
    }      // #################### END OF Easing_Funs CONSTRUCTOR ####################
	
	var exif_orientations = [
		'scale(1,1) rotate(0deg)',
		'scale(1,1) rotate(0deg)',
		'scale(-1,1) rotate(0deg)',
		'scale(1,1) rotate(180deg)',
		'scale(1,-1) rotate(0deg)',
		'scale(-1,1) rotate(90deg)',
		'scale(1,1) rotate(90deg)',
		'scale(-1,1) rotate(-90deg)',
		'scale(1,1) rotate(-90deg)'
	];
	

function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

function exif_orientation(filename) {
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
	var file = new File([""], filename);
console.log('WHOOPS:' + filename + ': ' + file.name);
  var file_reader = new FileReader();
  file_reader.onload = function() {
console.log('OK:' + this.readyState + ', ' + this.error  + '; ' + this.result.length);
    var scanner = new DataView(this.result);
    var idx = 0;
    var value = 1; // Non-rotated is the default
    if(this.result.length < 2 || scanner.getUint16(idx) != 0xFFD8) {
      // Not a JPEG
      return 0;
    }
    idx += 2;
    var maxBytes = scanner.byteLength;
    while(idx < maxBytes - 2) {
      var uint16 = scanner.getUint16(idx);
      idx += 2;
      switch(uint16) {
        case 0xFFE1: // Start of EXIF
          var exifLength = scanner.getUint16(idx);
          maxBytes = exifLength - idx;
          idx += 2;
          break;
        case 0x0112: // Orientation tag
          // Read the value, its 6 bytes further out
          // See page 102 at the following URL
          // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
          value = scanner.getUint16(idx + 6, false);
          maxBytes = 0; // Stop scanning
          break;
      }
    }
  };
  file_reader.readAsArrayBuffer(file);
}



	
/*
	From the EXIF standard documentation
	(http://web.archive.org/web/20131018091152/http://exif.org/Exif2-2.PDF)
	Table 18 Tag Support Levels (5) 
	Orientation:
	The image orientation viewed in terms of rows and columns.
	Tag = 274 (112 Hex)
	Type = SHORT
	Count = 1
	Default = 1
	1 = The 0th row is at the visual top of the image, and the 0th column is the visual left-hand side.
	2 = The 0th row is at the visual top of the image, and the 0th column is the visual right-hand side.
	3 = The 0th row is at the visual bottom of the image, and the 0th column is the visual right-hand side.
	4 = The 0th row is at the visual bottom of the image, and the 0th column is the visual left-hand side.
	5 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual top.
	6 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual top.
	7 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual bottom.
	8 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual bottom.
	Other = reserved 
*/
    
    function Producer(params) {

/*
        USERS SHOULD NOT MODIFY THIS FUNCTION
        #####################################
 
        ==============================================================================================================
        Description
        -----------
        This function is called to save its parameters as its properties. These are required by the
        render function in order to animate the objects on the screen by manipulating certain of their CSS properties.

        Parameters  Description
        ----------  -----------
        params      An object containing all the parameters
        ==============================================================================================================
*/

        this.params = params;  // Add params objects as a property of the Producer class
    }       // #################### END OF Producer CONSTRUCTOR ####################
    
    Producer.prototype.render = function(time) {
/*
        USERS SHOULD NOT MODIFY THIS FUNCTION
        #####################################

        ==============================================================================================================
        Description
        -----------
        This function is called once for each frame to manipulate the various objects' CSS properties by 1 increment.
        By using "prototype" it is stored in the Producer object as a method called "render".
        This is the main function, since it is where the animated frames are produced.
        
        Parameters          Description
        ----------          -----------
        time                The current normalised (between 0.0 and 1.0) time. This is incremented on each call by an
                            amount equal to 1/(duration*framerate), where duration = the length of the clip in seconds
                            and framerate is the number of frames per second.                           
        ==============================================================================================================
*/

        var property;
		var startval;
		var changeval;
        var propertyval;
        var i;
		var j;
        var k;
        var t = time;
		var duration;
        var animate;
		var start;
		var end;
		var ease;
		var keyftime;
		var keystart;
		var keyend;
		var kt;
		var kd;
		var prop;
		var fprop;
		var tprop;
		var fp     = [];
		var tp     = [];
		var aprops = [];
		var from   = {};
		var to     = {};

		Elusien.frame_length = t / (++Elusien.frame_number);

		if (typeof webvfx_add_to_frame !=='undefined') {for (i = 0; i < webvfx_add_to_frame.length; i++) {webvfx_add_to_frame[i](time, this.params.browser, Elusien.frame_number, Elusien.frame_rate);}}

        for (var param in this.params) {
			if (typeof this.params[param].animate != "undefined"){
				animate    = this.params[param].animate;
				start      = animate.start;
				end        = animate.end;
				ease       = animate.ease;
				duration   = end - start;
				aprops     = Object.getOwnPropertyNames(this.params[param].animate).sort();
				if ((t >= start) && (t <= end)) {
// The next statement is to get over the problem that the time never reaches 1.0. the last time is for the last frame
// which can appear up to 1/frame-rate seconds before 1.0. Since we do not know the framerate, assume it is 24fps.
					if ((end-t) < 2*Elusien.frame_length){t = end;}
					j = 0;
					for (k = 0; k < aprops.length; k++) {
						if (aprops[k].match(/^\d+(.\d)*$/) !== null) {
							prop     = +aprops[k];
							keyftime = (prop * duration / 100) + start;
							if (keyftime <= t) {
								kt       = t - keyftime;
								keystart = k;
								keyend   = keystart+1;
								if (aprops[keyend].match(/^\d+(.\d)*$/) === null) {
									keyend = keystart;
									kt     = 1.0;
									kd     = kt;
								} else {
									kd     = (+aprops[keyend] * duration / 100) - (+aprops[keystart] * duration / 100);
								}
							}
						}
					}
//console.log('DEBUG: prop=' + prop + ', keystart=' + keystart + ', keyend=' + keyend);
					from        = animate[aprops[keystart]];
					  to        = animate[aprops[keyend]];
					fp          = Object.getOwnPropertyNames(from);
					tp          = Object.getOwnPropertyNames( to );
					for (j=0; j<fp.length; j++) {
						property    = fp[j];
						propertyval = " ";
						for (i = 0; i < from[property].length; i++) {
							fprop = from[property][i];
							if(typeof fprop == "string"){fprop = fprop.trim();}
							tprop =   to[property][i];
							if(typeof tprop == "string"){tprop = tprop.trim();}
							if (typeof fprop == "string" && fprop[0] != '#') {
								propertyval += fprop;
							} else if ((typeof fprop == "string") && (fprop[0] == '#')) {
								propertyval += "rgb(";
								startval  = parseInt(fprop.substring(1,3),16);
								changeval = parseInt(tprop.substring(1,3),16) - startval;
								propertyval += Math.floor(this.params[param].easing[ease](kt, +startval, +changeval, kd)) + ',';
								startval  = parseInt(fprop.substring(3,5),16);
								changeval = parseInt(tprop.substring(3,5),16) - startval;
								propertyval += Math.floor(this.params[param].easing[ease](kt, +startval, +changeval, kd)) + ',';
								startval  = parseInt(fprop.substring(5,7),16);
								changeval = parseInt(tprop.substring(5,7),16) - startval;
								propertyval += Math.floor(this.params[param].easing[ease](kt, +startval, +changeval, kd)) + ')';
							} else {
								startval     = fprop;
								changeval    = tprop - startval;
								propertyval += this.params[param].easing[ease](kt, +startval, +changeval, kd);
							}
						}						
//console.log(time +  "|DEBUG: property=" + property + ": " + propertyval);
						this.params[param].style[property] = propertyval;
					}
				}
			} else if (typeof this.params[param].stopwatch != "undefined"){
				run_stopwatch(this.params[param].stopwatch, this.params[param].sw_params, time, Elusien.frame_number, Elusien.frame_rate);
			} else if (typeof this.params[param].slideshow != "undefined"){
				run_slideshow(this.params[param].slideshow, this.params[param].ss_params, time, Elusien.frame_number, Elusien.frame_rate);
			}
        }
    };      // #################### END OF render ####################

    function slideshow_to_JSON_string(data_slideshow) {
/*
        USERS SHOULD NOT MODIFY THIS FUNCTION
        #####################################

        ==============================================================================================================
        Description
        -----------
        This function is called once to create the JSON string from the user's animation request..
        
        Parameters          Description
        ----------          -----------
        data_animate        The string the user provided on the "data-animate" attribute in the HTML.                           
        ==============================================================================================================
*/
        return data_slideshow.replace(                  /\n/g, ' ')
                             .replace(                /\s+:/g, ': ')
                             .replace(              /\s{2,}/g, ' ')
						     .replace(      /([a-z0-9_.]+):/ig, '"$1":')
						     .replace(        /:([^:]*)\s*;/g, ':"$1",')
						     .replace(            /[;,]\s*}/g, '}');
	}
	
    function animate_to_JSON_string(data_animate) {
/*
        USERS SHOULD NOT MODIFY THIS FUNCTION
        #####################################

        ==============================================================================================================
        Description
        -----------
        This function is called once to create the JSON string from the user's animation request..
        
        Parameters          Description
        ----------          -----------
        data_animate        The string the user provided on the "data-animate" attribute in the HTML.                           
        ==============================================================================================================
*/
        return data_animate.replace(                  /\n/g, ' ')
                           .replace(                /\s+:/g, ': ')
                           .replace(              /\s{2,}/g, ' ')
                           .replace(    /(\d\d\d)(.\d*){0,1}%:/g, '$1$2:')
						   .replace(  /(\D)(\d\d)(.\d*){0,1}%:/g, '$10$2$3:')
						   .replace(  /(\D\D)(\d)(.\d*){0,1}%:/g, '$100$2$3:')
						   .replace(      /([a-z0-9_.]+):/ig, '"$1":')
						   .replace(        /:([^:]*)\s*;/g, ':"$1",')
						   .replace(            /[;,]\s*}/g, '}');
	}
	

    function stopwatch_to_JSON_string(data_stopwatch) {
/*
        USERS SHOULD NOT MODIFY THIS FUNCTION
        #####################################

        ==============================================================================================================
        Description
        -----------
        This function is called once to create the JSON string from the user's animation request..
        
        Parameters          Description
        ----------          -----------
        data_animate        The string the user provided on the "data-animate" attribute in the HTML.                           
        ==============================================================================================================
*/
        return data_stopwatch.replace(                     /\n/g, ' ')
                             .replace(                   /\s+:/g, ': ')
                             .replace(                 /\s{2,}/g, ' ')
						     .replace(              /pause\s*;/g, 'pause: normal;')
						     .replace(             /resume\s*;/g, 'resume: normal;')
                             .replace(  /(\d\d\d)(.\d*){0,1}%:/g, '$1$2:')
						     .replace(/(\D)(\d\d)(.\d*){0,1}%:/g, '$10$2$3:')
						     .replace(/(\D\D)(\d)(.\d*){0,1}%:/g, '$100$2$3:')
						     .replace(        /([a-z0-9_.]+):/ig, '"$1":')
						     .replace(           /:([^:]*)\s*;/g, ':"$1",')
						     .replace(               /[;,]\s*}/g, '}');
	}
	
	function format_animate(animate) {
/*
        USERS SHOULD NOT MODIFY THIS FUNCTION
        #####################################

        ==============================================================================================================
        Description
        -----------
        This function is called to modify the "key-frames£ from the user's animation request
        to get them in a format that can be easily manipulated in the "render" function.
        
        Parameters          Description
        ----------          -----------
        animate        The animation object that contains all the info including the key-frames.                           
        ==============================================================================================================
*/
		var 	aprops  = [];
		var     bprops  = [];
		var    anprops  = [];
		var      aval   = {};
		var j           = 0;
		var k           = 0;
		aprops = Object.getOwnPropertyNames(animate).sort();

		for (j=0; j<aprops.length; j++) {
			if ((aprops[j] !='start') && (aprops[j] != 'end') && (aprops[j] != 'ease')) {anprops[k++] = aprops[j];}
		}
		
// process the key-frames animation data
	
		for (j=0; j < anprops.length; j++) {
			aval = animate[anprops[j]];
			bprops = Object.getOwnPropertyNames(aval).sort();
			for (k = 0; k < bprops.length; k++) {
				if (typeof aval[bprops[k]] == 'string') {aval[bprops[k]] = aval[bprops[k]].trim();}
				animate[anprops[j]][bprops[k]] = format_css(aval[bprops[k]]);
			}
		}
	}      // #################### END OF format_animate ####################
	

	function format_css(str){
/*
        USERS SHOULD NOT MODIFY THIS FUNCTION
        #####################################

        ==============================================================================================================
        Description
        -----------
        Yet another function that is called to modify the "key-frames£ from the user's animation request
        to get them in a format that can be easily manipulated in the "render" function.
        
        Parameters          Description
        ----------          -----------
        str        The css property to be animated.                           
        ==============================================================================================================
*/
		var  numRegexp  = /(([+-]{0,1}\d+\.{0,1}\d*)|#([0-9abcdef]+[0-9abcdef]))/ig;
		var hex3Regexp  = /([a-z0-9])([a-z0-9])([a-z0-9])/i;
		var result      = [];
		var atemp       = [];
		var strtemp     = String(str); 
		var j;
		var k      = 0;
		
		if (strtemp === "") {
			result[0] = "";
			return result;
		}
		atemp = strtemp.replace(numRegexp, '|!$1|').split('|');
		for (j=0; j < atemp.length; j++){
			if (atemp[j][0] == '!') {
				if (atemp[j][1] != '#') {
					result[k++] = +atemp[j].substr(1);
				} else {
					if (atemp[j].length == 5) {atemp[j] =atemp[j].replace(hex3Regexp, "$1$1$2$2$3$3");}
					result[k++] = atemp[j].substr(1);
				}
			} else if (atemp[j] !== "") {
				result[k++] = atemp[j];
			}
		}
		return result;
	}      // #################### END OF format_css ####################
	
	function pad(number, length) {  
		var str = '' + number;
		while (str.length < length) {str = '0' + str;}   
		return str;
	}
	
	function error(arr, throw_err){
		var err = 'ERROR: ';
		for (var i = 0; i < arr.length; i++){err += arr[i];}
		console.log(err);
		if (throw_err) {throw(err);} else {
			if (confirm(err + ' DO YOU WISH TO ABORT?')){throw(err);}
		}
	}


function run_slideshow(slideshow, ss_params, time, frame_number, frame_rate){
	var slide_no;
	if (ss_params.last_time == time) {return;}
	ss_params.last_time = time;
	
	function all_images_loaded(report){
/*
	Simple test to see if all images are loaded in the DOM. If not:
		Ask user if he/she wants to abort or wait a bit.
		If the "report" argument is true, print a list of missing files to the console-log.
*/
		for (var i = 0; i < ss_params.images.length; i++){
//console.log('EXIF: ' + exif_orientation(ss_params.images[i].getAttributeNode('src').value));
			if (!(ss_params.images[i].complete && (ss_params.images[i].naturalWidth !== 0))) {
				ss_params.images_loaded = false;
				if (report) {console.log('MISSING image: ' + ss_params.images[i].getAttributeNode('src').value);}
			}
		}
		if (!ss_params.images_loaded && report){alert('A list of missing images is on the console-log.');}
		return ss_params.images_loaded;
	}
//	======= End of function all_images_loaded(report) =======

	if (time === 0.0){
		while (!all_images_loaded(false)){
			err = "WARNING: Not all images loaded yet.\n";
			if (!confirm(err + 'DO YOU WANT TO CARRY ON?'           )){if (!all_images_loaded(true)){throw(err);}}
			if (!confirm('DO YOU WANT TO WAIT FOR MISSING IMAGE(s)?')){if (!all_images_loaded(true)){break     ;}}
		}

		ss_params.slide_len     = 1.0 / ss_params.images.length;
		ss_params.trans_len     = ss_params.trans_pcnt * ss_params.slide_len / 100;
		ss_params.parent_cstyle = window.getComputedStyle(slideshow, null);
		ss_params.parent_width  = slideshow.offsetWidth;
		ss_params.parent_height = slideshow.offsetHeight;
		ss_params.parent_ratio  = ss_params.parent_width / ss_params.parent_height;
		set_image_size();
		transition_image(0.0);
		transition_image(1.0);
		return;
	}
	if (frame_number == 2) {
		ss_params.frame_len    = time;
		ss_params.slide_frames = ss_params.slide_len / ss_params.frame_len;
		ss_params.trans_frames = Math.floor(ss_params.trans_pcnt * ss_params.slide_frames / 100) + 1;
	}
	
	slide_no = Math.floor(time / ss_params.slide_len);	// (first slide is slide_no = 0)
	if (slide_no === 0) {
		return ;
	}
	
	if (slide_no  != ss_params.slide_this ) {	// we have a new slide
		ss_params.slide_prev       = ss_params.slide_this;
		ss_params.slide_this       = slide_no;
		ss_params.slide_start_time = time;
		ss_params.trans_end_time   = time + ss_params.trans_len;

		set_image_size();
	}
	
	if (time < ss_params.trans_end_time) {
		transition_image((time-ss_params.slide_start_time)/ss_params.trans_len);
	} else if ((time == ss_params.trans_end_time) || (ss_params.trans_end_time == ss_params.slide_start_time)){
		transition_image(0.0);
		transition_image(1.0);
	} else {
		transition_image(1.0 + ss_params.magnify * (time - ss_params.trans_end_time) / (ss_params.slide_len - ss_params.trans_len));
	}
	
	function set_image_size() {
		var reverse = false;
		var exif    = ss_params.images[ss_params.slide_this].getAttribute('data-exif');
		if  (exif !== null) {
			switch(exif){
				case '180':	orient  = 3;
							break;
				case  '90':	orient  = 6;
							reverse = true;
							break;
				case '-90':	orient  = 8;
							reverse = true;
							break;
				default   :	orient  = 1;
			}
			reverse = false;
		}
		
		if (ss_params.slide_this !== 0) {
			ss_params.slide_prev_width         = ss_params.slide_this_width;
			ss_params.slide_prev_height        = ss_params.slide_this_height;
			ss_params.slide_prev_move_distance = ss_params.slide_this_move_distance;
			ss_params.slide_prev_offset        = ss_params.slide_this_offset;
		}
		
		ss_params.slide_this_width  = reverse ? ss_params.images[ss_params.slide_this].naturalHeight : ss_params.images[ss_params.slide_this].naturalWidth;
		ss_params.slide_this_height = reverse ? ss_params.images[ss_params.slide_this].naturalWidth  : ss_params.images[ss_params.slide_this].naturalHeight;
		ss_params.slide_this_ratio  = ss_params.slide_this_width / ss_params.slide_this_height;
		
		if (ss_params.slide_this_ratio >= ss_params.parent_ratio){
			ss_params.slide_this_width  = ss_params.parent_width;
			ss_params.slide_this_height = ss_params.slide_this_width / ss_params.slide_this_ratio;
		} else {
			ss_params.slide_this_height = ss_params.parent_height;
			ss_params.slide_this_width  = ss_params.slide_this_height * ss_params.slide_this_ratio;
		}

		ss_params.images[ss_params.slide_this].style.height = (reverse ? ss_params.slide_this_width : ss_params.slide_this_height) + 'px';
		ss_params.images[ss_params.slide_this].style.width  = (reverse ? ss_params.slide_this_height : ss_params.slide_this_width ) + 'px';
            if (reverse) {
// this code will not work, the problem is width is still width, even when rotated 90%.
				ss_params.images[ss_params.slide_this].style.webkitTransform = exif_orientations[orient] + ' translateX(-' + ss_params.slide_this_height/2 +'px)';
			}
		
		ss_params.slide_this_move_distance = (ss_params.horv == 'hriz') ?        ss_params.parent_width                               :        ss_params.parent_height;
		ss_params.slide_this_offset        = (ss_params.horv == 'hriz') ? 0.5 * (ss_params.parent_width - ss_params.slide_this_width) : 0.5 * (ss_params.parent_height - ss_params.slide_this_height);
		return;
	}

	function transition_image(fraction) {
		var p = (ss_params.slide_prev != -1);
		var     style_this = ss_params.images[ss_params.slide_this].style;
		if (p) {style_prev = ss_params.images[ss_params.slide_prev].style;}
		if (fraction > 1.0) {
			style_this.webkitTransform = style_this.webkitTransform + ' scale(' + fraction +',' + fraction +')';
			return;
		}
		if (fraction === 0) {
			style_this.display = "block";
			ss_params.transition_complete = false;
		}
		if (ss_params.type == 'sliding') {
			if (!ss_params.transition_complete) {
				style_this.opacity = fraction;
					style_this[ss_params.dirn]  = ( ss_params.sign * (1-fraction) * ss_params.slide_this_move_distance + ss_params.slide_this_offset) + 'px';
				if (p) {
					style_prev.opacity = 1.0 - fraction;
					style_prev[ss_params.dirn]  = (-ss_params.sign *    fraction  * ss_params.slide_prev_move_distance + ss_params.slide_prev_offset) + 'px';
				}
				ss_params.transition_complete = (fraction == 1.0);
	
				if (p && ss_params.transition_complete){
					style_prev.display = "none";	
				}
			}
		}
		return;
	}
}

	function run_stopwatch(watch, sw_params, time, frame_number, frame_rate) {

        var i=0, hh = 0, mm = 0, ss = 0, mmm = 0;
		var current_time = 0;
		var text = '';
		var t = time;
		var duration;
		var start;
		var end;
		var prop;
		var sprop;
		var aprops = [];
	
		
		if (time === 0.0) {
			sw_params.last_time     = -1;
			sw_params.frame_len     = 1000.0 / frame_rate;		// Length of a frame in msecs.
			sw_params.running_time  = 0;						// running_time  includes time spent pausing
			sw_params.current_time  = 0;						// current_time  excludes time spent pausing
			sw_params.running_frame = 0;						// running_frame includes frames spent pausing
			sw_params.current_frame = 0;						// current_frame excludes frames spent pausing
			sw_params.pausing       = false;
//console.log(frame_rate);			
			
//			for (watch = 0; watch < SW.watches.length; watch++) {
			sw_params.current_time0 = 0;
			sw_params.frame_number0 = 0;
				
			sw_params.spans = watch.children;
			for (i = 0; i < sw_params.spans.length; i++) {	// Hide those empty spans that the user doesn't want to see.
				text = sw_params.spans[i].textContent;
				
				if (text === "") {
					sw_params.spans[i].style.display = "none";
				} else {
					if (i === 0) { sw_params.frame_number0  = +text;}
					if (i === 1) { sw_params.current_time0  = +(text.replace(/^0/     , '')) * 1000 * 60 * 60;}
					if (i === 2) { sw_params.current_time0 += +(text.replace(/^0/     , '')) * 1000 * 60     ;}
					if (i === 3) { sw_params.current_time0 += +(text.replace(/^0/     , '')) * 1000          ;}
					if (i === 4) { sw_params.current_time0 += +(text.replace(/^0{1,2}/, ''))                 ;}
				}
			}
		}
		
		if (sw_params.last_time == time) {return -1;} // This frame is the same as the last one!
		
		start               = sw_params.start;
		end                 = sw_params.end;
		duration 		    = end - start;
		sw_params.last_time = time;
		aprops     = Object.getOwnPropertyNames(sw_params).sort();
//console.log('DEBUG: aprops.length=' + aprops.length + ', aprops[0]=' + aprops[0]);				
		if ((t >= start) && (t <= end)) {
//console.log('DEBUG: Off we go');
// The next statement is to get over the problem that the time never reaches 1.0. the last time is for the last frame
// which can appear up to 1/frame-rate seconds before 1.0. Since we do not know the framerate, assume it is 24fps.
			if ((end-t) < 2*Elusien.frame_length){t = end;}
			if ((aprops.length > 0) && (aprops[0].match(/^\d+(.\d)*$/) !== null)){
				sprop    =  aprops[0];
				 prop     = +aprops[0];
//console.log('DEBUG: t=' + t + ', aprops[0]=' + aprops[0], ' + struct=' + JSON.stringify(sw_params[sprop], null, 4));
				if (((prop * duration / 100) + start) <= t) {
					if (typeof sw_params[sprop].pause != "undefined") {
						sw_params.pausing = true;
					} else if (typeof sw_params[sprop].resume != "undefined") {
						sw_params[sprop].resume = sw_params[sprop].resume.trim();
						sw_params.pausing = false;
						if(sw_params[sprop].resume == 'skip') {
							sw_params.current_time = sw_params.running_time;
						} else if (sw_params[sprop].resume.match(/^\d+$/) !== null) {
								sw_params.running_time  = +sw_params[sprop].resume;
								sw_params.current_time  = sw_params.running_time;
								sw_params.current_time0 = 0;
						}
					}
					delete sw_params[sprop];
				}
			}
			
// The next statement is to get over the problem that the time never reaches 1.0. the last time is for the last frame
// which can appear up to 1/frame-rate seconds before 1.0. Since we do not know the framerate, assume it is 24fps.
				
			if (frame_number !== 0) {
				sw_params.running_time  += sw_params.frame_len;	// running_time  includes time   spent pausing
				sw_params.running_frame += 1;	   				// running_frame includes frames spent pausing
			}
							
// If we are not pausing, update the values in the <span> elements.

			if (! sw_params.pausing){
				if (frame_number !== 0) {
					sw_params.current_time  += sw_params.frame_len;	// Increase current time  with "start" frame as origin
					sw_params.current_frame += 1;	   				// Increase current frame with "start" frame as origin
				}
				current_time = Math.round(sw_params.current_time + sw_params.current_time0);
				mmm          = (current_time % 1000);			// microseconds
				current_time = (current_time - mmm) / 1000;
				ss           = (current_time %   60);			// seconds
				current_time = (current_time -  ss) /   60;
				mm           = (current_time %   60);			// minutes
				current_time = (current_time -  mm) /   60;
				hh           = (current_time);					// hours		
				sw_params.spans[0].textContent = sw_params.frame_number0 + sw_params.current_frame;
				sw_params.spans[1].textContent = pad(hh,  2);
				sw_params.spans[2].textContent = pad(mm,  2);
				sw_params.spans[3].textContent = pad(ss,  2);
				sw_params.spans[4].textContent = pad(mmm, 3);
			}
		}
	}      // #################### END OF run_stopwatch ####################

	function rep_defaults(defaults, args) {
		var key;
		var dkeys  = [];
		var akeys  = [];
		var target = {};
		for (key in defaults) {
			dkeys.push(key);
			target[key] = defaults[key];
		}
		for (key in args)     {
			akeys.push(key);
			target[key] = args[key];}
		dkeys.sort();
		akeys.sort();
		return target;
	}
	
    function start_process() {
		
/*
        USERS SHOULD NOT MODIFY THIS FUNCTION
        #####################################

        ==============================================================================================================

        Description
        -----------
        This function is called first, when all the HTML, CSS and javascript has been loaded by the browser or SHOTCUT.
        It's main function is to do a cursory check that the "data-animate" parameter is a valid JSON string,
        then it creates a Producer object by calling the Producer constructor detailed above.

        ==============================================================================================================
*/
        var easy        = new Easing_Funs(); 
        var webvfxelems = document.getElementsByClassName('webvfx');
        var animate     = [];
        var sw_params   = [];
		var params      = {};
		var slideshows  = [];
		var anims       = [];
		var stopwatches = [];
		var animate_string = [];
		var data_slideshow;
        var data_animate;
		var data_stopwatch;
		var json;
		var i, an, sw, ss, np;
 		var	ok          = true, ok_start = false, ok_end = false, ok_ease = false, ok_000 = false, ok_100 = false, ok_keyframe = false;
        var duration    = 8;             // default duration of clip (in secs)
		
		params.browser  = (typeof webvfx == "undefined");
        Elusien.frame_rate  = 30;            // Default frame-rate (in fps)
            
        try {
            var control         = document.querySelector('[data-control]').getAttribute('data-control').split(':');
            duration            = +control[0];
            Elusien.frame_rate  = +control[1];
        }
        catch(err) {}
		
		    Elusien.frame_number = 0;

		for (i = 0, an=0, sw=0, ss=0, np=0; i < webvfxelems.length; i++) {
			if (webvfxelems[i].hasAttribute('data-animate'   )){
				         anims[an] = webvfxelems[i];
				animate_string[an] = anims[an].getAttribute('data-animate' );
				an++;
			}
			if (webvfxelems[i].hasAttribute('data-animate2'  )){
				         anims[an] = webvfxelems[i];
				animate_string[an] = anims[an].getAttribute('data-animate2');
				an++;
			}
			if (webvfxelems[i].hasAttribute('data-stopwatch' )){
				stopwatches[sw++] = webvfxelems[i];
			}
			if (webvfxelems[i].hasAttribute('data-slideshow')){
				 slideshows[ss++] = webvfxelems[i];
			}
		}

// First process the slideshow, if it exists.

		if (ss > 1){
			err = 'There can only be 1 slideshow, you have ' + ss;
			alert(err);
			throw(err);
		}
		
		if (ss == 1) {
			var ss_defaults = {
				type           : 'sliding',
				from           : 'right'  ,
				transition     : 'fadein' ,
				duration       : '10%'    ,
				magnify        : '0%'     ,
				validate       : {
					type	       : /^(sliding|appearing)$/i     ,
					from	       : /^(top|bottom|left|right)$/i ,
					transition     : /^(fadein|shrink)$/i         ,
					duration       : /^\d+.{0,1}\d*%{0,1}$/       ,
					magnify        : /^\d+.{0,1}\d*%{0,1}$/
				}
			};
	
	function validate_args(args) {
		var fault = false, ok = false, key, err = 'ERROR: ';
		
		if (typeof args.validate == 'undefined') {
			error(['coding error - contact the developer.']);
			return false;
		}
		
		for (var key in args) {
			if (key == 'validate') {continue;}
			if (typeof args.validate[key] == 'undefined'){
				err   += ' BAD parameter| ' + key + ': ' + args[key];
				fault = true;
			} else {
				ok = false;
				if (args[key].match(args.validate[key])) {ok = true;}
				if (!ok) {
					err += ' BAD parameter| ' + key + ': ' + args[key];
					fault = true;
				}
			}
		}
		if (fault) {error(err);}
		return fault;
	}		
			var slideshow = {};
			
			data_slideshow = slideshows[0].getAttribute("data-slideshow");
			if (data_slideshow !== '') {
console.log('DEBUG: data_slideshow='+ data_slideshow);
				json = slideshow_to_JSON_string(data_slideshow);
console.log('DEBUG: json='+ json);
				try {
	               slideshow = JSON.parse(json);
	            }
	            catch(err) {
	                console.log("Error in slideshow: " + err + "\n" + slideshows[0].getAttribute("data-slideshow"));
	                      alert("Error in slideshow: " + err + "\n" + slideshows[0].getAttribute("data-slideshow"));
	                throw(err);
	            }
			}
			
			slideshow = rep_defaults(ss_defaults, slideshow);
console.log('DEBUG:' + JSON.stringify(slideshow, null, 4));
			
			ok = validate_args(slideshow);	// @@@@@@@@@@@ Do some better checking @@@@@@@@@@@@@@@
			
			slideshow.slide_this    =  0;
			slideshow.slide_prev    = -1;
			slideshow.trans_pcnt    = parseFloat(slideshow.duration);
			slideshow.images        = slideshows[0].children;
			slideshow.images_loaded = true;
			slideshow.last_time     = -1;
			slideshow.magnify       = parseFloat(slideshow.magnify) / 100;
			
			switch (slideshow.from) {
				case 'right' :
						slideshow.dirn = 'left';
						slideshow.sign = +1;
						slideshow.horv = 'hriz';
						break;
				case 'left' :
						slideshow.dirn = 'left';
						slideshow.sign = -1;
						slideshow.horv = 'hriz';
						break;
				case 'top' :
						slideshow.dirn = 'top';
						slideshow.sign = -1;
						slideshow.horv = 'vert';
						break;
				case 'bottom' :
						slideshow.dirn = 'top';
						slideshow.sign = +1;
						slideshow.horv = 'vert';
						break;
			}
			
// CHECK THE PARAMETERS HERE

// Centre the slideshow on the page.

			slideshows[0].style.position = 'absolute';
			slideshows[0].style.top      = 0;
			slideshows[0].style.bottom   = 0;
			slideshows[0].style.left     = 0;
			slideshows[0].style.right    = 0;
			slideshows[0].style.margin   = 'auto';
			
			for (i = 0; i < slideshow.images.length; i++) {
				var style = slideshow.images[i].style;
				
//				slideshow.images[i].setAttribute('onload' , 'image_loaded(true)' );
//				slideshow.images[i].setAttribute('onerror', 'image_loaded(false)');
													  			
				if (slideshow.horv == 'hriz') {
					style.display         = 'none';
					style.position        = 'absolute';
					style.left            = '100%';
					style.top             = '50%';
					style.webkitTransform = 'translateY(-50%)';
				} else if (slideshow.horv == 'vert') {
					style.display         = 'none';
					style.position        = 'absolute';
					style.top             = '100%';
					style.left            = '50%';
					style.webkitTransform = 'translateX(-50%)';
				} else {
					alert('error:' + slideshow.horv + ', ' + slideshow.from);
				}
			}
		
			params[np++] = {slideshow: slideshows[0], ss_params: slideshow};
			
		}
		
// Secondly process any animations.

        for (an = 0; an < anims.length; an++) {
            data_animate = animate_string[an];
console.log(data_animate);
            json         = animate_to_JSON_string(data_animate);
//console.log('DEBUG: json='+ json);
			try {
               animate[an] = JSON.parse(json);
            }
            catch(err) {
                console.log("Error in animation number " + (an+1) + ": " + err + "\n" + animate_string[an]);
                      alert("Error in animation number " + (an+1) + ": " + err + "\n" + animate_string[an]);
                throw(err);
            }
//console.log('DEBUG:' + JSON.stringify(animate[an], null, 4));

			ok          = true;
			ok_start    = false;
			ok_end      = false;
			ok_ease     = false;
			ok_000      = false;
			ok_100      = false;
			ok_keyframe = true;
				
			for (var prop in animate[an]) {
				switch (prop) {
					case 'start':
						ok_start = true;
						break;
					case 'end':
						ok_end   = true;
						break;
					case 'ease':
						ok_ease  = true;
						break;
					case '000':
						ok_000   = true;
						break;
					case '100':
						ok_100   = true;
						break;
					default:
						ok_keyframe = prop.match(/\d\d\d(.\d*)*/);
						if (!ok_keyframe) {ok = false;}
				}
			}
			
			if (!ok_start) {
				animate[an].start = 0.0;
			}
			
			if (!ok_end) {
				animate[an].end = 1.0;
			}
			
			if (!ok_ease) {
				animate[an].ease = "linearTween";
			}
			
			if (ok) {ok = ok_000 && ok_100 && ok_keyframe;}
			
			if (! ok ) {
				console.log("Error in animation number " + (an+1) + ': bad keyword:\n' + data_animate + '\n, 0%=' + ok_000 + ', 100%=' + ok_100);
                      alert("Error in animation number " + (an+1) + ': bad keyword:\n' + data_animate + '\n, 0%=' + ok_000 + ', 100%=' + ok_100);
                throw('Badly formatted animation request, 0%=' + ok_000 + ', 100%=' + ok_100);
			}
			
			format_animate(animate[an]);
			
//console.log('DEBUG: animate=' + JSON.stringify(animate[i], null, 4));
			
            params[np++] = {style: anims[an].style, animate: animate[an], easing: easy};
        }

// Thirdly process any stopwatches.

        for (sw = 0; sw < stopwatches.length; sw++) {
            data_stopwatch = stopwatches[sw].getAttribute("data-stopwatch");
			if (data_stopwatch === "") {
				json = "{}";
			} else {
				json = stopwatch_to_JSON_string(data_stopwatch);
			}
//console.log('DEBUG: json='+ json);
			try {
               sw_params[sw] = JSON.parse(json);
            }
            catch(err) {
                console.log("Error in stopwatch number " + (sw+1) + ": " + err + "\n" + data_stopwatch);
                      alert("Error in stopwatch number " + (sw+1) + ": " + err + "\n" + data_stopwatch);
                throw(err);
            }
//console.log('DEBUG:' + JSON.stringify(sw_params[sw], null, 4));

			ok          = true;
			ok_start    = false;
			ok_end      = false;
			ok_keyframe = true;
				
			for (var prop in sw_params[sw]) {
				switch (prop) {
					case 'start':
						ok_start = true;
						break;
					case 'end':
						ok_end   = true;
						break;
					default:
						ok_keyframe = prop.match(/\d\d\d(.\d*)*/);
						if (!ok_keyframe) {ok = false;}
				}
			}
			
			if (!ok_start) {
				sw_params[sw].start = 0.0;
			}
			
			if (!ok_end) {
				sw_params[sw].end = 1.0;
			}
			
			if (ok) {ok = ok_keyframe;}
			
			if (! ok ) {
				console.log("Error in stopwatch number " + (sw+1) + ': bad keyword:\n' + data_stopwatch);
                      alert("Error in stopwatch number " + (sw+1) + ': bad keyword:\n' + data_stopwatch);
                throw('Badly formatted stopwatch request');
			}
            params[np++] = {stopwatch: stopwatches[sw], sw_params: sw_params[sw]};
		}

        var producer = new Producer(params);
        
/*
        ==============================================================================================================
        Description
        -----------
        The following code checks to see if we are running as an Overlay HTML filter in SHOTCUT, or simply running in
        a browser window.
        If we are in SHOTCUT this code is skipped, as we use the SHOTCUT webvfx object.
        If we are in a Browser, we create our own webvfx object and use javascript's setTimeout function to call the render function
        for each frame to manipulate the objects' CSS properties to produce the animation.
    
        It is much, much easier to develop and debug a SHOTCUT Overlay HTML Filter in a browser than in SHOTCUT itself. You have access
        to all of the browser's development tools, like inspecting HTML elements, as well as being able to send debug information to
        the javascript console and check it for error messages. Once you have done the development there you simple call this HTML file
        as a WebVfx-enabled Overlay HTML filter in SHOTCUT without having to make any changes to it at all.
        ==============================================================================================================
*/

        if (typeof webvfx == "undefined") {

			Elusien.iter       = 0;								/* current "frame" number */
            Elusien.delay      = 1000/Elusien.frame_rate;       /* length (in msecs) of a frame */
            Elusien.niters     = duration*Elusien.frame_rate;   /* total number of frames in the clip */
            webvfx = {
						
                        readyRender : function(torf){   
                            var timeout_loop = function(){
                                setTimeout(function(){
                                    var time = Elusien.iter / Elusien.niters;
                                    webvfx.renderRequested.prod.render(time);
                                    if (Elusien.iter++ < (Elusien.niters - 1))  timeout_loop();
                                }, Elusien.delay);
                            };  
                            timeout_loop(); /* call the routine once, then it calls itself recursively */           
                        },
                        renderRequested : {connect : function(prod, render_fun){this.prod = prod;}}
            };
        } 		// ..................... END OF if (typeof webvfx == "undefined") ....................
        
        webvfx.renderRequested.connect(producer, Producer.prototype.render);

        webvfx.readyRender(true);  // This starts the rendering process.
    }       // #################### END OF start_process ####################

//  ################################################################################################
    window.addEventListener("load", function(){start_process();}, false); // DO NOT CHANGE THIS LINE
//  ################################################################################################    
