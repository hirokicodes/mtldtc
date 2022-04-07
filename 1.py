def joinArrays(input1, input2):
    subsequence_range = min(len(input1), len(input2))
    for i in range(subsequence_range, 0, -1):
        arr1 = input1[len(input1) - i : len(input1)]
        arr2 = input2[0:i]
        if arr1 == arr2:
            res = input1[: len(input1) - i] + input2
            return res
    return input1 + input2


input_1 = [1, 2, 3, 4]
input_2 = [3, 4, 5, 6]
res = joinArrays(input_1, input_2)
expected_res = [1, 2, 3, 4, 5, 6]
print("Expected result: ", expected_res)
print("Actual result:", res)
print("Correct: ", res == expected_res)

input_1 = [1, 2, 3, 4]
input_2 = [5, 6, 7, 8]
res = joinArrays(input_1, input_2)
expected_res = [1, 2, 3, 4, 5, 6, 7, 8]
print("Expected result: ", expected_res)
print("Actual result:", res)
print("Correct: ", res == expected_res)

input_1 = [1, 2, 1, 2]
input_2 = [1, 2, 7, 8]
res = joinArrays(input_1, input_2)
expected_res = [1, 2, 1, 2, 7, 8]
print("Expected result: ", expected_res)
print("Actual result:", res)
print("Correct: ", res == expected_res)

input_1 = [5, 5, 1, 2]
input_2 = [5, 1, 7, 8]
res = joinArrays(input_1, input_2)
expected_res = [5, 5, 1, 2, 5, 1, 7, 8]
print("Expected result: ", expected_res)
print("Actual result:", res)
print("Correct: ", res == expected_res)


input_1 = [1, 2, 3, 4, 1, 2, 5, 6]
input_2 = [1, 2, 5, 6, 7, 8, 9, 10]
res = joinArrays(input_1, input_2)
expected_res = [1, 2, 3, 4, 1, 2, 5, 6, 7, 8, 9, 10]
print("Expected result: ", expected_res)
print("Actual result:", res)
print("Correct: ", res == expected_res)
