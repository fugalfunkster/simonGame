$(function(){
  
  /////// global state vars //////////
  
  var userInput = [], userActive = false, queueActive = false, turn = 1, order = [], functionList=[], strict=false, power=false;
  
  /////// Cache DOM elements /////////
  
  var button = $(".button");
  var turnSPAN = $("#turn")[0];
  var red = $("#red");
  var redAudio = $("#redSound")[0];
  var blue = $("#blue");
  var blueAudio = $("#blueSound")[0];
  var yellow = $("#yellow");
  var yellowAudio = $("#yellowSound")[0];
  var green = $("#green");
  var greenAudio = $("#greenSound")[0];
  
  
  ////// Light and Sound Custom Event Handlers ////////
  
  red.on("action", function(){
     red.css("border-color", "hotpink");
     redAudio.play();
     setTimeout(function(){
       red.css("border-color", "red");
     }, 500);
  });
  
  red.click(function(){
    if(userActive){
      userInput.push(1);
      red.trigger("action");
    }
  });
  
  blue.on("action", function(){
     blue.css("border-color", "lightblue");
     blueAudio.play();
     setTimeout(function(){
       blue.css("border-color", "blue");
     }, 500);
  });
  
  blue.click(function(){
    if(userActive){
      userInput.push(2);
      blue.trigger("action");
    }
  });
  
  yellow.on("action", function(){
     yellow.css("border-color", "lightyellow");
     yellowAudio.play();
     setTimeout(function(){
       yellow.css("border-color", "yellow");
     }, 500);
  });
  
  yellow.click(function(){
    if(userActive){
      userInput.push(3);
      yellow.trigger("action");
    }
  });
  
  green.on("action", function(){
     green.css("border-color", "lightgreen");
     greenAudio.play();
     setTimeout(function(){
       green.css("border-color", "green");
     }, 500);
  });
  
  green.click(function(){
    if(userActive){
      userInput.push(4);
      green.trigger("action");
    }
  });
  
  //////// Control Panel ///////////////
  
  $('.smallCircle').click(function(e) {
		e.stopPropagation();
	});
  
  $('.lightSwitch').click(function(event) {
		if(!queueActive){
      $(".which").toggleClass('on').toggleClass('off');
      event.stopPropagation(event);
      power ? power=false : power=true;
      if(power){
        return newGame();
      }
      else{
        userActive = false;
        console.log("userActive is false!");
        turnSPAN.innerHTML = "";
      }
    }
	});
  
  $('.LED').click(function(event) {
    if(power){
      $(this).toggleClass('on').toggleClass('off');
      strict ? strict = false : strict=true;
      event.stopPropagation(e);
    }
	});
  
  /////// StartUp ///////
  
  function newGame(callback){
    
    console.log("New Game!");
    
    /////// new order ///////
    order = [], turn = 1;
  
    for(let i = 0; i < 20; i++){
      let num = 1 + Math.floor(4 * Math.random());
      order.push(num);
    }

    console.log(order);
    
    ////// map order to array of functions////////
    
    functionList = [];
  
    for (var i=0, length=order.length; i<length; i++){
      let button = 0;
      switch (order[i]) {
        case 1:
          button=red;
          break;
        case 2:
          button=blue;
          break;
        case 3:
          button=yellow;
          break;
        case 4:
          button=green;
          break;
        default:
          console.log("Inconcievable");  
      }
      functionList.push(function(i){
        button.trigger("action");
      });
    }
    
    //console.log(functionList);
    
    return eventedQueue();
  } 
  
  /////////// GamePlay ///////////////
  
  /////////// play the order for a given turn //////////
  
  function eventedQueue (){
        
    userActive = false, queueActive=true;
    
    turnSPAN.innerHTML = turn;
    
    if(turn > 20){
      alert("You Won!");
      turn = 1;
      return newGame();
    }

    let queueCounter=0;
    
    let speed = 1000;
    if(turn > 12){
      speed = 650;
    }
    else if(turn > 8){
      speed = 725;
    }
    else if(turn > 4){
      speed = 850;
    }
    
    var eventLoop = window.setInterval(queue, speed);

    function queue(){
      if(queueCounter < turn){
        functionList[queueCounter]();
        queueCounter++;
      }
      else{
        clearInterval(eventLoop);
        userActive = true;
        queueActive = false;
      }
    } 
    
  }
    
    /////////// ACCEPT USER INPUT ////////
    
    button.click(function(){
      if(!userActive){
        console.log("not active");
      }
      else{
        console.log(userInput);
        console.log(turn);
        for(var i = 0; i < userInput.length; i++){
          console.log(order[i], userInput[i]);
          if(order[i] === userInput[i]){
            console.log("same");
            if(userInput.length === turn && userInput.length - 1 === i){
              turn++;
              userInput = [];
              return eventedQueue();
            }
          }
          else{
            userInput=[];
            if(strict){
              alert("Incorrect Entry: Start Over!");
              return newGame();
            }
            else{
              alert("Incorrect Entry: Try Again!");
              return eventedQueue();
            }
          }
        }
      }
    });
      
});  
