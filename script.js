const dino =  document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event){
  if(event.keyCode === 32){ 
    // identificar a tecla que apessoa está precionando
    if(!isJumping){
      jump();
    }
  }
};

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if(position>=150){
      clearInterval(upInterval);

      // descendo
      let downInterval = setInterval(()=>{
        if(position<=0){
          clearInterval(downInterval);
        }else {          
          position -= 20;
          dino.style.bottom = position + 'px';
          isJumping = false;        
        }
      }, 20)
    }else{// subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20)
}

function createCactus(){
  //criando a classe cactus
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000// random números aleatórios entre 0 e 1

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    //caso o cacto passe da tela
    if(cactusPosition < -60){
      clearInterval(leftInterval);
      background.removeChild(cactus);
    }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // se o cacto for =  0 < cacto < 60 quer dizer que ele está onde o cacto está 
      // & se a posição do pulo do dino não está maior que a altura do cacto
      // game over
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    }else {
      // continue andando
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';  
    }
  }, 20) 

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);   