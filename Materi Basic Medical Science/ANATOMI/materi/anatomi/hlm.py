import sys,re
k,a,b=sys.argv[1],int(sys.argv[2]),int(sys.argv[3])
t=open(f'_ekstrak/{k}.txt',encoding='utf-8').read()
i=t.find(f'==== Hlm {a} ====');j=t.find(f'==== Hlm {b+1} ====')
s=t[i:j if j>0 else None]
s=re.sub(r'[ \t]+',' ',s);s=re.sub(r'\n\s*\n+','\n',s)
sys.stdout.reconfigure(encoding='utf-8');print(s)
