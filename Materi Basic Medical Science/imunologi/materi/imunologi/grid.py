import pymupdf,sys
from PIL import Image, ImageDraw
import os
d=pymupdf.open("../../materi mentah/"+os.environ.get("PDF","sherwood pertahanan tubuh.pdf"))
y1=int(sys.argv[2]); pages=[int(x) for x in sys.argv[3:]]
out=[]
for p in pages:
    pix=d[p-1].get_pixmap(matrix=pymupdf.Matrix(1,1)); im=Image.frombytes("RGB",[pix.width,pix.height],pix.samples)
    dr=ImageDraw.Draw(im)
    for v in range(0,800,50):
        dr.line([(v,0),(v,800)],fill="red"); dr.line([(0,v),(700,v)],fill="blue")
        dr.text((v+2,2),str(v),fill="red"); dr.text((2,v+2),str(v),fill="blue")
    dr.text((600,y1-15),"p%d"%p,fill="green")
    out.append(im.crop((0,0,im.width,y1)))
o=Image.new("RGB",(out[0].width*len(out),y1),"white")
for i,im in enumerate(out): o.paste(im,(i*im.width,0))
o=o.resize((int(o.width*float(os.environ.get("Z","0.75"))),int(o.height*float(os.environ.get("Z","0.75")))));o.save(sys.argv[1])
