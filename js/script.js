var canvas = $("#myCanvas");
if (canvas.length) 
{
	var ctx = canvas.get(0).getContext("2d");
	var grd = ctx.createLinearGradient(0, 0, 0, 10);
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	drawProgress ( 0 );
}


document.addEventListener('DOMContentLoaded', loaded);

function loaded()
{
	document.addEventListener('touchmove', function(e){ e.preventDefault(); });
	var scroller = $('#scroller');
	if(scroller.length)
	{
		myScroll = new iScroll('scroller', {
			bounce: false,
			hScrollbar: false,
			vScrollbar: false,
			onScrollEnd: onScrollMove,
			onScrollMove: onScrollMove,
			onMomentumStart: onScrollMove,
			onMomentumMove: onScrollMove,
			onMomentumEnd: onScrollMove
		});
	}
}



function drawProgress(progress)
{
	// calculate width of progress bar
	var progressWidth = (canvasWidth - 10) * progress + 10;

	// clear the canvas
	ctx.clearRect(0, 0, canvasWidth, canvasHeight );

	// draw the background
	ctx.strokeStyle = "rgb(190, 215, 217)";
	ctx.fillStyle = "rgba(255, 255, 255, .5)";
	roundRect(ctx, 0, 0, 300, 10, 7, true, true, false);

	// draw the progress
	grd.addColorStop(0, "#D9E7F1");
	grd.addColorStop(1, "#B2C9CB");
	roundRect(ctx, 0, 0, progressWidth, 10, 7, true, false, true);
}

function onScrollMove (e)
{
	var perc = this.y / this.maxScrollY;
	var progPerc = Math.round(perc * 100);
	drawProgress ( perc );
	$("#perc_display").html(progPerc + "%");
}


function roundRect(ctx, x, y, width, height, radius, fill, stroke, linear)
{
	if (typeof stroke == "undefined" )
	{
		stroke = true;
	}
	if (typeof radius === "undefined")
	{
		radius = 5;
	}
	if (typeof linear == "undefined" )
	{
		linear = false ;
	}

	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();


	if (stroke)
	{
		ctx.stroke();
	}

	if (fill)
	{
		if (linear)
		{
			ctx.fillStyle = grd;
		}
		else
		{
			ctx.fillStyle = null;
		}
		ctx.fill();
	}
}



function validateNum(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

$('.btn-refresh').live("touchend click",clearCalc);
$('.calc-calculate').live("touchend click", runCalc);
$('.home_btn, .continue_btn').live("touchend click", gotoHome);
$('.btn1, .inst').live("touchend click", gotoInst);
$('.btn2, .top_btn, .isi').live("touchend click", gotoISI);
$('.btn3, .pi').live("touchend click", gotoPI);
$('.btn4, .conversion_btn').live("touchend click", gotoCalc);

function gotoHome()
{
	top.location.href = "home.html";
}

function gotoInst()
{
	top.location.href = "instructions.html";
}

function gotoISI()
{
	top.location.href = "isi.html";
}

function gotoPI()
{
	top.location.href = "http://www.endo.com/File%20Library/Products/Prescribing%20Information/OpanaER-PI_biconcave_111093.pdf";
}

function gotoCalc()
{
	top.location.href = "calculator.html";
}


// DOSING CONVERSION CALCULATOR

function clearCalc(e) {
	e.preventDefault();
	$('.calc-conversion, .calc-daily, .calc-doses').text("0");
	$('.calc-current select, .calc-input').val(0);
}

function runCalc(e) {

	if ($('.calc-drop option:selected').val() == "0") alert('Please select a current opioid treatment.');
	if ($('.calc-drop option:selected').val() != "0" && $('.calc-input').val() == "0") alert('Please enter a total daily dose.');

    if (e) e.preventDefault();

	cd = $('.calc-current select').val();
	ct = $('.calc-input').val();

	if(ct == '0' || cd == '0') { return false; }

	$('.calc-conversion').text(cd);
	$('.calc-daily').text(Math.round(ct * cd)).append('<span style="font-size: 14px;">mg</span>');
	$('.calc-doses').text(Math.round(ct * cd)/2).append('<span style="font-size: 14px;">mg</span>');

    $('.calc-input').val($('.calc-input').val());
    return false;
}


