f = open(r'F:\Personal Docs\Code\JavaScript\React-Hangman\react-hangman\word_list.txt','r').read().split('\n')

f.pop(len(f)-1)

new_f = open('wordList.txt','w')

for i in f:
    new_f.write(f"\n\'{i}\',")