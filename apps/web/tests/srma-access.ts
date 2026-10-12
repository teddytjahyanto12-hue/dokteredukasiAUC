import assert from 'node:assert/strict';
import { PrismaClient } from '@prisma/client';
const db=new PrismaClient();
async function main(){for(const slug of ['paket-srma-basic','paket-srma-intermediate','paket-srma-pro']){const p=await db.package.findUnique({where:{slug},select:{slug:true,categories:{select:{category:{select:{slug:true}}}}}});assert.ok(p);const access=p.categories.some(c=>c.category.slug==='review-toolkit-srma');assert.equal(access,slug!=='paket-srma-basic');console.log(slug,access?'Toolkit terbuka':'Toolkit tidak termasuk');} console.log('Modul baru:',await db.topic.count({where:{id:{startsWith:'dea-srma-module-'}}}),'Materi awal:',await db.item.count({where:{id:{startsWith:'dea-srma-lesson-'}}}));}
main().finally(()=>db.$disconnect());
