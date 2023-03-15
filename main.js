document.querySelector(".control-buttons span").onclick = function() {
    let yourName = prompt("what is your name ?")
    console.log(yourName);
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unknown';
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
}

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-container");

let blocks = Array.from(blocksContainer.children);

// let orderRange =[...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

blocks.forEach((block, index) => {

    // console.log(block);
    // console.log(index);
    block.style.order = orderRange[index];

    // add click event 
    block.addEventListener('click', function() {
        // trigger the flip block function
        flipBlock(block);
        //click all filbed cards
        let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
        // if there is two selected blocks
        if (allFlippedBlocks.length == 2) {
            // stop clicking function 
            stopClicking();
            // check matched blcok function 
            checkMatchedBlock(allFlippedBlocks[0],allFlippedBlocks[1]);
        }
        console.log (blocks.filter(flippedBlock => flippedBlock.classList.contains('has-match')) );
    });
})

// flip block function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
}

function shuffle(array) {
    let current = array.length;
    let temp, random;
    while (current > 0) {
        //random number
        random = Math.floor(Math.random() * current);
        // decrise the current by one
        current--;
        // console.log(random);
        // [1] save current element in stash
        temp = array[current];
        // [2] current element =random element 
        array[current] = array[random];
        // [3] random ele = get ele from stash
        array[random] = temp;
    }
    return array;
}
function stopClicking(){
    blocksContainer.classList.add("no-clciking");

    setTimeout(() =>{
    blocksContainer.classList.remove("no-clciking");
    }, duration);
}
function checkMatchedBlock(fristBlock , secondBlock){
    let triesEle=document.querySelector('.tries span');
    // console.log(triesEle);
    if(fristBlock.dataset.icon === secondBlock.dataset.icon ){
        fristBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        fristBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    }else{
        triesEle.innerHTML = parseInt( triesEle.innerHTML ) + 1;
        document.getElementById('fail').play();
        
        setTimeout(() => {
            fristBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration)


    }
}