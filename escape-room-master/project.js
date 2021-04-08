var Begin =0;
var time= document.getElementById('clock');
time.volume=0.2;
var startingMins= 5;

var rugMoved = false;//boolean to delay rug moving scene

var TvPicRef        = 'images/EmptyRoomTemplate.png';
var CloseUpTVOnRef  = 'images/Tv-welcome.png';
var CloseUpTVOffRef = 'images/TvOff.png';
var PianoWall       = 'images/PianoWall.png';
var madHuarOnWall   = 'images/PersonInDoor.png';
var CellarRoom      = "images/CellarLight_On.png";
var PaintingWall    = "images/PaintingWall.png";


var vid1 = document.getElementById('video1');
var vid2 = document.getElementById('video2');
var vid3 = document.getElementById('video3');
var vid4 = document.getElementById('video4');
var vid5 = document.getElementById('video5');
var vid6 = document.getElementById('video6');
var vid7 = document.getElementById('video7');
var vid8 = document.getElementById('video8');
var vid9 = document.getElementById('video9');
var vid10 = document.getElementById('video10');

function draw(v,c,w,h) {
    c.drawImage(v,0,0,w,h);

    if(!v.ended){
      setTimeout(draw,20,v,c,w,h);
    }
}

var lockCount=0;
var padlockView = 'images/padlock3.png';
//padlock2.png
//padlock1.png

var task = 1;
//Task 1 --> Get Key and Axe from the Piano Wall (open top right lock)
//Task 2 --> Get Key and Hacksaw from the basement (open bottom left lock)
//Task 3 --> Use Hacksaw to get cut off bottom right foot
//Task 4 --> Get Key and Hammer from the Portrait Wall (open top left lock)
//Task 5 --> Get final Key from the TV (open the door)

var currentWall = 0;
//currentWall == 0 --> Intro
//currentWall == 1 --> TV close up
//currentWall == 2 --> TV zoomed out
//currentWall == 3 --> Piano zoomed out
//currentWall == 4 --> Tied up man
//currentWall == 5 --> Next puzzle?
//currentWall == 6 --> Piano zoomed in
//currentWall == 7 --> Piano lightswitch on/off
//currentWall == 8 --> Piano keys close-up
//currentWall == 9 --> Left Arm close-up
//currentWall == 10 --> Right Arm close-up
//currentWall == 11 --> Left Leg close-up
//currentWall == 12 --> Right Leg close-up
//currentWall == 13 --> Piano Creep Eyes
//currentWall == 14 --> Piano Creep offers both Key and Hatchet
//currentWall == 15 --> Take Hatchet from Piano Creep
//currentWall == 16 --> Take Key from Piano Creep
//currentWall == 17 --> Cellar

var tvOff = 0;
//tvOff ==0 --> TV is off
//tvOff ==1 --> TV is on


var pianoActive = true;
//pianoActive ==true --> can go into close up versions
//pianoActive == false --> both key and hatchet gotten, cannot go to closeups again

var pianoLightOn= 0;
//pianoLightOn ==0 --> light is on
//pianoLightOn ==1 --> light is off

var pianoKeys = 0;
//pianoKeys==0 --> no correct keys pressed
//pianoKeys==1 --> note 2 pressed
//pianoKeys==2 --> note 2 pressed, note 3 pressed
//pianoKeys==3 --> note 2 pressed, note 3 pressed, note 8 pressed
//pianoKeys==4 --> note 2 pressed, note 3 pressed, note 8 pressed, note 6 pressed

var leftArmLocked  = true;
var rightArmLocked = true;
var leftLegLocked  = true;
var rightLegLocked = true;

var lockBroken = false;

var lightsOff          = false;
var cellarKeyFound     = false;
var cellarHacksawFound = false;
var bothFound          = false;
var PhotoFallen        = false;
var HammerFound        = false;
var key3Found          = false;
var wall5Active        = true;
var gameOver           = false;

itemList = [];//array to access which item is being dragged
itemAtTarget=[];//array to access that item is at it's specific target
//0 --> Hacksaw
//1 --> Hammer
//2 --> Hatchet
//3 --> Key3
//4 --> Key2
//5 --> Key1

c.addEventListener('sound', onSound, false);

