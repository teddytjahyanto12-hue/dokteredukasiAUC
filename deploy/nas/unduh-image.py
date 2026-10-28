# Unduh image publik website dari ghcr.io dan simpan sebagai arsip format `docker save`.
# Dipakai karena Container Manager tidak bisa menarik image ghcr.io lewat "Add From URL".
# Cara: python deploy/nas/unduh-image.py "_server/images/dokteredukasi-web-<commit>.tar"
# lalu Container Manager > Image > Action > Import > Add From File > From this DSM,
# kemudian Project dokter-edukasi > Stop > Action > Build.
import hashlib, json, sys, tarfile, io, urllib.request

REPO = "teddytjahyanto12-hue/dokteredukasi-web"
TAG = "latest"
OUT = sys.argv[1]

def get(url, token, accept=None):
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    if accept:
        req.add_header("Accept", accept)
    return urllib.request.urlopen(req, timeout=120)

token = json.load(urllib.request.urlopen(f"https://ghcr.io/token?scope=repository:{REPO}:pull"))["token"]
ACC = ",".join([
    "application/vnd.oci.image.index.v1+json",
    "application/vnd.docker.distribution.manifest.list.v2+json",
    "application/vnd.oci.image.manifest.v1+json",
    "application/vnd.docker.distribution.manifest.v2+json",
])
m = json.load(get(f"https://ghcr.io/v2/{REPO}/manifests/{TAG}", token, ACC))
if "manifests" in m:
    pick = next(x for x in m["manifests"] if x.get("platform", {}).get("os") == "linux" and x["platform"].get("architecture") == "amd64")
    m = json.load(get(f"https://ghcr.io/v2/{REPO}/manifests/{pick['digest']}", token, ACC))

cfg_digest = m["config"]["digest"]
cfg = get(f"https://ghcr.io/v2/{REPO}/blobs/{cfg_digest}", token).read()
assert "sha256:" + hashlib.sha256(cfg).hexdigest() == cfg_digest
print("config", cfg_digest, "created", json.loads(cfg).get("created"), flush=True)

with tarfile.open(OUT, "w") as tar:
    def add_bytes(name, data):
        ti = tarfile.TarInfo(name); ti.size = len(data); tar.addfile(ti, io.BytesIO(data))
    cfg_name = cfg_digest.split(":")[1] + ".json"
    add_bytes(cfg_name, cfg)
    layers = []
    for i, layer in enumerate(m["layers"]):
        d = layer["digest"]; name = d.split(":")[1] + "/layer.tar"
        r = get(f"https://ghcr.io/v2/{REPO}/blobs/{d}", token)
        h = hashlib.sha256(); buf = io.BytesIO()
        while chunk := r.read(1 << 20):
            h.update(chunk); buf.write(chunk)
        assert "sha256:" + h.hexdigest() == d, f"hash layer {i} tidak cocok"
        add_bytes(name, buf.getvalue())
        layers.append(name)
        print(f"layer {i + 1}/{len(m['layers'])} {layer['size'] / 1e6:.1f} MB ok", flush=True)
    add_bytes("manifest.json", json.dumps([{"Config": cfg_name, "RepoTags": [f"ghcr.io/{REPO}:{TAG}"], "Layers": layers}]).encode())
print("selesai", OUT)
