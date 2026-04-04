export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return animations;

    const aux = [...array];
    mergeSortHelper(array, 0, array.length - 1, aux, animations);
    return animations;
}

function mergeSortHelper(main, start, end, aux, animations) {
    if (start === end) return;

    const mid = Math.floor((start + end) / 2);

    mergeSortHelper(aux, start, mid, main, animations);
    mergeSortHelper(aux, mid + 1, end, main, animations);

    merge(main, start, mid, end, aux, animations);
}

function merge(main, start, mid, end, aux, animations) {
    let i = start, j = mid + 1, k = start;

    while (i <= mid && j <= end) {
        if (aux[i] <= aux[j]) {
            animations.push({ type: "overwrite", index: k, value: aux[i++] });
        } else {
            animations.push({ type: "overwrite", index: k, value: aux[j++] });
        }
        k++;
    }

    while (i <= mid)
        animations.push({ type: "overwrite", index: k++, value: aux[i++] });

    while (j <= end)
        animations.push({ type: "overwrite", index: k++, value: aux[j++] });
}