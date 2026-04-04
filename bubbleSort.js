export function bubbleSort(arr) {
    const animations = [];
    let a = [...arr];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                animations.push({ type: "swap", i: j, j: j + 1 });
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
    }
    return animations;
}