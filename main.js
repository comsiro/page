function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const descriptions = {
  bubble: "Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order. Often used for teaching sorting basics and simple educational purposes. Suitable for small datasets due to its simplicity but inefficient for large data. Source: GeeksforGeeks, Wikipedia.",
  selection: "Selection Sort selects the smallest element repeatedly and places it at the beginning. Good for small datasets and simple implementations where memory writes are costly. Commonly used in embedded systems. Source: Wikipedia.",
  insertion: "Insertion Sort builds the array one item at a time by inserting elements into their correct position. Common in online algorithms and small or nearly sorted datasets. Used in practice for small arrays within hybrid sorting algorithms. Source: GeeksforGeeks, Wikipedia.",
  merge: "Merge Sort divides and merges arrays efficiently with guaranteed O(n log n) performance. Widely used in databases, external sorting, and scenarios requiring stable sort. Suitable for large datasets. Source: Wikipedia, GeeksforGeeks.",
  quick: "Quick Sort partitions with a pivot and recursively sorts partitions. Widely used in practice (e.g., C's stdlib qsort), known for average-case efficiency. Common in system libraries and general-purpose sorting. Source: GeeksforGeeks, Wikipedia."
};

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
            }
        }
        drawBars(ctx, bars, bars.length - i - 1);
        await sleep(20);
    }
    drawBars(ctx, bars);
}

async function selectionSort(bars, ctx) {
    for (let i = 0; i < bars.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < bars.length; j++) {
            if (bars[j] < bars[min]) min = j;
        }
        if (min !== i) {
            [bars[i], bars[min]] = [bars[min], bars[i]];
        }
        drawBars(ctx, bars, i);
        await sleep(20);
    }
    drawBars(ctx, bars);
}

async function insertionSort(bars, ctx) {
    for (let i = 1; i < bars.length; i++) {
        let key = bars[i];
        let j = i - 1;
        while (j >= 0 && bars[j] > key) {
            bars[j + 1] = bars[j];
            j--;
        }
        bars[j + 1] = key;
        drawBars(ctx, bars, i);
        await sleep(20);
    }
    drawBars(ctx, bars);
}

async function mergeSort(bars, ctx, start = 0, end = bars.length - 1) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(bars, ctx, start, mid);
    await mergeSort(bars, ctx, mid + 1, end);
    await merge(bars, ctx, start, mid, end);
}

async function merge(bars, ctx, start, mid, end) {
    const left = bars.slice(start, mid + 1);
    const right = bars.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            bars[k++] = left[i++];
        } else {
            bars[k++] = right[j++];
        }
        drawBars(ctx, bars, k);
        await sleep(20);
    }

    while (i < left.length) {
        bars[k++] = left[i++];
        drawBars(ctx, bars, k);
        await sleep(20);
    }

    while (j < right.length) {
        bars[k++] = right[j++];
        drawBars(ctx, bars, k);
        await sleep(20);
    }
}

async function quickSort(bars, ctx, left = 0, right = bars.length - 1) {
    if (left < right) {
        const pivotIndex = await partition(bars, ctx, left, right);
        await quickSort(bars, ctx, left, pivotIndex - 1);
        await quickSort(bars, ctx, pivotIndex + 1, right);
    }
}

async function partition(bars, ctx, left, right) {
    const pivot = bars[right];
    let i = left;

    for (let j = left; j < right; j++) {
        if (bars[j] < pivot) {
            [bars[i], bars[j]] = [bars[j], bars[i]];
            drawBars(ctx, bars, j);
            await sleep(20);
            i++;
        }
    }

    [bars[i], bars[right]] = [bars[right], bars[i]];
    drawBars(ctx, bars, i);
    await sleep(20);
    return i;
}

const canvas = document.getElementById('sortCanvas');
const ctx = canvas.getContext('2d');
const algoSelect = document.getElementById('algoSelect');

window.addEventListener('DOMContentLoaded', async () => {
    const bars = createBars(50, canvas.height);
    drawBars(ctx, bars);
    const algo = algoSelect.value;
    const start = performance.now();

    if (algo === 'bubble') {
        await bubbleSort(bars, ctx);
    } else if (algo === 'selection') {
        await selectionSort(bars, ctx);
    } else if (algo === 'insertion') {
        await insertionSort(bars, ctx);
    } else if (algo === 'merge') {
        await mergeSort(bars, ctx);
    } else if (algo === 'quick') {
        await quickSort(bars, ctx);
    }

    const end = performance.now();
    document.getElementById('sortTime').textContent = `Sort time: ${(end - start).toFixed(2)} ms`;
    document.getElementById('sortDescription').textContent = descriptions[algo];
});

algoSelect.addEventListener('change', async () => {
    const bars = createBars(50, canvas.height);
    drawBars(ctx, bars);
    const algo = algoSelect.value;
    const start = performance.now();

    if (algo === 'bubble') {
        await bubbleSort(bars, ctx);
    } else if (algo === 'selection') {
        await selectionSort(bars, ctx);
    } else if (algo === 'insertion') {
        await insertionSort(bars, ctx);
    } else if (algo === 'merge') {
        await mergeSort(bars, ctx);
    } else if (algo === 'quick') {
        await quickSort(bars, ctx);
    }

    const end = performance.now();
    document.getElementById('sortTime').textContent = `Sort time: ${(end - start).toFixed(2)} ms`;
    document.getElementById('sortDescription').textContent = descriptions[algo];
});

const darkToggle = document.getElementById('darkToggle');

darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
});