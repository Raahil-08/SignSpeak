#!/usr/bin/env python3
"""
Evaluate your sklearn keypoint model on a flat CSV.
Outputs metrics CSVs and plots in reports/.
"""

import argparse, time
from pathlib import Path

import numpy as np
import pandas as pd
from joblib import load
from sklearn.metrics import (
    accuracy_score,
    precision_recall_fscore_support,
    classification_report,
    confusion_matrix,
)
import matplotlib.pyplot as plt
import seaborn as sns

# 1. CLI
p = argparse.ArgumentParser()
p.add_argument("--csv",   required=True, help="Path to keypoint CSV")
p.add_argument("--model", required=True, help="Path to your .pkl model")
p.add_argument("--batch", type=int, default=1000, help="Batch size (unused)")
args = p.parse_args()

OUT = Path("reports")
OUT.mkdir(exist_ok=True)

# 2. Load data
df = pd.read_csv(args.csv)
assert "label" in df.columns
X = df.drop(columns="label").values
labels = df["label"].astype("category")
y = labels.cat.codes.values
classes = labels.cat.categories.tolist()

# 3. Load model
clf = load(args.model)       # e.g. random_forest_model.pkl

# 4. Inference
# RandomForest predict_proba gives class probabilities
probs = clf.predict_proba(X)  # shape (N, n_classes)
preds = probs.argmax(axis=1)

# 5. Metrics
acc = accuracy_score(y, preds)
prec, rec, f1, _ = precision_recall_fscore_support(
    y, preds, average="weighted", zero_division=0
)

# Entropy per sample: -sum p*log(p)
entropy = -np.sum(probs * np.log(probs + 1e-12), axis=1)
# We don't have cross-entropy loss directly; use negative log-likelihood:
nll = -np.log(probs[np.arange(len(y)), y] + 1e-12)

metrics = {
    "accuracy":    acc,
    "precision":   prec,
    "recall":      rec,
    "f1_score":    f1,
    "avg_nll":     float(np.mean(nll)),
    "avg_entropy": float(np.mean(entropy)),
}

pd.DataFrame.from_dict(metrics, orient="index", columns=["value"]) \
  .to_csv(OUT/"metrics.csv")

# 6. Per-class report
report = classification_report(
    y, preds, target_names=classes, zero_division=0, output_dict=True
)
pd.DataFrame(report).T.to_csv(OUT/"per_class_metrics.csv")

# 7. Confusion matrix
cm = confusion_matrix(y, preds)
plt.figure(figsize=(10,8))
sns.heatmap(cm, annot=True, fmt="d", cbar=False,
            xticklabels=classes, yticklabels=classes)
plt.title("Confusion Matrix")
plt.tight_layout()
plt.savefig(OUT/"confusion_matrix.png")
plt.close()

# 8. Histograms
for data, fname, title, xlabel in [
    (nll,   "nll_hist.png",     "Negative Log-Likelihood (NLL)", "NLL"),
    (entropy, "entropy_hist.png", "Prediction Entropy",          "Entropy"),
]:
    plt.figure()
    plt.hist(data, bins=50)
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel("Count")
    plt.tight_layout()
    plt.savefig(OUT/fname)
    plt.close()

print(f"✅ Done. Reports saved in {OUT}/")
