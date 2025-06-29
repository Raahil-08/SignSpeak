from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

# Load model + tokenizer (flan-t5-small is tiny but smart)
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-small")
model.eval()

def fix_grammar(word_list):
    """
    Takes list of detected words and returns a grammatically correct sentence.
    """
    raw = " ".join(word_list)
    prompt = f"Fix grammar and make a correct English sentence: {raw}"

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=40)

    return tokenizer.decode(outputs[0], skip_special_tokens=True)