var objects = {
  // TV close up
  tvButton1:     new GameObject(750, 768, 364, 386, 1, undefined, function() {return task==1;}),
  tvButton2:     new GameObject(750, 768, 408, 430, 1, undefined, function() {return task==2;}),
  tvButton3:     new GameObject(750, 768, 454, 476, 1, undefined, function() {return task==3;}),
  tvButton4:     new GameObject(750, 768, 497, 523, 1, undefined, function() {return task==4;}),
  tvButton5:     new GameObject(750, 768, 543, 566, 1, undefined, function() {return task==5;}),
  tvMainButton:  new GameObject(750, 770, 105, 130, 1),

  tvCloseUp:           new GameObject(582, 768, 180, 282, 2),
  pianoCloseUp:        new GameObject(480, 830, 110, 350, 3, undefined, function() { return pianoActive; }),
  pianoSwitchCloseUp:  new GameObject(595, 668, 172, 258, 6),
  pianoSwitch:         new GameObject(853, 871, 420, 454, 7),
  pianoKeysCloseUp:    new GameObject(1, 340, 460, 515, 6),

  note1: new GameObject(60, 150, 310, 367, 8),
  note2: new GameObject(187, 250, 320, 390, 8),
  note3: new GameObject(298, 380, 305, 360, 8),
  note4: new GameObject(400, 500, 330, 390, 8),
  note5: new GameObject(515, 610, 329, 392, 8),
  note6: new GameObject(619, 715, 303, 355, 8),
  note7: new GameObject(740, 840, 310, 368, 8),
  note8: new GameObject(847, 950, 321, 380, 8),

  creepEyes:  new GameObject(135, 265, 135, 180, 13),
  hatchet1:   new GameObject(262, 344, 163, 288, 14),
  hatchet2:   new GameObject(262, 344, 163, 288, 16),
  key1:       new GameObject(392, 437, 267, 292, 15),
  key2:       new GameObject(392, 437, 267, 292, 14),

  leftArm:   new GameObject(395, 440, 72, 103, 4, undefined, function(){return leftArmLocked;}),
  rightArm:  new GameObject(565, 617, 70, 112, 4, undefined, function(){return rightArmLocked;}),
  leftLeg:   new GameObject(392, 465, 345, 371, 4, undefined, function(){return leftLegLocked;}),
  rightLeg:  new GameObject(555, 608, 341, 377, 4, undefined, function(){return rightLegLocked;}),

  rugMove:       new GameObject(151, 473, 394, 492, 2, undefined, function(){return task==2;}),
  lockCloseUp:   new GameObject(400, 412, 429, 439, 2, undefined, function(){return task==2;}),
  openTrapDoor:  new GameObject(310, 410, 403, 490, 2, undefined, function(){return lockBroken;}),

  box:       new GameObject(860, 940, 480, 545, 17, clickBox),
  candle:    new GameObject(790, 890, 255, 390, 17, clickCandle),
  rat:       new GameObject(605, 670, 415, 450, 17, clickRat),
  rope:      new GameObject(646, 695, 85,  165, 17, clickRope),
  skeleton:  new GameObject(250, 470, 485, 525, 17, clickSkeleton),
  spider:    new GameObject(780, 840, 140, 170, 17, clickSpider),
  wardrobe:  new GameObject(400, 510, 150, 380, 17, clickWardrobe),
  hacksaw:   new GameObject(25, 55, 350, 395, 17, clickHacksaw),
  arrowOut:  new GameObject(230, 270, 15, 50, 17),

  headstone: new GameObject(43, 160, 60, 215, 5, undefined, function(){return (task==4 && wall5Active);}),

  hammer:  new GameObject(416, 718, 312, 433, 5, undefined, function() {return HammerFound;}),
  key3:    new GameObject(416, 718, 312, 433, 5, undefined, function() {return key3Found;}),

  // TV zoomed out
  // Piano zoomed out
  // Tied up man
  // Next puzzle?
  // Piano zoomed in
  // Piano lightswitch on/off
  // Piano keys close-up
  // Left Arm close-up
  // Right Arm close-up
  // Left Leg close-up
  // Right Leg close-up
  // Piano Creep Eyes
  // Piano Creep offers both Key and Hatchet
  // Take Hatchet from Piano Creep
  // Take Key from Piano Creep
  // Cellar
  // box:       new GameObject(879, 948, 500, 565, 17, clickBox),
  // candle:    new GameObject(803, 903, 260, 380, 17, clickCandle),
  // rat:       new GameObject(623, 680, 428, 456, 17, clickRat),
  // rope:      new GameObject(655, 705, 95,  177, 17, clickRope),
  // skeleton:  new GameObject(260, 550, 500, 565, 17, clickSkeleton),
  // spider:    new GameObject(790, 865, 150, 190, 17, clickSpider),
  // wardrobe:  new GameObject(405, 530, 155, 437, 17, clickWardrobe)
};

for(var i=0;i<7;i++){
  itemList[i]=false; //set all to false initially
  itemAtTarget[i]=false;
}

function inventory(item){ //sets current item's ItemList index to true when being dragged
  var picRef=item.id;
  picRef = picRef.substring(4);
  itemList[picRef]=true;
}

var img1 = new Image();
var img2 = new Image();
img1.onload = function(){
ctx.drawImage(img1,0,0,img1.width,img1.height,0,0,c.width,c.height);
ctx.drawImage(img2,0,0,img2.width,img2.height,0,0,c.width,c.height);
};
img1.src = 'images/OpeningMenuWithText.png';

var eyesX = 608;
var eyesY = 137;
var eyes = new Image();
eyes.src = 'images/movingEye2.png';
var clock=0;

var BeforeTime;
var Background;
var eyeFollow=0;

function countdown(elementName, minutes, seconds) {
  var element, endTime, hours, mins, msLeft, time, t;

  function twoDigits(n) {
    return (n <= 9 ? "0" + n : n);
  }

  function updateTimer() {
    msLeft = endTime - (+new Date());

    if (msLeft < 800 || gameOver) {
      clearTimeout(t);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 1020, 580);
      ctx.font = "50px Arial";
      ctx.fillStyle = "#FF0000";
      ctx.fillText("Game Over", 477, 300);

      ctx.font = "20px Arial";
      ctx.fillStyle = "#FF0000";
      ctx.fillText("Play again?", 560, 400);
      document.getElementById('table').background = '';

    } else {
      if(mins==(startingMins-1)){ //if statement keeps track of minutes passed
        startingMins-=1;
        time.volume +=0.2;
      }

      if(currentWall==4){
        if(clock===0){
          BeforeTime = ctx.getImageData(465,03,480,38);
          clock++;
        }

        ctx.putImageData(BeforeTime,465,03);
        ctx.font = "20px Arial";
        ctx.fillStyle="#FF0000";
        //ctx.getImageData(beforeTime,100,300);
        //     var secs = "" + (msLeft/1000);
        //             secs = secs.substring(1);
        //             var sec = secs.split('.');
        var minutes = twoDigits( mins );
        var secs =  twoDigits( time.getUTCSeconds());
        var timeString = minutes + ":" + secs;
        ctx.fillText(timeString,477,24);

      }
      if(currentWall==5 && eyeFollow==1){
        Background = ctx.getImageData(300,0,1020,580);
        ctx.drawImage(eyes,0,0, eyes.width,eyes.height,608,137,eyes.width,eyes.height);
        eyeFollow=2;
      }

      time = new Date(msLeft);
      hours = time.getUTCHours();
      mins = time.getUTCMinutes();
      element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
      t = setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
    }

  }

  element = document.getElementById( elementName );
  endTime = (+new Date()) + 1000 * (60*minutes + seconds) + 500;
  updateTimer();
}

