export function selectionSort(arr) {
    const animations = [];
    let a = [...arr];

    for (let i = 0; i < a.length; i++) {
        let min = i;
        for (let j = i + 1; j < a.length; j++) {
            if (a[j] < a[min]) min = j;
        }
        if (min !== i) {
            animations.push({ type: "swap", i, j: min });
            [a[i], a[min]] = [a[min], a[i]];
        }
    }
    return animations;
}