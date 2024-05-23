# 输入数据 [known, familiar, unknown]
data = []
interval_days = []
labels = []

# 初始3，认识*3，模糊/2，不认识/10，第n次认识把基准*n

# 1，认识过程中先出现了一次模糊，又一次忘记
data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0]
    ]
)
interval_days.append([1, 3, 2, 6, 1, 3, 9, 27])
labels.append([0, 1, 0, 2, 0, 0, 0, 1])

# 2，认识过程中一开始就出现了模糊和忘记，后又出现了一次忘记
data.append(
    [
        [3, 1, 1],
        [3, 1, 0],
        [2, 0, 1],
        [2, 0, 0],
        [2, 0, 0],
        [3, 0, 1],
        [2, 0, 0],
    ]
)
interval_days.append([1, 1, 1, 3, 9, 1, 3])
labels.append([1, 2, 0, 0, 2, 0, 1])

# 3，第一次就认识，且连续认识3次，最后不认识
data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [3, 0, 2],
    ]
)
interval_days.append([9, 27, 81, 8])
labels.append([0, 0, 2, 1])

# 4，给一个异常长的时间，作为绝对不认识的例子
data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 99])
labels.append([0, 2])

# 4，给一个异常短的时间，作为绝对不认识的例子
data.append(
    [
        [2, 0, 0],
        [2, 0, 1],
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 9, 27, 1])
labels.append([1, 0, 0, 0])
