const AnalogClock = $container => {
  const elementsToContainer = (hand, num) => {
    hand.forEach(info => {
      let arrItem = document.createElement('div');
      arrItem.className = `hand ${info}`;
      $container.appendChild(arrItem);
    });

    for(let i = 1; i <= num; i++) {
      let line = document.createElement('div');
      line.className = `time time${i}`;
      line.innerHTML = '|';
      $container.append(line);
    }
  };
  
  elementsToContainer(['hour', 'minute', 'second'], 12);

  let containerCount = document.querySelectorAll('.analog-clock').length

  setInterval(() => {
    for(let i = 0; i < containerCount; i++) {
      const hourHandDOM = document.querySelectorAll('.hour')[i];
      const minuteHandDOM = document.querySelectorAll('.minute')[i];
      const secondHandDOM = document.querySelectorAll('.second')[i];
    
      const currentDate = new Date(); 
      const secondDeg = currentDate.getSeconds() / 60;
      const minuteDeg = (secondDeg + currentDate.getMinutes()) / 60;
      const hourDeg = (minuteDeg + currentDate.getHours()) / 12; 
    
      const moveClock = (element, rotationDeg) => {
        element.style.setProperty('--deg', rotationDeg * 360);
      };
    
      moveClock(hourHandDOM, hourDeg);
      moveClock(minuteHandDOM, minuteDeg);
      moveClock(secondHandDOM, secondDeg);
    }}, 0);  
};

export default AnalogClock;