function updateTaskImages(){
    task++;
    //alert("task: " +task);
    if(task==2){
      tvOff=1;
      CloseUpTVOnRef="images/Tv-FinishedTask1.png";
      document.getElementById("sound1").play();
    }else if(task==3){
    tvOff=1;
      CloseUpTVOnRef="images/Tv-FinishedTask2.png";
      document.getElementById("sound1").play();
    }else if(task==4){
    tvOff=1;
      CloseUpTVOnRef="images/Tv-FinishedTask3.png";
      document.getElementById("sound1").play();
    }else if(task==5){
    tvOff=1;
      CloseUpTVOnRef="images/Tv-code5.png";
      document.getElementById("sound1").play();
    }
  }


c.addEventListener("drop", function( event ) {
  //if inventory tool is over target zone and dropped it's function 'should' run
  // prevent default to allow drop
  event.preventDefault();

  //rugWall

  ////Smash TV With Hammer///
  if(currentWall == 2 && itemAtTarget[1] && itemList[1]){
    document.getElementById("tvsmash").play();
    TvPicRef='images/EmptyRoomTemplate2.png';
    img1.src = TvPicRef;
    CloseUpTVOnRef='images/SmashTvWithKey.png';
    CloseUpTVOffRef='images/SmashTvWithKey.png';

    //tv Smash
    //sound effect
    //change image to tv smashed with key inside
  }

  //takes 3 hits of hatches to break lock. On attempt 3. Lock breaks off and trap door opens.
  if(currentWall == 2 && itemAtTarget[2] && itemList[2]) {
    lockCount++;
    if(lockCount==1){
      document.getElementById("lockhit").play();
      padlockView='images/padlock2.png';
      //sound effect needed
    }else if(lockCount==2){
      document.getElementById("lockhit").play();
      padlockView='images/padlock1.png';
      //sound effect needed.
    }
    else if(lockCount==3){
      //Lock Breaks & trapdoor Opens
      lockBroken = true;
      document.getElementById("lockdrop").play();
      TvPicRef='images/TVWall3LockBroken.png';
      img1.src=TvPicRef;
      //sound effect needed.
    }
  }

  ////Use Saw///
  if(currentWall== 12 && itemAtTarget[0] && itemList[0]){
    currentWall=4;
    madHuarOnWall="images/PersonInDoorArmLegCutOff.png";
    img1.src=madHuarOnWall;
    img2.src="images/big_arrow_left_right.png";
    rightLegLocked=false;
    updateTaskImages();
    document.getElementById('useSaw').play();
    //key function
  }

  ////Use Key 1///
  if(currentWall == 9 && itemAtTarget[5] && itemList[5]) {
    document.getElementById('item5').className="hidden";
    currentWall=4;
    madHuarOnWall="images/PersonInDoorOnFloor.png";
    img1.src=madHuarOnWall;
    img2.src="images/big_arrow_left_right.png";
    leftArmLocked=false;
    document.getElementById('unlockPadlock').play();
    updateTaskImages();
  //alert("key1 worked");
  }

  ////Use Key 2///
  if(currentWall == 11 && itemAtTarget[4] && itemList[4]) {
    document.getElementById('item4').className="hidden";
    currentWall=4;
    madHuarOnWall="images/PersonInDoorLeftLegUnlocked.png";
    img1.src=madHuarOnWall;
    img2.src="images/big_arrow_left_right.png";
    leftLegLocked=false;
    document.getElementById('unlockPadlock').play();
    updateTaskImages();
  //alert("key2 worked");
  }

  ////Use Key 3///
  if(currentWall == 4  && itemAtTarget[3] && itemList[3]) {
    alert("key3 worked");

    document.getElementById('unlockPadlock').play();
    //key function
  }

  ////Use Key 3///
  if(currentWall == 10 && itemAtTarget[3] && itemList[3]) {
    document.getElementById('item3').className="hidden";
    currentWall=4;
    madHuarOnWall="images/PersonInDoorArm1.png";
    img1.src=madHuarOnWall;
    img2.src="images/big_arrow_left_right.png";
    rightArmLocked=false;
    updateTaskImages();
    document.getElementById('unlockPadlock').play();
  }
  //last key //
  if(currentWall == 4 && task==5 && itemAtTarget[6] && itemList[6]) {
    document.getElementById('item6').className="hidden";
    currentWall=4;
    //madHuarOnWall="images/FinalDoorOpen.png";
    //img1.src=madHuarOnWall;
    //img2.src="";
    document.getElementById('unlockPadlock').play();
    draw(vid9,ctx,c.width,c.height);
    vid9.play();

    setTimeout(function(){
      madHuarOnWall="images/End33.png";
      img1.src=madHuarOnWall;
    }, 1500);
  }

  //resets all inventory tools once any tool is dropped//
  for(var i=0;i<7;i++){
    itemList[i]=false;
    itemAtTarget[i] = false;
  }
}, false);

