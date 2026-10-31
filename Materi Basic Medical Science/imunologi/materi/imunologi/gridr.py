import pymupdf,sys,os
from PIL import Image, ImageDraw
d=pymupdf.open("../../materi mentah/"+os.environ.get("PDF","Cellular and Molecular Immunology 9e.pdf"))
out=[]
for spec in sys.argv[2:]:
    p,x0,y0,x1,y1=[int(v) for v in spec.split(",")]
    pix=d[p-1].get_pixmap(matrix=pymupdf.Matrix(1,1)); im=Image.frombytes("RGB",[pix.width,pix.height],pix.samples)
    dr=ImageDraw.Draw(im)
    for v in range(0,800,25):
        c=(255,0,0) if v%100==0 else (255,190,190)
        dr.line([(v,0),(v,800)],fill=c); dr.line([(0,v),(700,v)],fill=c if v%100 else (0,0,255))
        if v%50==0:
            for k in range(0,800,100): dr.text((v+1,k+1),str(v),fill="red"); dr.text((k+1,v+1),str(v),fill="blue")
    out.append(im.crop((x0,y0,x1,y1)))
z=float(os.environ.get("Z","0.8"))
W=sum(i.width for i in out)+10*len(out);H=max(i.height for i in out)
o=Image.new("RGB",(W,H),"gray");x=0
for im in out: o.paste(im,(x,0)); x+=im.width+10
o.resize((int(W*z),int(H*z))).save(sys.argv[1])
