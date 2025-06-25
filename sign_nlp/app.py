import json
from grammar_engine import fix_grammar

with open("sample_input.json") as f:
    word_list = json.load(f)

result = fix_grammar(word_list)
print("✅ Final Sentence:", result)