c.addEventListener("dragover", function( event ) {
  //when current item is over its target drop zone sets its respective
  //activator to true.

  // prevent default to allow drop
  event.preventDefault();
  var rect = c.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  //hammer tool smash TV
  if(x>=615 && x<=697 && y>=209 && y<=260 && itemList[1] && currentWall == 2 && task==5){ //key 1 operator
    itemAtTarget[1]=true; //set proper x co ordinates for tv hammer smash
  }else{
    itemAtTarget[1] = false;
  }

  //key 1 over target
  if((x>=485 && x<=585 &&y>=250 && y<=370) && itemList[5] && currentWall== 9){ //key 1 operator
    itemAtTarget[5]=true; //set proper x co ordinates for key1
  }else{
    itemAtTarget[5] = false;
  }

  //key 2 over target
  if((x>=455 && x<=560 &&y>=315 && y<=415) && itemList[4] && currentWall== 11){ //key 1 operator
    itemAtTarget[4]=true; //set proper x co ordinates for key2
  }else{
    itemAtTarget[4] = false;
  }

  //key 3 over target
  if((x>=535 && x<=565 &&y>=195 && y<=245) && itemList[6] && currentWall== 4 && task==5){ //key 1 operator
    itemAtTarget[6]=true; //set proper x co ordinates for key3
  }else{
    itemAtTarget[6] = false;
  }

  //saw over target
  if((x>=280 && x<=540 &&y>=25 && y<=510) && itemList[0] && currentWall== 12){ //key 1 operator
    itemAtTarget[0]=true; //set proper x co ordinates for saw
  }else{
    itemAtTarget[0] = false;
  }

  //hatchet over target //
  if(x>=350 && x<430 && y>=405 && y<=470 && currentWall && TvPicRef=='images/TVWall2RugMoved.png'){ //key 1 operator
    itemAtTarget[2]=true; //set proper x co ordinates for saw & current wall needs to be fixed
  }else{
    itemAtTarget[2] = false;
  }

  //Key1 over right arm target //
  if(x>=430 && x<520 && y>=310 && y<=400 && itemList[3] && currentWall==10){ //key 1 operator
    itemAtTarget[3]=true; //set proper x co ordinates for saw & current wall needs to be fixed
  }else{
    itemAtTarget[3] = false;
  }
}, false);


c.addEventListener("mousedown", clicked, false);

