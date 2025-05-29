function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function drawBars(ctx, bars, highlight = -1) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const barWidth = width / bars.length;
  ctx.clearRect(0, 0, width, height);
  bars.forEach((val, i) => {
    ctx.fillStyle = i === highlight ? 'red' : '#3498db';
    ctx.fillRect(i * barWidth, height - val, barWidth - 1, val);
  });
}

function createBars(count, maxHeight) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * maxHeight));
}

async function bubbleSort(bars, ctx) {
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      if (bars[j] > bars[j + 1]) {
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
        drawBars(ctx, bars, j);
        await sleep(20);
      }
    }
  }
  drawBars(ctx, bars);
}

async function selectionSort(bars, ctx) {
  const len = bars.length;
  for (let i = 0; i < len - 1; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (bars[j] < bars[min]) min = j;
    }
    if (min !== i) {
      [bars[i], bars[min]] = [bars[min], bars[i]];
      drawBars(ctx, bars, i);
      await sleep(20);
    }
  }
  drawBars(ctx, bars);
}

// 실행
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

const bars1 = createBars(50, canvas1.height);
const bars2 = [...bars1];

drawBars(ctx1, bars1);
drawBars(ctx2, bars2);

bubbleSort([...bars1], ctx1);
selectionSort([...bars2], ctx2);