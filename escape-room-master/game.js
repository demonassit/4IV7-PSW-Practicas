c.addEventListener("mousemove", changeCursor, false);

/**
 * A clickable object
 * inBounds returns true if co-ordinates are within the bounds of the object
 *
 * optional `canMouseOver` allowing a function to state whether an object can be
 * moused over or not.
 *
 * The `canMouseOver` function should return a boolean.
 */
function GameObject(x1, x2, y1, y2, wall, click, canMouseOver) {
  this.x1 = x1; this.x2 = x2;
  this.y1 = y1; this.y2 = y2;
  this.wall = wall;
  this.click = click || function() {};
  this.inBounds = function(x, y) {
    return (this.x1 <= x && this.x2 >= x && this.y1 <= y && this.y2 >= y);
  };
  this.canMouseOver = canMouseOver || function() {return true;};
}

function clicked(e) {
  e.preventDefault();

  var x = e.clientX;
  var y = e.clientY;

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

function changeCursor(e) {
  e.preventDefault();

  var rect = c.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  // console.log("move: (" + x + ", " + y + ")");

  if(currentWall==5 && eyeFollow==2){
      if(x>625 &&  eyesX <= 614 ){
          eyesX+=1;
      }else if(x<625 && eyesX >=603){
          eyesX-=1;
      }
      if(y>152 &&  eyesY <= 138 ){
          eyesY+=1;
      }else if(y<152 && eyesY >=136){
          eyesY-=1;
      }
        //alert(eyesY);
      ctx.putImageData(Background,300, 0);
      ctx.drawImage(eyes,0,0, eyes.width,eyes.height,eyesX,eyesY,eyes.width,eyes.height);
  }

  function mouseoverobject() {
    for (var key in objects) {
      if (objects[key].wall == currentWall) {
        if (objects[key].canMouseOver()) {
          if (objects[key].inBounds(x,y)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  if (mouseoverobject()) {
    c.style.cursor = 'url(images/ScaldyHand.png), crosshair';
  }
  else {
    c.style.cursor = 'default';
  }
}