function clicked(e){
  e.preventDefault();

  var rect = c.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  ////////////Left Arrow Clicks //////////////////////////
  if(x>=24 && x<47 && y>=266 && y<=309){
    switch (currentWall) {
    case 1:
        img1.src = TvPicRef;
    currentWall=2;
    img2.src= 'images/big_arrow_left_right.png';
    break;
  case 2:
    img1.src = PaintingWall;
    currentWall=5;
    img2.src= 'images/big_arrow_left_right.png';
    eyeFollow=1;
    break;
  case 3:
    img1.src = TvPicRef;
    currentWall=2;
    img2.src= 'images/big_arrow_left_right.png';
    break;
  case 4:
    img1.src = PianoWall;
    currentWall=3;
    img2.src= 'images/big_arrow_left_right.png';
    break;
    case 5:
    img1.src = madHuarOnWall;
    currentWall=4;
    img2.src= 'images/big_arrow_left_right.png';
    eyeFollow=0;
    clock=0;
    break;
  case 6:
    PianoWall= 'images/PianoWall.png';
    img1.src = PianoWall;
    currentWall=3;
    img2.src= 'images/big_arrow_left_right.png';
    break;
  case 7:
    PianoWall = 'images/PianoWallLightCloser.png';
    img1.src = PianoWall;
    currentWall=6;
    img2.src= 'images/big_arrow_left.png';
    break;
    case 9:
    img1.src = madHuarOnWall;
    currentWall=4;
    img2.src= 'images/big_arrow_left_right.png';
    clock=0;
    break;
  case 11:
    img1.src = madHuarOnWall;
    currentWall=4;
    img2.src= 'images/big_arrow_left_right.png';
    clock=0;
    break;
  default:
    break;
    }
  }


  ///////////Right Arrow Clicks //////////////////
  if(x>=978 && x<996 && y>=265 && y<=313){
    switch (currentWall) {

      case 2:
        img1.src = PianoWall;
        currentWall=3;
        img2.src= 'images/big_arrow_left_right.png';
        break;

      case 3:
        img1.src = madHuarOnWall;
        currentWall=4;
        img2.src= 'images/big_arrow_left_right.png';
        clock=0;
        break;

      case 4:
        img1.src = PaintingWall;
        currentWall=5;
        img2.src= 'images/big_arrow_left_right.png';
        eyeFollow=1;
        break;

      case 5:
        img1.src = TvPicRef;
        currentWall=2;
        img2.src= 'images/big_arrow_left_right.png';
        eyeFollow=0;
        break;

      case 10:
        img1.src = madHuarOnWall;
        currentWall=4;
        img2.src= 'images/big_arrow_left_right.png';
        clock=0;
        break;

      case 12:
        img1.src = madHuarOnWall;
        currentWall=4;
        img2.src= 'images/big_arrow_left_right.png';
        clock=0;
        break;

      default:
        break;
    }
  }

  ///////////////////TASK 1 /////////////////////////////////////

    function HboVid (){

    draw(vid3,ctx,c.width,c.height);
    vid3.play();

    setTimeout(function(){
        img1.src = CloseUpTVOffRef;
        currentWall = 1;
        //document.getElementById("backgroundMusic").play();
      }, 6500);


    }


/*function showWoman2() {
  img1.src = 'images/woman2.PNG';
  setTimeout(showWoman3, 400);
}

function showWoman3() {
  img1.src = 'images/woman3.PNG';
  setTimeout(turnLightsOff, 400);
}*/

function vidpart1(){

    draw(vid3,ctx,c.width,c.height);
    vid3.play();

    setTimeout(function(){
      vidpart2();
      }, 6500);


}

  function vidpart2(){

      draw(vid4,ctx,c.width,c.height);
      vid4.play();

      setTimeout(function(){
        img1.src = CloseUpTVOffRef;
        currentWall = 1;
        document.getElementById("backgroundMusic").play();
        }, 2000);


  }

  if (x>= 640 && x<=770 &&y>=455 && y<=520 && currentWall===0){

    /*draw(vid3,ctx,c.width,c.height);
  vid3.play();

  setTimeout(function(){
    //HboVid();
    //img1.src = CloseUpTVOffRef;
    //currentWall = 1;
    //document.getElementById("backgroundMusic").play();
    }, 6500);

    draw(vid4,ctx,c.width,c.height);
    vid4.play();

    setTimeout(function(){
    //HboVid();
    img1.src = CloseUpTVOffRef;
    currentWall = 1;
    //document.getElementById("backgroundMusic").play();
    }, 2500);*/
    vidpart1();



  }

  ////////////Upclose TV (currentWall ==1)///////////////////////////
  //Turn on and off TV
  if(x>= 750 && x<=770 &&y>=105 && y<=130){
    if(tvOff === 0 && currentWall==1){
      if(Begin===0){
        //starts clock and timer
        countdown( "countdown", 15, 0);// 15 minutes 0 seconds
        //document.getElementById('clock').play();
        Begin++;
      }

      img1.src = CloseUpTVOnRef;
      img2.src = "";
      setHalfVolume() ;
      document.getElementById("sound1").play();
      tvOff = 1;
    }else if(tvOff ==1 && currentWall==1){
      img1.src = CloseUpTVOffRef;
      img2.src = 'images/big_arrow_left.png';
      document.getElementById("sound1").pause();
      tvOff = 0;
    }
  }

  //Buttons don't work when Tv is smashed.
  //img1.src==CloseUpTVOnRef
  if(tvOff==1){
    //button 1
    if(x>=750 && x<768 && y>=364 && y<=386 && task == 1 && currentWall==1){
      img1.src = 'images/Tv-code1.png';
      img2.src = '';
    }
    //button 2
    if(x>=750 && x<768 && y>=408 && y<=430 && task == 2 && currentWall==1){
      img1.src = 'images/Tv-code2.png';
      img2.src = '';
    }
    //button 3
    if(x>=750 && x<768 && y>=454 && y<=476 && task == 3 && currentWall==1){
      img1.src = 'images/Tv-code3.png';
      img2.src = '';
    }
    //button 4
    if(x>=750 && x<768 && y>=497 && y<=523 && task == 4 && currentWall==1){
      img1.src = 'images/Tv-code4.png';
      img2.src = '';
    }
    //button 5
    /*if(x>=750 && x<768 && y>=543 && y<=566 && task == 5 && currentWall==1){
      img1.src = 'images/Tv-code5.png';
      img2.src = '';
    }*/
  }

  //Going from zoomed out TV to TV closeup
  if(x>=582 && x<768 && y>=180 && y<=282 && currentWall==2 ){
    img1.src = CloseUpTVOnRef;
    img2.src = 'images/big_arrow_left.png';
    currentWall=1;
  }

  //////////Piano Wall (currentWall==3; task ==1) /////////////////////

  //Go to closeup (currentWall==6)
  if(x>=480 && x<830 && y>=110 && y<=350 && currentWall==3 && pianoActive){
    PianoWall = 'images/PianoWallLightCloser.png';
    img1.src = PianoWall;
    img2.src = 'images/big_arrow_left.png';
    currentWall=6;
  }

  //Go to piano light switch (currentWall==7)
  if(x>=595 && x<668 && y>=172 && y<=258 && currentWall==6){
    PianoWall = 'images/PianoCodeLightOn.png';
    img1.src = PianoWall;
    img2.src = 'images/big_arrow_left.png';
    currentWall=7;
  }

  //Turning piano light on and off
  if(x>=853 && x<871 && y>=420 && y<=454 && currentWall==7){
    if(pianoLightOn === 0){
      PianoWall = 'images/CodeOnWallLightOff.png';
      img1.src = PianoWall;
      img2.src = '';
      pianoLightOn=1;
    }else if(pianoLightOn ==1){
      PianoWall = 'images/PianoCodeLightOn.png';
      img1.src = PianoWall;
      img2.src = 'images/big_arrow_left.png';
      pianoLightOn=0;
    }
  }

  //Go to piano keys close up (currentWall==8)
  if(x>=1 && x<340 && y>=460 && y<=515 && currentWall==6){
    img1.src = 'images/piano_keys_all_up.png';
    img2.src = 'images/big_arrow_up.png';
    currentWall=8;
  }


  ////////////Pressing Piano keys/////////////////////
  //Press Note 2
  if(x>=187 && x<250 && y>=320 && y<=390 && currentWall==8){
    if(pianoKeys === 0){
      img1.src = 'images/Key_1_down.png';
      pianoKeys= 1;
      document.getElementById("note2").play();
    }else{
      img1.src = 'images/piano_keys_all_up.png';
      pianoKeys= 0;
      document.getElementById("note2").play();
    }
  }

  //Press Note3
  if(x>=298 && x<380 && y>=305 && y<=360 && currentWall==8){
    if(pianoKeys==1){
      img1.src = 'images/Key_2_down.png';
      pianoKeys= 2;
      document.getElementById("note3").play();
    }else{
      img1.src = 'images/piano_keys_all_up.png';
      pianoKeys= 0;
      document.getElementById("note3").play();
    }

  }

  //Press Note 8
  if(x>=847 && x<950 && y>=321 && y<=380 && currentWall==8){
    if(pianoKeys==2){
      img1.src = 'images/Key_3_down.png';
      pianoKeys= 3;
      document.getElementById("note8").play();
    }else{
      img1.src = 'piano_keys_all_up.png';
      pianoKeys= 0;
      document.getElementById("note8").play();
    }
  }

  //Press Note 6
  if(x>=619 && x<715 && y>=303 && y<=355 && currentWall==8){
    if(pianoKeys==3){
      img1.src = 'images/Key_4_down.png';
      pianoKeys= 4;
      document.getElementById("note6").play();

      //**
      //Hatchet Tool appears when played, to be moved to secret compartment.
      //**

      //document.getElementById('item3').className="found";

      setTimeout(function(){
        img1.src = 'images/PianoCreep.png';
        currentWall=13;
        img2.src = '';
      }, 1000);
    }else{
      img1.src = 'images/piano_keys_all_up.png';
      pianoKeys= 0;
      document.getElementById("note6").play();
    }

  }

  //Press Note 1
  if(x>=60 && x<150 && y>=310 && y<=367 && currentWall==8){
    img1.src = 'images/piano_keys_all_up.png';
    pianoKeys= 0;
    document.getElementById("note1").play();
  }

  //Press Note 4
  if(x>=400 && x<500 && y>=330 && y<=390 && currentWall==8){
    img1.src = 'images/piano_keys_all_up.png';
    pianoKeys= 0;
    document.getElementById("note4").play();
  }

  //Press Note 5
  if(x>=515 && x<610 && y>=329 && y<=392 && currentWall==8){
    img1.src = 'images/piano_keys_all_up.png';
    pianoKeys= 0;
    document.getElementById("note5").play();
  }

  //Press Note 7
  if(x>=740 && x<840 && y>=310 && y<=368 && currentWall==8){
    img1.src = 'images/piano_keys_all_up.png';
    pianoKeys= 0;
    document.getElementById("note7").play();
  }


  //Go from piano keys close up, to just Piano Wall close up
  if(x>=484 && x<534 && y>=17 && y<=42 && currentWall==8){
    img1.src = 'images/PianoWallLightCloser.png';
    currentWall=6;
    img2.src = 'images/big_arrow_left.png';
  }

//When Piano Creeps eyes are clicked
  if(x>=135 && x<265 && y>=135 && y<=180 && currentWall==13){
    draw(vid1,ctx,c.width,c.height);
    vid1.play();
    setTimeout(function(){
      img1.src = 'images/PianoCreepBoth.png';
    }, 1800);
    /////Trigger Video from Piano creep -->Hands coming out! Then go straight to PianoCreepBoth.png/////
    currentWall=14;
  }


  //If both items are available and the hatchet is clicked
  if(x>=262 && x<344 && y>=163 && y<=288 && currentWall==14){
    img1.src = 'images/PianoCreepNoHatchet.png';
    currentWall=15;
    document.getElementById("inventoryNew").play();
    document.getElementById('item2').className="found";
    pianoHatchet=true;

    setTimeout(function(){
      }, 800);
  }


  //If only the key is available and is clicked
  if(x>=392 && x<437 && y>=267 && y<=292 && currentWall==15){


    document.getElementById("inventoryNew2").play();
    document.getElementById('item3').className="found";

    setTimeout(function(){
      draw(vid2,ctx,c.width,c.height);
      vid2.play();
      }, 200);

    setTimeout(function(){
    img1.src = 'images/PianoWall.png';
    img2.src = 'images/big_arrow_left_right.png';
    currentWall=3;
      }, 2500);

    /////Trigger Video -->Hands going back in! Then go straight to PianoWall.png/////

  }



  //If both items are available and the key is clicked
  if(x>=392 && x<437 && y>=267 && y<=292 && currentWall==14){

    img1.src = 'images/PianoCreepNoKey.png';
    currentWall=16;
    document.getElementById("inventoryNew").play();
    document.getElementById('item3').className="found";

      setTimeout(function(){
      }, 800);
    pianoKey=true;
  }



  //If only the hatchet is available and is clicked
  if(x>=262 && x<344 && y>=163 && y<=288 && currentWall==16){
  document.getElementById("inventoryNew2").play();
    document.getElementById('item2').className="found";

      setTimeout(function(){
      draw(vid2,ctx,c.width,c.height);
      vid2.play();
      }, 200);
      //Trigger Video then back to piano Wall
    setTimeout(function(){
    img1.src = 'images/PianoWall.png';
    img2.src = 'images/big_arrow_left_right.png';
    currentWall=3;
      }, 2500);

  }





  //////////////Tied Up Wall (currentWall ==4)/////////////////

  //Go to close up of left arm
  if(x>=395 && x<440 && y>=72 && y<=103 && currentWall==4){
    img1.src = 'images/PersonInDoorArm2Close.png';
    currentWall=9;
    img2.src = 'images/big_arrow_left.png';
  }

  //Go to close up of right arm
  if(x>=565 && x<617 && y>=70 && y<=112 && currentWall==4 && rightArmLocked){
    img1.src = 'images/PersonInDoorArm1Close.png';
    currentWall=10;
    img2.src = 'images/big_arrow_right.png';
  }

  //Go to close up of left leg
  if(x>=392 && x<465 && y>=345 && y<=371 && currentWall==4){
    img1.src = 'images/PersonInDoorLegCloseLeft.png';
    currentWall=11;
    img2.src = 'images/big_arrow_left.png';
  }

  //Go to close up of right leg
  if(x>=555 && x<608 && y>=341 && y<=377 && currentWall==4){
    img1.src = 'images/PersonInDoorLegClose.png';
    currentWall=12;
    img2.src = 'images/big_arrow_right.png';
  }

  //////TASK 2///////////////////

//to go to close up of lock
  if(x>=354 && x<422 && y>=403 && y<=440 && currentWall==2 && TvPicRef=='images/TVWall2RugMoved.png'){
    img1.src= padlockView;
    img2.src= 'images/big_arrow_up.png';
  }


  if(x>=151 && x<473 && y>=394 && y<=492 && currentWall==2 && task==2 && TvPicRef=='images/EmptyRoomTemplate.png'){
    //rug Moving sound effect
    TvPicRef='images/TVWall2RugMoved.png';
    img1.src=TvPicRef;

    //hatchet being found will happen elsewhere
      /*document.getElementById("inventoryNew").play();
    document.getElementById('item2').className='found';
    setTimeout(function(){
    rugMoved=true;
    }, 500);*/
  }


  //close up of lock back to normal view
  if(x>=484 && x<534 && y>=17 && y<=42 && TvPicRef=='images/TVWall2RugMoved.png'){
    img1.src = TvPicRef;
    img2.src= 'images/big_arrow_left_right.png';
  }

 //Go from open door to cellar
  if(x>=310 && x<410 && y>=403 && y<=490 && currentWall==2 && TvPicRef=='images/TVWall4DoorOpen.png') {
    if(lightsOff){
      CellarRoom="images/CellarLight_Off.png";
      img1.src=CellarRoom;
      img2.src="";
      currentWall=17;
    }else{
      CellarRoom="images/CellarLight_On.png";
      img1.src=CellarRoom;
      img2.src="";
      currentWall=17;
    }
  }

  //open Trap Door
  if(x>=310 && x<410 && y>=403 && y<=490 && currentWall==2 && lockCount==3 && task==2 && TvPicRef=='images/TVWall3LockBroken.png' && bothFound === false ){
    TvPicRef='images/TVWall4DoorOpen.png';
    img1.src=TvPicRef;
    document.getElementById('squeakyDoor').play();
  }

  ////////////Cellar//////////////////////////

  if(x>=230 && x<270 && y>=15 && y<=50 && currentWall==17){
    if(bothFound){
      TvPicRef="images/TVWall3LockBroken.png";
      img1.src=TvPicRef;
      img2.src="images/big_arrow_left_right.png";
    }else{
      img1.src=TvPicRef;
      img2.src="images/big_arrow_left_right.png";
    }
    currentWall=2;
  }

  ///////////TASK 4////////////////
  /*draw(vid5,ctx,c.width,c.height);
    vid5.play();

  setTimeout(function(){
    document.getElementById("inventoryNew").play();
  document.getElementById('item0').className="found";
  img1.src = 'images/CellarLight_Off.png';
  cellarHacksawFound=true;
  if(cellarKeyFound){
    bothFound=true;
  }
      }, 1500);*/

  if (x>=416 && x<718 && y>=312 && y<=433 && currentWall==5 && key3Found) {
    document.getElementById('item5').className="found";
    document.getElementById("inventoryNew").play();
    img1.src = PaintingWall;
    eyeFollow = 1;
    wall5Active = false;
  }

  if (x>=416 && x<718 && y>=312 && y<=433 && currentWall==5 && HammerFound && !key3Found) {
    document.getElementById('item1').className="found";
    document.getElementById("inventoryNew").play();
    draw(vid8,ctx,c.width,c.height);
    vid8.play();

    key3Found = true;

    setTimeout(function(){
      img1.src = 'images/SpiderHandKey.png';
    }, 1500);
  }

  if (x>=43 && x<160 && y>=60 && y<=215 && currentWall==5 && PhotoFallen && wall5Active) {
    eyeFollow = 0;
    PaintingWall = "images/PaintingWallfallenPainting.png";
    document.getElementById('pictureFall').play();
    img1.src = PaintingWall;
    //PhotoFallen = true;
    draw(vid7,ctx,c.width,c.height);
    vid7.play();

    HammerFound = true;

    setTimeout(function(){
      img1.src = 'images/HandInHole37.png';
    }, 1500);

    //document.getElementById("inventoryNew").play();
    //document.getElementById('item5').className="found";
    //document.getElementById('item1').className="found";
  }

  if(x>=43 && x<160 && y>=60 && y<=215 && currentWall==5 && task==4 && PhotoFallen === false){
    eyeFollow = 1;
    PaintingWall = "images/PaintingWallfallenPainting.png";
    img1.src = PaintingWall;
    PhotoFallen = true;
    // document.getElementById('item5').className="found";
  }

  ////////TASK 5 /////////////////////

  //get key from tv
  if(CloseUpTVOnRef=="images/SmashTvWithKey.png"){
    if(x>=221 && x<287 && y>=293 && y<=356 && currentWall==1 && task==5){
      CloseUpTVOnRef='images/SmashedTv.png';
      CloseUpTVOffRef='images/SmashedTv.png';
      img1.src = CloseUpTVOnRef;
      //Item got sound effect
      document.getElementById("inventoryNew").play();
      document.getElementById('item6').className="found";
    }
  }


  if(x>=430 && x<565 && y>=62 && y<=350 && currentWall==4 && task==5 && madHuarOnWall=="images/End33.png"){
    draw(vid10,ctx,c.width,c.height);
    vid10.play();

    setTimeout(function(){
      console.log("Game Over");
      gameOver = true;
    }, 3500);
  }

  console.log("click: (" + x + ", " + y + ")");

  for (var key in objects) {
    if (objects[key].wall == currentWall) {
      if (objects[key].inBounds(x,y)) {
        console.log(key);
        objects[key].click();
      }
    }
  }
}

