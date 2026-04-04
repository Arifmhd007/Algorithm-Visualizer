export function insertionSort(arr) {
    const animations = [];
    let a = [...arr];

    for (let i = 1; i < a.length; i++) {
        let j = i;
        while (j > 0 && a[j] < a[j - 1]) {
            animations.push({ type: "swap", i: j, j: j - 1 });
            [a[j], a[j - 1]] = [a[j - 1], a[j]];
            j--;
        }
    }
    return animations;
}