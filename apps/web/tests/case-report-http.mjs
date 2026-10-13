import assert from 'node:assert/strict';
import {PrismaClient} from '@prisma/client';
import {SignJWT} from 'jose';
process.loadEnvFile();
const db=new PrismaClient();let uid;
const base=process.env.TEST_BASE||'http://localhost:3001';
try{
const user=await db.user.create({data:{email:`case-check-${Date.now()}@dokteredukasi.test`,name:'Uji Case Report',passwordHash:'!test-only!',role:'STUDENT'}});uid=user.id;
const token=await new SignJWT({sub:uid}).setProtectedHeader({alg:'HS256'}).setExpirationTime('10m').sign(new TextEncoder().encode(process.env.AUTH_SECRET));
const get=async p=>{const r=await fetch(base+p,{headers:{Cookie:`de_session=${token}`}});return {status:r.status,text:await r.text(),type:r.headers.get('content-type')}};
const topics=await db.topic.findMany({where:{id:{startsWith:'dea-case-report-group-'}},orderBy:{order:'asc'},include:{items:true,quiz:{include:{questions:{include:{options:true}}}}}});
assert.equal(topics.length,6);assert.equal(topics.flatMap(t=>t.items).filter(i=>i.type==='PDF').length,18);
for(const [i,t]of topics.entries()){assert.equal(t.quiz.passingScore,80);assert.equal(t.quiz.isFree,i===0);assert.equal(t.quiz.questions.length,10);for(const q of t.quiz.questions){assert.equal(q.options.length,5);assert.equal(q.options.filter(o=>o.isCorrect).length,1)}}
for(const item of topics[0].items){const r=await get(`/api/materi-pdf/${item.fileId}/1`);assert.equal(r.status,200);assert.equal(r.type,'image/png');assert.equal((await get(`/api/berkas/${item.fileId}`)).status,403)}
assert.ok((await get('/quiz/'+topics[0].id)).text.replace(/<!--.*?-->/g,'').includes('nilai lulus 80'));
const second=topics[1].items[0];assert.equal((await get(`/api/materi-pdf/${second.fileId}/1`)).status,403);
for(const score of [70,79,80]){
await db.quizAttempt.create({data:{userId:uid,quizId:topics[0].quiz.id,score,correct:Math.floor(score/10),total:10}});
const html=(await get('/quiz/'+topics[1].id)).text;
assert.ok(html.replace(/<!--.*?-->/g,'').includes(score<80?'Kelompok ini belum terbuka':'Quiz ini termasuk paket berbayar'));
assert.equal((await get(`/api/materi-pdf/${second.fileId}/1`)).status,403);
}
const category=await db.category.findUniqueOrThrow({where:{id:topics[0].categoryId}});
const pkg=await db.package.findFirstOrThrow({where:{categories:{some:{categoryId:{in:[topics[0].categoryId,category.parentId]}}}}});
await db.entitlement.create({data:{userId:uid,packageId:pkg.id}});
assert.equal((await get(`/api/materi-pdf/${second.fileId}/1`)).status,200);
for(const t of topics.slice(1)){await db.quizAttempt.create({data:{userId:uid,quizId:t.quiz.id,score:80,correct:8,total:10}})}
for(const item of topics.flatMap(t=>t.items).filter(i=>i.type==='PDF')){assert.equal((await get(`/api/materi-pdf/${item.fileId}/1`)).status,200);assert.equal((await get(`/api/berkas/${item.fileId}`)).status,403)}
assert.ok((await get('/quiz/'+topics[5].id)).text.replace(/<!--.*?-->/g,'').includes('nilai lulus 80'));
console.log('PASS: 18 PDF, 6 quizzes, free group1, 70/79 blocked, 80 requires package, paid sequential access, original PDFs403');
}finally{if(uid){await db.lessonView.deleteMany({where:{userId:uid}});await db.quizAttempt.deleteMany({where:{userId:uid}});await db.entitlement.deleteMany({where:{userId:uid}});await db.user.delete({where:{id:uid}})}await db.$disconnect()}