function clickBox() {
  if (lightsOff===true && cellarKeyFound===false) {
    document.getElementById("inventoryNew").play();
    showKey1();
  document.getElementById('item4').className="found";
  cellarKeyFound=true;
  if(cellarHacksawFound){
    bothFound=true;
  }
  }
}

function clickCandle() {
  if (!lightsOff) {
    img1.src = 'images/CellarLight_Off.png';
    lightsOff = true;
  }
}

function clickRat() {
  if (lightsOff) {
    document.getElementById("sound2").play();
    img1.src = 'images/ratEat1.PNG';
    setTimeout(showRat2,400);
  }
}

function clickRope() {
  if (lightsOff) {
    document.getElementById("sound4").play();
    showMan1();
  }
}

function clickSkeleton() {
  if (lightsOff) {
    document.getElementById("sound3").play();
  }
}

function clickSpider() {
  if (lightsOff===true) {
    draw(vid6,ctx,c.width,c.height);
    vid6.play();

    setTimeout(function(){
      img1.src = 'images/CellarLight_Off.png';
    }, 1500);

  }
}

function clickWardrobe() {
  if (lightsOff) {
    document.getElementById("sound6").play();
    showWoman1();
  }
}

function turnLightsOff() {
  img1.src = 'images/CellarLight_Off.png';
}

