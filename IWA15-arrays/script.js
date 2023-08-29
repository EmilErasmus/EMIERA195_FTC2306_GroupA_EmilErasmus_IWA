
const data = {
    lists: [
        ['first', [15, 11, 13, 7, 5]],
        ['second', [2, 6, 8, 4, 14, 12, 10]],
        ['third', [9, 3, 1]],
    ]
}


// Only edit below

const nums1 = data.lists[0][1];
const nums2 = data.lists[1][1];
const nums3 = data.lists[2][1];

const result = []


const extractBiggest = () => {

    const first = nums1[nums1.length - 1] || 0;
    const second = nums2[nums2.length - 1] || 0;
    const third = nums3[nums3.length - 1] || 0;

    maxNum = (Math.max(first, second, third))

    if (nums1.includes(maxNum)) {
        nums1.pop()
    } else if (nums2.includes(maxNum)) {
        nums2.pop()
    } else if (nums3.includes(maxNum)) {
        nums3.pop()
    }

    return maxNum
}



// Only edit above

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

console.log(result)