import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# 输入数据 [known, familiar, unknown]
data = [
    [
        [4, 2, 3],
        [2, 0, 0],
        [3, 1, 2],
        [2, 0, 0],
        [2, 0, 0],
        [2, 0, 0]
    ],
    [
        [3, 1, 1],
        [3, 1, 0],
        [2, 0, 0],
        [2, 0, 0],
        [3, 0, 1]
    ]
]
interval_days = [
    [1, 3, 2, 6, 18, 54],
    [1, 2, 6, 18, 9]
]
labels = [
    [2, 0, 1, 0, 0, 0],
    [2, 1, 0, 0, 2]
]

# 数据预处理
scaler = StandardScaler()

# 将数据转换为适合LSTM输入的格式
X = []
y = []

for i in range(len(data)):
    single_word_data = data[i]
    single_word_intervals = interval_days[i]
    single_word_labels = labels[i]

    # 标准化数据
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


# 定义LSTM模型
class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size, num_layers=1):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x, lengths):
        h0 = torch.zeros(1, x.size(0), hidden_size).to(x.device)
        c0 = torch.zeros(1, x.size(0), hidden_size).to(x.device)
        packed_input = nn.utils.rnn.pack_padded_sequence(x, lengths, batch_first=True, enforce_sorted=False)
        packed_output, (hn, cn) = self.lstm(packed_input, (h0, c0))
        out, _ = nn.utils.rnn.pad_packed_sequence(packed_output, batch_first=True)
        out = self.fc(out[range(len(out)), lengths - 1])
        return out


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
torch.save(model.state_dict(), 'lstm_model.pth')

# 创建一个示例输入
example_input = torch.randn(1, X_train.shape[1], X_train.shape[2])
example_lengths = torch.tensor([X_train.shape[1]])

# 导出模型为ONNX格式
torch.onnx.export(model, (example_input, example_lengths), "lstm_model.onnx", input_names=['input', 'lengths'], output_names=['output'])
