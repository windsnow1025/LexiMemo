# 输入数据 [known, familiar, unknown]
data = []
interval_days = []
labels = []

# 初始3，认识*3，模糊/2，不认识/10，第n次认识把基准*n

# 直接记住
data.append(
    [
        [2, 0, 0],
    ]
)
interval_days.append([1])
labels.append(0)

data.append(
    [
        [2, 0, 0],
    ]
)
interval_days.append([1])
labels.append(0)

data.append(
    [
        [2, 0, 0],
    ]
)
interval_days.append([2])
labels.append(0)

data.append(
    [
        [2, 0, 0],
    ]
)
interval_days.append([3])
labels.append(1)

data.append(
    [
        [2, 0, 0],
    ]
)
interval_days.append([4])
labels.append(2)

data.append(
    [
        [2, 0, 0],
    ]
)
interval_days.append([5])
labels.append(2)

data.append(
    [
        [2, 0, 0],
    ]
)
interval_days.append([6])
labels.append(2)

# 直接忘记
data.append(
    [
        [4, 2, 3],
    ]
)
interval_days.append([0])
labels.append(0)

data.append(
    [
        [4, 2, 3],
    ]
)
interval_days.append([1])
labels.append(1)

data.append(
    [
        [4, 2, 3],
    ]
)
interval_days.append([2])
labels.append(2)

data.append(
    [
        [4, 2, 3],
    ]
)
interval_days.append([3])
labels.append(2)

data.append(
    [
        [3, 1, 0],
    ]
)
interval_days.append([0])
labels.append(0)

data.append(
    [
        [3, 1, 0],
    ]
)
interval_days.append([1])
labels.append(1)

data.append(
    [
        [3, 1, 0],
    ]
)
interval_days.append([2])
labels.append(2)

data.append(
    [
        [3, 1, 0],
    ]
)
interval_days.append([3])
labels.append(2)

data.append(
    [
        [3, 0, 1],
    ]
)
interval_days.append([0])
labels.append(0)

data.append(
    [
        [3, 0, 1],
    ]
)
interval_days.append([1])
labels.append(1)

data.append(
    [
        [3, 0, 1],
    ]
)
interval_days.append([2])
labels.append(2)

data.append(
    [
        [3, 0, 1],
    ]
)
interval_days.append([3])
labels.append(2)

data.append(
    [
        [2, 1, 1],
    ]
)
interval_days.append([0])
labels.append(0)

data.append(
    [
        [2, 1, 1],
    ]
)
interval_days.append([1])
labels.append(1)

data.append(
    [
        [2, 1, 1],
    ]
)
interval_days.append([2])
labels.append(2)

data.append(
    [
        [2, 1, 1],
    ]
)
interval_days.append([3])
labels.append(2)

data.append(
    [
        [2, 0, 1],
    ]
)
interval_days.append([0])
labels.append(0)

data.append(
    [
        [2, 0, 1],
    ]
)
interval_days.append([1])
labels.append(1)

data.append(
    [
        [2, 0, 1],
    ]
)
interval_days.append([2])
labels.append(2)

data.append(
    [
        [2, 0, 1],
    ]
)
interval_days.append([3])
labels.append(2)

data.append(
    [
        [2, 1, 0],
    ]
)
interval_days.append([0])
labels.append(0)

data.append(
    [
        [2, 1, 0],
    ]
)
interval_days.append([1])
labels.append(1)

data.append(
    [
        [2, 1, 0],
    ]
)
interval_days.append([2])
labels.append(2)

data.append(
    [
        [2, 1, 0],
    ]
)
interval_days.append([3])
labels.append(2)

# 认识过程中先出现了一次模糊，又一次忘记，最后记住
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
interval_days.append([1, 3, 2, 6, 1, 3, 9, 9])
labels.append(0)

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
interval_days.append([1, 3, 2, 6, 1, 3, 9, 12])
labels.append(0)

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
interval_days.append([1, 3, 2, 6, 1, 3, 9, 18])
labels.append(0)

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
interval_days.append([1, 3, 2, 6, 1, 3, 9, 24])
labels.append(0)

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
labels.append(1)

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
interval_days.append([1, 3, 2, 6, 1, 3, 9, 30])
labels.append(1)

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
interval_days.append([1, 3, 2, 6, 1, 3, 9, 36])
labels.append(2)

# 认识过程中先出现了一次模糊，又一次忘记，最后忘记
data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [3, 0, 1]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 9])
labels.append(0)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [3, 0, 1]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 18])
labels.append(1)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [3, 0, 1]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 36])
labels.append(2)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 1]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 9])
labels.append(0)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 1]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 18])
labels.append(1)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 1]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 36])
labels.append(2)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [2, 1, 0]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 9])
labels.append(0)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [2, 1, 0]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 18])
labels.append(1)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [2, 1, 0]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 36])
labels.append(2)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [3, 1, 0]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 9])
labels.append(0)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [3, 1, 0]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 18])
labels.append(1)

data.append(
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 1],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0],
        [3, 1, 0]
    ]
)
interval_days.append([1, 3, 2, 6, 18, 54, 36])
labels.append(2)

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
labels.append(1)

# 不认识的例子
data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 54])
labels.append(2)

data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 81])
labels.append(2)

data.append(
    [
        [2, 0, 1],
        [2, 0, 0],
    ]
)
interval_days.append([1, 6])
labels.append(2)

data.append(
    [
        [2, 0, 1],
        [2, 0, 0],
    ]
)
interval_days.append([1, 9])
labels.append(2)

# 模糊的例子
data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 27])
labels.append(1)

data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 24])
labels.append(1)

data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 30])
labels.append(1)

data.append(
    [
        [2, 0, 1],
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([1, 3, 9])
labels.append(1)

data.append(
    [
        [2, 0, 1],
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([1, 3, 6])
labels.append(1)

data.append(
    [
        [2, 0, 1],
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([1, 3, 12])
labels.append(1)

# 认识的例子
data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 1])
labels.append(0)

data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 3])
labels.append(0)

data.append(
    [
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([9, 9])
labels.append(0)

data.append(
    [
        [2, 0, 1],
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([1, 3, 1])
labels.append(0)

data.append(
    [
        [2, 0, 1],
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([1, 3, 2])
labels.append(0)

data.append(
    [
        [2, 0, 1],
        [2, 0, 0],
        [2, 0, 0],
    ]
)
interval_days.append([1, 3, 3])
labels.append(0)
