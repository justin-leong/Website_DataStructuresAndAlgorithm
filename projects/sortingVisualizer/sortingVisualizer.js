
var objCtrl = (function(){
    
    var arraySize = 200;
    var numsArray = [];
    var indexPosition = {
        left: 0,
        right: 1
    }
    var iterations = 0;
    
    
    var mergeSortObj = {
        mergeSortArray: [],
        mergeSequenceArray: [],
        mergeTempArray: []
    }
    
    var randomizeArray = function(numsArray){
        min = Math.ceil(10);
        max = Math.floor(500);
        
        for(var i=0; i<arraySize; i++){
            numsArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        indexPosition.left = 0;
        indexPosition.right = 1;
        iterations = 0;
    }
    
    var randomizeMergeSortArray = function(numsArray){
        min = Math.ceil(10);
        max = Math.floor(500);
        
        for(var i=0; i<arraySize; i++){
            numsArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    
    var createMergeSortSequenceArray = function(mergeSortArray, mergeSequenceArray){
        recursiveMergeSort(mergeSortArray, mergeSequenceArray, 0, mergeSortArray.length-1);
    }
    
    var setMergeTempArray = function(mergeSortArray, mergeTempArray){
        mergeTempArray = [];
        for(var i=0; i<mergeSortArray.length; i++){
            mergeTempArray.push(mergeSortArray[i]);
        }
    }
    
    var recursiveMergeSort = function(mergeSortArray, mergeSequenceArray, leftStart, rightEnd){
        if(leftStart >= rightEnd){
            return;
        }
        
        var mid = Math.floor((leftStart + rightEnd)/2);
        recursiveMergeSort(mergeSortArray, mergeSequenceArray, leftStart, mid);
        recursiveMergeSort(mergeSortArray, mergeSequenceArray, mid+1, rightEnd);
        
        /*console.log(leftStart);
        console.log(rightEnd);*/
        var range = [leftStart, rightEnd];
        mergeSequenceArray.push(range);
    }
    
    
    return{
        getNumsArray: function(){
            //console.log(numsArray);
            return numsArray;
        },
        
        getMergeSortObj: function(){
            return mergeSortObj;
        },
        
        getMergeSortArray: function(){
            return mergeSortObj.mergeSortArray;
        },
        
        getMergeSortSequenceArray: function(){
            return mergeSortObj.mergeSequenceArray;
        },
        
        getMergeTempArray: function(){
            return mergeSortObj.mergeTempArray;
        },
        
        getMergeRangeComplete: function(){
            return mergeSortObj.rangeCompleted;
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
        
        clearMergeSortSequenceArray: function(){
            mergeSortObj.mergeSequenceArray = [];
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
        
        runRandomizeArray: function(numsArray){
            randomizeArray(numsArray);
        },
        
        runRandomizeMergeSortArray: function(numsArray){
            randomizeMergeSortArray(numsArray);
        },
        
        runCreateMergeSortSequenceArray: function(mergeSortArray, mergeSequenceArray){
            createMergeSortSequenceArray(mergeSortArray, mergeSequenceArray);
        },
        
        runSetMergeTempArray: function(mergeSortArray, mergeTempArray){
            setMergeTempArray(mergeSortArray, mergeTempArray);
        }
        
    }

    
    
})();

var UICtrl = (function(){
    var DOMStrings = {
        objectBarItem: "#objectBar",
        bubbleSortID: "#bubbleSortBar",
        mergeSortID: "#mergeSortBar",
        containerBars: ".containerBars",
        bubbleSortContainer: ".bubbleSortContainer",
        mergeSortContainer: ".mergeSortContainer",
        btnStartSort: "#btnStartSort",
        btnStopSort: "#btnStopSort",
        btnRandomizeArray: "#btnRandomizeArray",
        btnStartMergeSort: "#btnStartMergeSort",
        btnRandomizeMergeSort: "#btnRandomizeMergeSortArray"
    }
    
    var createBars = function(arraySize, barsContainer, sortType){
        //roadmapHtml = '<div class="roadmap" onclick="controller.redirectToRoadmap(\'%roadmapName%\')">%roadmapName%</div>';
        
        for(var i=0; i<arraySize; i++){
            objectBarHtml = '<div class="objectBar" id="%sortType%%barNum%"></div>'
            objectBarHtml = objectBarHtml.replace(/%barNum%/g, (i+1));
            objectBarHtml = objectBarHtml.replace(/%sortType%/g, sortType);
            document.querySelector(barsContainer).insertAdjacentHTML('beforeend', objectBarHtml);    
        }
        
    }
    
    var sortAnimation = function(numsArray, sortType){
        
        for(var i=0; i<numsArray.length; i++){
            document.querySelector(sortType + (i+1)).style.height = numsArray[i] + "px";    
        }
    }
    
    var sort = function(numsArray, indexPosition, iterations, sortType){
        //console.log(numsArray);
        document.querySelector(sortType + (indexPosition.left+1)).style.backgroundColor = "green";
        document.querySelector(sortType + (indexPosition.right+1)).style.backgroundColor = "green";
        
        if(indexPosition.right < (numsArray.length-iterations) && numsArray[indexPosition.left] > numsArray[indexPosition.right]){
            var tempHeight = numsArray[indexPosition.left];
            numsArray[indexPosition.left] = numsArray[indexPosition.right];
            numsArray[indexPosition.right] = tempHeight;
            
            document.querySelector(sortType + (indexPosition.left+1)).style.height = numsArray[indexPosition.left] + "px";
            document.querySelector(sortType + (indexPosition.right+1)).style.height = numsArray[indexPosition.right] + "px";
        }
        
        //console.log(numsArray);
        
    }
    
    var resetColor = function(arraySize, indexPosition, iterations, sortType){
        if(indexPosition.left > 0){
            document.querySelector(sortType + (indexPosition.left)).style.backgroundColor = "red";
            document.querySelector(sortType + (indexPosition.right)).style.backgroundColor = "red";
        }else if(iterations < arraySize-2){
            document.querySelector(sortType + (arraySize-1-iterations)).style.backgroundColor = "red";
            document.querySelector(sortType + (arraySize-iterations)).style.backgroundColor = "red";
        }else{
            document.querySelector(sortType + (indexPosition.left+1)).style.backgroundColor = "red";
            document.querySelector(sortType + (indexPosition.right+1)).style.backgroundColor = "red";
        }
        
    }
    
    var resetToRed = function(mergeSortArray, sortType){
        for(var i=0; i<mergeSortArray.length; i++){
            document.querySelector(sortType + (i + 1)).style.backgroundColor = "red";
        }
    }

    var sortMergeHalves = function(mergeSortObj, mergeSortArray, mergeTempArray, mergeRange, sortType){
        var leftStart = mergeRange[0];
        var leftEnd = Math.floor((mergeRange[0] + mergeRange[1])/2);
        var rightStart = leftEnd + 1;
        var rightEnd = mergeRange[1];
        
        var left = leftStart;
        var right = rightStart;
        var index = leftStart;
        
        /*console.log(left);
        console.log(right);
        console.log(leftEnd);
        console.log(rightEnd);*/

        sortMergeHalvesRecursive(mergeSortObj, mergeSortArray, mergeTempArray, sortType, left, right, leftEnd, rightEnd, index, mergeRange);    
    }
    
    var sortMergeHalvesRecursive = function(mergeSortObj, mergeSortArray, mergeTempArray, sortType, left, right, leftEnd, rightEnd, index, range){
        var timer = setTimeout(function(){
                if(left <= leftEnd && right <= rightEnd){
                    //console.log("Left: " + left);
                    //console.log("Right: " + right);
                    document.querySelector(sortType + (left + 1)).style.backgroundColor = "green";
                    document.querySelector(sortType + (right + 1)).style.backgroundColor = "green";
                }
                
                
                var timerInner = setTimeout(function(){
                    if(left <= leftEnd && right <= rightEnd){
                    
                        if(mergeSortArray[left] <= mergeSortArray[right]){
                            document.querySelector(sortType + (left + 1)).style.backgroundColor = "red";
                            mergeTempArray[index] = mergeSortArray[left];
                            left++;
                            index++;
                        }else{
                            document.querySelector(sortType + (right + 1)).style.backgroundColor = "red";
                            mergeTempArray[index] = mergeSortArray[right];
                            right++;
                            index++;
                        }
                        
                        if(left <= leftEnd && right <= rightEnd){
                            sortMergeHalvesRecursive(mergeSortObj, mergeSortArray, mergeTempArray, sortType, left, right, leftEnd, rightEnd, index, range);    
                        }else{
                            addRemainingHalveRecursive(mergeSortObj, mergeSortArray, mergeTempArray, left, leftEnd, right, rightEnd, sortType, index, range);
                        }
                    }
                }, 5);
            
        }, 5);
    }
    
    var addRemainingHalveRecursive = function(mergeSortObj, mergeSortArray, mergeTempArray, left, leftEnd, right, rightEnd, sortType, index, range){
        var timer = setTimeout(function(){
                if(left <= leftEnd){
                    document.querySelector(sortType + (left + 1)).style.backgroundColor = "red";
                    mergeTempArray[index] = mergeSortArray[left];
                    left++;
                    index++;
                }
                
                if(right <= rightEnd){
                    document.querySelector(sortType + (right + 1)).style.backgroundColor = "red";
                    mergeTempArray[index] = mergeSortArray[right];
                    right++;
                    index++;
                }
                
                
                var timerInner = setTimeout(function(){
                    if(left <= leftEnd){
                        document.querySelector(sortType + (left + 1)).style.backgroundColor = "green";
                        
                    }
                
                    if(right <= rightEnd){
                        document.querySelector(sortType + (right + 1)).style.backgroundColor = "green";
                        
                    }
                    
                    if(left <= leftEnd || right <= rightEnd){
                        addRemainingHalveRecursive(mergeSortObj, mergeSortArray, mergeTempArray, left, leftEnd, right, rightEnd, sortType, index, range);
                    }else{
                        //console.log("Done");
                        mergeSortUpdateHeights(mergeSortObj, mergeSortArray, mergeTempArray, range);
                    }

                }, 5);
            
            }, 5);
    }
    
    var mergeSortUpdateHeights = function(mergeSortObj, mergeSortArray, mergeTempArray, range){
        var currentIndex = range[0];
        var endIndex = range[1];
        
        var interval = setInterval(function(){
            mergeSortArray[currentIndex] = mergeTempArray[currentIndex];
            document.querySelector(DOMStrings.mergeSortID + (currentIndex+1)).style.height = mergeSortArray[currentIndex] + "px";
            
            currentIndex++;
            
            if(currentIndex > endIndex){
                if(mergeSortObj.mergeSequenceArray.length > 0){
                    range = mergeSortObj.mergeSequenceArray.shift();
                    sortMergeHalves(mergeSortObj, mergeSortArray, mergeTempArray, range, DOMStrings.mergeSortID);
                }else{
                    
                    unhideButtons(DOMStrings.btnStartMergeSort, DOMStrings.btnRandomizeMergeSort);
                }
                clearInterval(interval);
            }
            
        }, 5);
    }
    
    var hideButtons = function(startID, randomizeID){
        document.querySelector(startID).style.visibility = "hidden";
        document.querySelector(randomizeID).style.visibility = "hidden";
    }
    
    var unhideButtons = function(startID, randomizeID){
        document.querySelector(startID).style.visibility = "visible";
        document.querySelector(randomizeID).style.visibility = "visible";
    }
    
    return{
        updateAnimation: function(numsArray, sortType){
            sortAnimation(numsArray, sortType);
        },
        
        getDOMStrings: function(){
            return DOMStrings;
        },
        
        runSort: function(numsArray, indexPosition, iterations, sortType){
            sort(numsArray, indexPosition, iterations, sortType);
        },
        
        runCreateBars: function(arraySize, barsContainer, sortType){
            createBars(arraySize, barsContainer, sortType);
        },
        
        runResetColor: function(arraySize, indexPosition, iterations, sortType){
            resetColor(arraySize, indexPosition, iterations, sortType);
        },
        
        runSortMergeHalves: function(mergeSortObj, mergeSortArray, mergeTempArray, mergeRange, sortType){
            sortMergeHalves(mergeSortObj, mergeSortArray, mergeTempArray, mergeRange, sortType);
        },
        
        runHideButtons: function(startID, randomizeID){
            hideButtons(startID, randomizeID);
        },
        
        runUnhideButtons: function(startID, randomizeID){
            unhideButtons(startID, randomizeID);
        }
        
    }
})();

var controller = (function(objCtrl, UICtrl){
    var DOM = UICtrl.getDOMStrings();
    var timer;
    
    var initializeBtns = function(){
       
        document.querySelector(DOM.btnStartSort).addEventListener('click', startTimer);
        //document.querySelector(DOM.btnStopSort).addEventListener('click', stopTimer);
        document.querySelector(DOM.btnRandomizeArray).addEventListener('click', randomizeArray);
        document.querySelector(DOM.btnStartMergeSort).addEventListener('click', startMergeSort);
        document.querySelector(DOM.btnRandomizeMergeSort).addEventListener('click', randomizeMergeSortArray);
       
    };
    
    var randomizeArray = function(){
        stopTimer();
        objCtrl.runRandomizeArray(objCtrl.getNumsArray());
        var numsArray = objCtrl.getNumsArray();
        UICtrl.updateAnimation(numsArray, DOM.bubbleSortID);
    }
    
    var initializeSortArray = function(){
        objCtrl.runRandomizeArray(objCtrl.getNumsArray());
        
        var numsArray = objCtrl.getNumsArray();
        var indexPosition = objCtrl.getIndexPosition();
        var iterations = objCtrl.getIterations();
        var sortType = "bubbleSortBar";
        
        UICtrl.runCreateBars(numsArray.length, DOM.bubbleSortContainer, sortType);
        UICtrl.updateAnimation(numsArray, DOM.bubbleSortID);
    }
    
    var randomizeMergeSortArray = function(){
        // Populates the merge sort array with random integer values between 10 and 600
        objCtrl.runRandomizeMergeSortArray(objCtrl.getMergeSortArray());
        var mergeSortArray = objCtrl.getMergeSortArray();
        
        // Populates the temp array with the values in the merge sort array
        objCtrl.runSetMergeTempArray(mergeSortArray, objCtrl.getMergeTempArray());
        var mergeTempArray = objCtrl.getMergeTempArray();
        var sortType = "mergeSortBar";
        
        // Paints the new graphics to the DOM
        UICtrl.updateAnimation(mergeSortArray, DOM.mergeSortID);
        
        // Clears the existing sequence array and repopulates the range values
        objCtrl.clearMergeSortSequenceArray();
        var mergeSortSequenceArray = objCtrl.getMergeSortSequenceArray();
        objCtrl.runCreateMergeSortSequenceArray(mergeSortArray, mergeSortSequenceArray);
    }
    
    var initializeMergeSortArray = function(){
        // Populates the merge sort array with random integer values between 10 and 600
        objCtrl.runRandomizeMergeSortArray(objCtrl.getMergeSortArray());
        
        // Get the merge sort array from object
        var mergeSortArray = objCtrl.getMergeSortArray();
        
        // Populating the temporary merge sort array with the values in the main array
        objCtrl.runSetMergeTempArray(mergeSortArray, objCtrl.getMergeTempArray());
        var mergeTempArray = objCtrl.getMergeTempArray();
        
        var sortType = "mergeSortBar";
        
        // Create HMTL div tags to represent each bar in the merge array GUI
        UICtrl.runCreateBars(mergeSortArray.length, DOM.mergeSortContainer, sortType);
        UICtrl.updateAnimation(mergeSortArray, DOM.mergeSortID);
        
        // Runs through the merge sort algorithm and populates an array containing the sequence that the merge halves occur in
        var mergeSortSequenceArray = objCtrl.getMergeSortSequenceArray();
        objCtrl.runCreateMergeSortSequenceArray(mergeSortArray, mergeSortSequenceArray);
    }
    
    var startMergeSort = function(){
        // Initilize merge sort array variables
        var mergeSortArray = objCtrl.getMergeSortArray();
        var mergeTempArray = objCtrl.getMergeTempArray();
        var mergeSequenceArray = objCtrl.getMergeSortSequenceArray();
        var mergeSortObj = objCtrl.getMergeSortObj();
        
        // Hide buttons while animation is running
        if(mergeSequenceArray.length > 0){
            UICtrl.runHideButtons(DOM.btnStartMergeSort, DOM.btnRandomizeMergeSort);  
        
            // Retrieves the first range to execute merge sort algorithm
            var range = mergeSequenceArray.shift();
            UICtrl.runSortMergeHalves(mergeSortObj, mergeSortArray, mergeTempArray, range, DOM.mergeSortID);
        }
    }
    
    
    var startTimer = function(){
        var numsArray = objCtrl.getNumsArray();
        var indexPosition = objCtrl.getIndexPosition();
        var iterations = objCtrl.getIterations();
        
        // Hide buttons while animation is running
        if(iterations < numsArray.length){
            UICtrl.runHideButtons(DOM.btnStartSort, DOM.btnRandomizeArray);  
        }
        
        timer = setInterval(function(){
                UICtrl.runResetColor(objCtrl.getArraySize(), indexPosition, iterations, DOM.bubbleSortID);
                indexPosition = objCtrl.getIndexPosition();
                iterations = objCtrl.getIterations();
                
                //console.log(indexPosition);
                //console.log("Number of its: " + iterations);
                
                UICtrl.runSort(numsArray, indexPosition, iterations, DOM.bubbleSortID);
            
                if(indexPosition.right + 1 >= numsArray.length-iterations){
                    UICtrl.runResetColor(objCtrl.getArraySize(), indexPosition, iterations, DOM.bubbleSortID);
                }
                objCtrl.updateIndexPositions();
                
                if(iterations >= numsArray.length){
                    UICtrl.runUnhideButtons(DOM.btnStartSort, DOM.btnRandomizeArray);  
                    stopTimer();
                }
            }, 0.1);
    }
    
    var stopTimer = function(){
        clearInterval(timer);
    }
    
    return{
        init: function(){
            initializeSortArray();
            initializeBtns();
            initializeMergeSortArray();
        }
    }
    
})(objCtrl, UICtrl);

controller.init();