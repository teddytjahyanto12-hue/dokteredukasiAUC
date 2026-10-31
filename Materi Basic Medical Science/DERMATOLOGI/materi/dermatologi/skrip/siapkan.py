from pathlib import Path
import json
import re
import textwrap
import xml.etree.ElementTree as ET
import requests
import pymupdf
from PIL import Image, ImageDraw, ImageFont

B = Path(__file__).resolve().parents[1]
SUMBER = B.parents[1] / 'MATERI MENTAH'

def pustaka():
    # Metadata berasal dari rekaman PubMed, bukan nama/DOI yang direka.
    r = requests.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi',
        params={'db':'pubmed','id':'24669361,29332945,32034956,38300170,36641009,24947530,38528155,36826119','retmode':'xml'}, timeout=60)
    r.raise_for_status()
    (B/'ingatan/ekstraksi/pubmed_final.xml').write_text(r.text,encoding='utf-8')
    ids={'24669361':'barrier','29332945':'microbiome','32034956':'scabies','38300170':'acne',
         '36641009':'ad','24947530':'ssti','38528155':'wound','36826119':'ganglion'}
    out=['TY  - BOOK\nID  - fitz\nTI  - Fitzpatrick’s Dermatology in General Medicine\nAU  - Goldsmith, Lowell A\nAU  - Katz, Stephen I\nAU  - Gilchrest, Barbara A\nAU  - Paller, Amy S\nAU  - Leffell, David J\nAU  - Wolff, Klaus\nET  - 8th ed\nPY  - 2012\nPB  - McGraw-Hill\nSN  - 9780071717557\nN1  - Editors. DOI dan PMID tidak ditetapkan untuk buku ini\nER  -\n']
    for a in ET.fromstring(r.text).findall('.//PubmedArticle'):
        pm=a.findtext('.//PMID'); key=ids[pm]; art=a.find('.//Article')
        title=''.join(art.find('ArticleTitle').itertext()).rstrip('.')
        year=art.findtext('.//PubDate/Year') or a.findtext('.//History/PubMedPubDate/Year')
        vals=[('TY','JOUR'),('ID',key),('TI',title)]
        for au in art.findall('./AuthorList/Author'):
            if au.findtext('LastName'): vals.append(('AU',au.findtext('LastName')+', '+(au.findtext('Initials') or '')))
            elif au.findtext('CollectiveName'): vals.append(('AU',au.findtext('CollectiveName')))
        vals += [('JO',art.findtext('.//ISOAbbreviation') or art.findtext('.//Journal/Title')),
                 ('PY',year),('VL',art.findtext('.//JournalIssue/Volume') or ''),
                 ('IS',art.findtext('.//JournalIssue/Issue') or ''),
                 ('SP',art.findtext('.//MedlinePgn') or art.findtext('.//StartPage') or ''),
                 ('AN','PMID: '+pm),('UR','https://pubmed.ncbi.nlm.nih.gov/'+pm+'/')]
        doi=next((x.text for x in a.findall('.//ArticleId') if x.get('IdType')=='doi'),None)
        assert doi,pm
        vals += [('DO',doi)]
        out.append('\n'.join(f'{t}  - {v}' for t,v in vals if v)+'\nER  -\n')
    assert len(out)==9
    (B/'ingatan/sumber.ris').write_text('\n'.join(out),encoding='utf-8')

def diagram(path, title, nodes):
    font=ImageFont.truetype('C:/Windows/Fonts/times.ttf',50)
    bold=ImageFont.truetype('C:/Windows/Fonts/timesbd.ttf',54)
    lines=[textwrap.wrap(n,44) for n in nodes]
    hs=[max(140,70+len(x)*55) for x in lines]
    w=1600;h=125+sum(hs)+65*(len(nodes)-1)+35
    im=Image.new('RGB',(w,h),'white');d=ImageDraw.Draw(im)
    d.text((800,45),title,anchor='mm',font=bold,fill='#17364A')
    y=105
    for i,(ls,hh) in enumerate(zip(lines,hs)):
        d.rounded_rectangle((90,y,w-90,y+hh),radius=18,fill=('#E9F0F4' if i%2==0 else '#FFF7D4'),outline='#17364A',width=3)
        for j,t in enumerate(ls):d.text((800,y+hh/2+(j-(len(ls)-1)/2)*55),t,anchor='mm',font=font,fill='#152B3B')
        y+=hh
        if i<len(nodes)-1:
            d.line((800,y+12,800,y+48),fill='#17364A',width=5)
            d.polygon([(787,y+37),(813,y+37),(800,y+55)],fill='#17364A');y+=65
    im.save(path)