function showWoman1() {
  img1.src = 'images/woman1.PNG';
  setTimeout(showWoman2, 400);
}

function showWoman2() {
  img1.src = 'images/woman2.PNG';
  setTimeout(showWoman3, 400);
}

function showWoman3() {
  img1.src = 'images/woman3.PNG';
  setTimeout(turnLightsOff, 400);
}

function showRat1() {
  img1.src = 'images/ratEat1.PNG';
  setTimeout(showRat2, 400);
}

function showRat2() {
  img1.src = 'images/ratEat2.PNG';
  setTimeout(showRat3, 400);
}

function showRat3() {
  img1.src = 'images/ratEat3.PNG';
  setTimeout(turnLightsOff, 400);
}

function showMan1() {
  img1.src = 'images/Hanging1.PNG';
  setTimeout(showMan2, 150);
}

function showMan2() {
  img1.src = 'images/Hanging2.PNG';
  setTimeout(showMan3, 150);
}

function showMan3() {
  img1.src = 'images/Hanging3.PNG';
  setTimeout(showMan4, 150);
}

function showMan4() {
  img1.src = 'images/Hanging2.PNG';
  setTimeout(showMan5, 150);
}

function showMan5() {
  img1.src = 'images/Hanging1.PNG';
  setTimeout(showMan6, 150);
}

