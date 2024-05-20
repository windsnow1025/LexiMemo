import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from data import *
from lstm import LSTMModel

# 将数据转换为适合LSTM输入的格式
X = []
y = []

for i in range(len(data)):
    single_word_data = data[i]
    single_word_intervals = interval_days[i]
    single_word_labels = labels[i]

    # 标准化数据
    scaler = StandardScaler()
    single_word_data = scaler.fit_transform(single_word_data)

    for j in range(1, len(single_word_data) + 1):
        X.append(torch.tensor(single_word_data[:j], dtype=torch.float32))
        y.append(single_word_labels[j - 1])

# 将数据转换为张量
X_combined = []
index = 0
for i in range(len(data)):
    single_word_intervals = interval_days[i]
    for j in range(1, len(data[i]) + 1):
        X_combined.append(
            torch.cat((X[index], torch.tensor(single_word_intervals[:j], dtype=torch.float32).view(-1, 1)), dim=1))
        index += 1

y = torch.tensor(y, dtype=torch.long)

# 将数据转换为适合LSTM输入的格式
X_padded = nn.utils.rnn.pad_sequence(X_combined, batch_first=True)
lengths = torch.tensor([len(x) for x in X_combined])

# 划分训练集和测试集
X_train, X_test, y_train, y_test, lengths_train, lengths_test = train_test_split(X_padded, y, lengths, test_size=0.2,
                                                                                 random_state=42)

input_size = X_train.shape[2]
hidden_size = 50
output_size = 3
num_layers = 1

model = LSTMModel(input_size, hidden_size, output_size, num_layers)

# 定义损失函数和优化器
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练模型
num_epochs = 100
for epoch in range(num_epochs):
    model.train()
    optimizer.zero_grad()
    outputs = model(X_train, lengths_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 10 == 0:
        print(f'Epoch [{epoch + 1}/{num_epochs}], Loss: {loss.item():.4f}')

# 评估模型
model.eval()
with torch.no_grad():
    outputs = model(X_test, lengths_test)
    _, predicted = torch.max(outputs.data, 1)
    accuracy = (predicted == y_test).sum().item() / y_test.size(0)
    print(f'Accuracy: {accuracy * 100:.2f}%')

# 保存模型参数
torch.save(model.state_dict(), 'model/lstm_model.pth')

# 创建一个示例输入
example_input = torch.randn(1, X_train.shape[1], X_train.shape[2])
example_lengths = torch.tensor([X_train.shape[1]])

# 导出模型为ONNX格式，指定动态轴
torch.onnx.export(
    model,
    (example_input, example_lengths),
    "model/lstm_model.onnx",
    input_names=['input', 'lengths'],
    output_names=['output'],
    dynamic_axes={
        'input': {1: 'sequence_length'},
        'lengths': {0: 'batch_size'},
        'output': {0: 'batch_size'}
    }
)