def main():
    if any((B/"naskah").glob("*.md")):
        raise SystemExit("Naskah sudah ada. Gunakan build.py untuk merakit versi yang telah diperiksa.")
    pustaka()
    chunks=[]
    for p in sorted((B/'skrip').glob('materi_*.md')):
        chunks.extend(p.read_text(encoding='utf-8').split('{{bab}}'))
    assert len(chunks)==32
    d=pymupdf.open(SUMBER/'Fitzpatrick dermatology in general medicine 8th edition.pdf')
    folder=B/'gambar/buku';folder.mkdir(exist_ok=True)
    # Rect hanya mencakup gambar; keterangan dan judul asli di luar rect.
    crops={
      2:(95,(38.3,441.7,253.6,626.5),'Penampang kulit memperlihatkan epidermis di permukaan serta jaringan penunjang di bawahnya.'),
      3:(96,(89.4,377,304.4,668.1),'Perbandingan epidermis kulit akral dan nonakral. Ketebalan stratum korneum berbeda menurut lokasi.'),
      5:(1000,(85,301,542,667),'Siklus folikel meliputi anagen, katagen dan telogen. Pelepasan batang rambut ditunjukkan sebagai eksogen.'),
      6:(524,(137.3,377.2,490.5,685.4),'Mikroskopi elektron memperlihatkan hubungan badan lamelar dengan susunan lipid pada pertemuan lapisan granular dan korneum.'),
      9:(3022,(89,13,539,322),'Fase penyembuhan luka saling tumpang tindih dengan perubahan populasi sel yang dominan.'),
      11:(81,(37.5,477.5,487,699),'Spongiosis memperlihatkan pelebaran ruang antarkeratinosit dan dapat membentuk vesikel.'),
      13:(247,(37.6,44.9,252.6,488.7),'Lesi psoriasis dapat muncul pada lokasi trauma. Pola ini dikenal sebagai fenomena Koebner.'),
      15:(626,(90,267.4,505.9,480.2),'Skema distribusi desmoglein membantu menjelaskan perbedaan kerentanan kulit dan mukosa pada pemfigus vulgaris.')
    }
    records=[];order=[]
    for n,raw in enumerate(chunks,1):
        raw=raw.strip()+'\n';title=raw.splitlines()[0].split('. ',1)[1]
        assert int(re.search(r'BAB (\d+)',raw).group(1))==n
        if n in crops:
            page,rect,caption=crops[n];name=f'kulit_{n:02}.png'
            d[page-1].get_pixmap(matrix=pymupdf.Matrix(3,3),clip=pymupdf.Rect(rect)).save(str(folder/name))
            fig=f'![Gambar #. {caption}[@fitz]](gambar/buku/{name}){{width=13cm}}'
            provenance={'jenis':'potongan gambar buku','pdf':page,'rect':rect,'berkas':'gambar/buku/'+name}
        else:
            section=raw.split('### Hubungan sebab-akibat')[1].split('### Korelasi klinis')[0]
            chain=re.search(r'^- (.*?)(?:\[|\n)',section,re.M).group(1).rstrip('. ')
            nodes=[x.strip() for x in chain.split('→')]
            if len(nodes)<2:nodes=['Perubahan struktur atau fungsi kulit',title]
            name=f'diagram_{n:02}.png';diagram(B/'gambar'/name,'Hubungan struktur dan mekanisme',nodes)
            refs='[@fitz]'
            fig=f'![Gambar #. {chain}. Ilustrasi Dokter Edukasi Academy.{refs}](gambar/{name}){{width=13cm}}'
            provenance={'jenis':'ilustrasi orisinal berbasis rantai tersitasi','berkas':'gambar/'+name}
        raw=raw.replace('{{gambar}}',fig)
        def cite(m):
            keys=[k.strip().lstrip('@') for k in m.group(1).split(';')]
            for k in keys:
                if k not in order:order.append(k)
            return '^'+','.join(str(order.index(k)+1) for k in keys)+'^'
        # Naskah tersimpan memakai superskrip Vancouver global.
        raw=re.sub(r'\[(@[^\]]+)\]',cite,raw)
        # Nama berkas stabil dan pendek untuk interoperabilitas Word.
        stem=f'BAB_{n:02}_'+re.sub(r'[^\w]+','_',title).strip('_')
        target=B/'naskah'/(stem+'.md')
        assert not target.exists(),'Jangan timpa naskah yang telah diedit: '+str(target)
        target.write_text(raw,encoding='utf-8')
        records.append({'bab':n,'judul':title,'nama':stem,'gambar':provenance})
    assert set(order)=={'fitz','barrier','microbiome','ad','wound','scabies','acne','ssti','ganglion'},order
    (B/'ingatan/nomor_sitasi.json').write_text(json.dumps(order,ensure_ascii=False,indent=2),encoding='utf-8')
    (B/'ingatan/manifest.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
    print('32 naskah,',len(order),'pustaka,',len(crops),'gambar buku dan',32-len(crops),'diagram')

if __name__=='__main__':main()
