import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from data import *
from lstm import LSTMModel

X = []
y = []

for i in range(len(data)):
    scaler = StandardScaler()
    data[i] = scaler.fit_transform(data[i])

    X.append(torch.tensor(data[i], dtype=torch.float32))
    y.append(labels[i])

X_combined = []
index = 0
for i in range(len(data)):
    interval_days_tensor = torch.tensor(interval_days[i], dtype=torch.float32).view(-1, 1)
    X_combined.append(torch.cat((X[i], interval_days_tensor), dim=1))

y = torch.tensor(y, dtype=torch.long)

X_padded = nn.utils.rnn.pad_sequence(X_combined, batch_first=True)
lengths = torch.tensor([len(x) for x in X_combined])

# X_train, X_test, y_train, y_test, lengths_train, lengths_test = train_test_split(X_padded, y, lengths, test_size=0.2,
                                                                                 # random_state=42)

X_train = X_padded
y_train = y
lengths_train = lengths

input_size = X_train.shape[2]
hidden_size = 12
output_size = 3
num_layers = 1

model = LSTMModel(input_size, hidden_size, output_size, num_layers)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

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


def evaluate_model(model, X, y, lengths):
    model.eval()
    with torch.no_grad():
        outputs = model(X, lengths)
        _, predicted = torch.max(outputs.data, 1)
        accuracy = (predicted == y).sum().item() / y.size(0)
    return accuracy


train_accuracy = evaluate_model(model, X_train, y_train, lengths_train)
# test_accuracy = evaluate_model(model, X_test, y_test, lengths_test)

print(f'Train Accuracy: {train_accuracy * 100:.2f}%')
# print(f'Test Accuracy: {test_accuracy * 100:.2f}%')

torch.save(model.state_dict(), 'model/lstm_model.pth')

example_input = torch.randn(1, X_train.shape[1], X_train.shape[2])
example_lengths = torch.tensor([X_train.shape[1]])

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