function showMan6() {
  img1.src = 'images/Hanging4.PNG';
  setTimeout(showMan7, 150);
}

function showMan7() {
  img1.src = 'images/Hanging5.PNG';
  setTimeout(showMan8, 150);
}

function showMan8() {
  img1.src = 'images/Hanging4.PNG';
  setTimeout(showMan9, 150);
}

function showMan9() {
  img1.src = 'images/Hanging1.PNG';
  setTimeout(turnLightsOff, 200);
}

function showKey1() {
  img1.src = 'images/GotKey1.PNG';
  setTimeout(showKey2, 150);
}

function showKey2() {
  img1.src = 'images/GotKey2.PNG';
  setTimeout(showKey3, 150);
}

function showKey3() {
  img1.src = 'images/GotKey1.PNG';
  setTimeout(showKey4, 150);
}

function showKey4() {
  img1.src = 'images/GotKey3.PNG';
  setTimeout(showKey5, 150);
}

function showKey5() {
  img1.src = 'images/GotKey1.PNG';
  setTimeout(showKey6, 150);
}

function showKey6() {
  img1.src = 'images/GotKey2.PNG';
  setTimeout(showKey7, 150);
}

function showKey7() {
  img1.src = 'images/GotKey1.PNG';
  setTimeout(showKey8, 150);
}

function showKey8() {
  img1.src = 'images/GotKey3.PNG';
  setTimeout(turnLightsOff, 200);
}

function clickHacksaw() {
  if (lightsOff===true && cellarHacksawFound===false) {
    draw(vid5,ctx,c.width,c.height);
    vid5.play();

    setTimeout(function(){
      document.getElementById("inventoryNew").play();
      document.getElementById('item0').className="found";
      img1.src = 'images/CellarLight_Off.png';
      cellarHacksawFound=true;
      if(cellarKeyFound){
        bothFound=true;
      }
    }, 1500);

  }
}

function setHalfVolume() {
  sound1.volume = 0.1;
}

// Use `e.soundLevel` to get the sound level.
function onSound(e) {
  if (currentWall == 17 && !lightsOff) {
    console.log("noise:" + e.soundLevel);
    CellarRoom = 'images/CellarLight_Off.png';
    img1.src = CellarRoom;
    lightsOff = true;
  }
}
