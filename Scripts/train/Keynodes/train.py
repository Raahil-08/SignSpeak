import torch
from torch_geometric.loader import DataLoader
from model import ASLGNN
from dataset import KeyPointDataset
import yaml
import os

# Load config
with open("config.yaml") as f:
    config = yaml.safe_load(f)

# Prepare datasets
train_dataset = KeyPointDataset(config['dataset']['train_dir'])
test_dataset = KeyPointDataset(config['dataset']['test_dir'])
train_loader = DataLoader(train_dataset, batch_size=config['dataset']['batch_size'], shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=config['dataset']['batch_size'], shuffle=False)

# Setup model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = ASLGNN(in_features=3, hidden_dim=config['model']['hidden_dim'], num_classes=config['model']['num_classes']).to(device)
optimizer = torch.optim.Adam(model.parameters(), lr=config['training']['lr'])
criterion = torch.nn.CrossEntropyLoss()

# Training loop
for epoch in range(1, config['training']['epochs']+1):
    model.train()
    total_loss, correct, total = 0, 0, 0
    for batch in train_loader:
        batch = batch.to(device)
        optimizer.zero_grad()
        out = model(batch)
        loss = criterion(out, batch.y)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
        pred = out.argmax(dim=1)
        correct += (pred == batch.y).sum().item()
        total += batch.y.size(0)
    print(f"Epoch {epoch}, Loss: {total_loss/len(train_loader):.4f}, Acc: {100*correct/total:.2f}%")

# Evaluation
model.eval()
correct, total = 0, 0
with torch.no_grad():
    for batch in test_loader:
        batch = batch.to(device)
        out = model(batch)
        pred = out.argmax(dim=1)
        correct += (pred == batch.y).sum().item()
        total += batch.y.size(0)
print(f"Test Accuracy: {100*correct/total:.2f}%")

# Save model
os.makedirs(os.path.dirname(config['training']['checkpoint_path']), exist_ok=True)
torch.save(model.state_dict(), config['training']['checkpoint_path'])
print(f"Model saved to {config['training']['checkpoint_path']}")
