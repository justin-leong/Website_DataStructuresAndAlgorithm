
var objCtrl = (function(){
    
    var arraySize = 250;
    var numsArray = [];
    var indexPosition = {
        left: 0,
        right: 1
    }
    var iterations = 0;
    
    var randomizeArray = function(){
        min = Math.ceil(10);
        max = Math.floor(600);
        
        for(var i=0; i<arraySize; i++){
            numsArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        indexPosition.left = 0;
        indexPosition.right = 1;
        iterations = 0;
    }
    
    
    return{
        getNumsArray: function(){
            //console.log(numsArray);
            return numsArray;
        },
        
        getArraySize: function(){
            return arraySize;
        },
        
        getIndexPosition: function(){
            return indexPosition;
        },
        
        getIterations: function(){
            return iterations;
        },
        
        updateIndexPositions: function(){
            if(indexPosition.right + 1 >= numsArray.length-iterations){
                indexPosition.left = 0;
                indexPosition.right = 1;
                iterations++;
            }else{
                indexPosition.left++;
                indexPosition.right++;
            }
            /*console.log(indexPosition.left);
            console.log(indexPosition.right);*/
        },
        
        runRandomizeArray: function(){
            randomizeArray();
        }
        
    }

    
    
})();

var UICtrl = (function(){
    var DOMStrings = {
        objectBarItem: "#objectBar",
        containerBars: ".containerBars",
        btnStartSort: "#btnStartSort",
        btnStopSort: "#btnStopSort",
        btnRandomizeArray: "#btnRandomizeArray"
    }
    
    var createBars = function(arraySize){
        //roadmapHtml = '<div class="roadmap" onclick="controller.redirectToRoadmap(\'%roadmapName%\')">%roadmapName%</div>';
        
        for(var i=0; i<arraySize; i++){
            objectBarHtml = '<div class="objectBar" id="objectBar%barNum%"></div>'
            objectBarHtml = objectBarHtml.replace(/%barNum%/g, (i+1));
            document.querySelector(DOMStrings.containerBars).insertAdjacentHTML('beforeend', objectBarHtml);    
        }
        
    }
    
    var sortAnimation = function(numsArray){
        
        for(var i=0; i<numsArray.length; i++){
            document.querySelector(DOMStrings.objectBarItem + (i+1)).style.height = numsArray[i] + "px";    
        }
    }
    
    var sort = function(numsArray, indexPosition, iterations){
        //console.log(numsArray);
        document.querySelector(DOMStrings.objectBarItem + (indexPosition.left+1)).style.backgroundColor = "green";
        document.querySelector(DOMStrings.objectBarItem + (indexPosition.right+1)).style.backgroundColor = "green";
        
        if(indexPosition.right < (numsArray.length-iterations) && numsArray[indexPosition.left] > numsArray[indexPosition.right]){
            var tempHeight = numsArray[indexPosition.left];
            numsArray[indexPosition.left] = numsArray[indexPosition.right];
            numsArray[indexPosition.right] = tempHeight;
            
            document.querySelector(DOMStrings.objectBarItem + (indexPosition.left+1)).style.height = numsArray[indexPosition.left] + "px";
            document.querySelector(DOMStrings.objectBarItem + (indexPosition.right+1)).style.height = numsArray[indexPosition.right] + "px";
        }
        
        //console.log(numsArray);
        
    }
    
    var resetColor = function(arraySize, indexPosition, iterations){
        if(indexPosition.left > 0){
            document.querySelector(DOMStrings.objectBarItem + (indexPosition.left)).style.backgroundColor = "red";
            document.querySelector(DOMStrings.objectBarItem + (indexPosition.right)).style.backgroundColor = "red";
        }else if(iterations < arraySize-2){
            document.querySelector(DOMStrings.objectBarItem + (arraySize-1-iterations)).style.backgroundColor = "red";
            document.querySelector(DOMStrings.objectBarItem + (arraySize-iterations)).style.backgroundColor = "red";
        }else{
            document.querySelector(DOMStrings.objectBarItem + (indexPosition.left+1)).style.backgroundColor = "red";
            document.querySelector(DOMStrings.objectBarItem + (indexPosition.right+1)).style.backgroundColor = "red";
        }
        
    }
    
    return{
        updateAnimation: function(numsArray){
            sortAnimation(numsArray);
        },
        
        getDOMStrings: function(){
            return DOMStrings;
        },
        
        runSort: function(numsArray, indexPosition, iterations){
            sort(numsArray, indexPosition, iterations);
        },
        
        runCreateBars: function(arraySize){
            createBars(arraySize);
        },
        
        runResetColor: function(arraySize, indexPosition, iterations){
            resetColor(arraySize, indexPosition, iterations);
        }
        
    }
})();

var controller = (function(objCtrl, UICtrl){
    var DOM = UICtrl.getDOMStrings();
    var timer;
    
    var initializeBtns = function(){
       
        document.querySelector(DOM.btnStartSort).addEventListener('click', startTimer);
        document.querySelector(DOM.btnStopSort).addEventListener('click', stopTimer);
        document.querySelector(DOM.btnRandomizeArray).addEventListener('click', randomizeArray);
       
    };
    
    var randomizeArray = function(){
        stopTimer();
        objCtrl.runRandomizeArray();
        var numsArray = objCtrl.getNumsArray();
        UICtrl.updateAnimation(numsArray);
    }
    
    var initializeSortArray = function(){
        objCtrl.runRandomizeArray();
        
        var numsArray = objCtrl.getNumsArray();
        var indexPosition = objCtrl.getIndexPosition();
        var iterations = objCtrl.getIterations();
        
        UICtrl.runCreateBars(numsArray.length);
        UICtrl.updateAnimation(numsArray);
    }
    
    var startTimer = function(){
        var numsArray = objCtrl.getNumsArray();
        var indexPosition = objCtrl.getIndexPosition();
        var iterations = objCtrl.getIterations();
        
        timer = setInterval(function(){
                UICtrl.runResetColor(objCtrl.getArraySize(), indexPosition, iterations);
                indexPosition = objCtrl.getIndexPosition();
                iterations = objCtrl.getIterations();
                
                //console.log(indexPosition);
                //console.log("Number of its: " + iterations);
                
                UICtrl.runSort(numsArray, indexPosition, iterations);
            
                if(indexPosition.right + 1 >= numsArray.length-iterations){
                    UICtrl.runResetColor(objCtrl.getArraySize(), indexPosition, iterations);
                }
                objCtrl.updateIndexPositions();
                
                if(iterations >= numsArray.length){
                    stopTimer();
                }
            }, 0.1);
    }
    
    var stopTimer = function(){
        clearInterval(timer);
    }
    
    /*var createNewRoadmap = function(){
        
        phpCtrl.createNewRoadmapPHP(DOM.roadmapName);
    }
    
    var setRoadmapSessionVariable = function(roadmapName){
        phpCtrl.setRoadmapSessionPHP(roadmapName);
    }
    
    var logout = function(){
        console.log("logout js function");
        phpCtrl.logoutPHP();
        window.location.href = "signup.html";
        console.log("redirected to signup.html");
    }*/
    
    return{
        init: function(){
            initializeSortArray();
            initializeBtns();
        }
    }
    
})(objCtrl, UICtrl);

controller.init();