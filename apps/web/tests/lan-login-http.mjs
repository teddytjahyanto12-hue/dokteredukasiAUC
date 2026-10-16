import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import http from 'node:http';
process.loadEnvFile();
const base=process.env.LAN_TEST_URL || 'http://localhost:3009';
assert.match(base,/^http:\/\/(localhost|127\.0\.0\.1|192\.168\.88\.\d+):\d+$/);
const db=new PrismaClient();let userId;
try {
 const password=randomBytes(24).toString('hex');
 const user=await db.user.create({data:{email:`lan-check-${Date.now()}@dokteredukasi.test`,name:'Uji login LAN',role:'STUDENT',passwordHash:await bcrypt.hash(password,10)}});userId=user.id;
 const html=await(await fetch(base+'/masuk')).text();
 const action=html.match(/name="(\$ACTION_ID_[^"]+)"/)?.[1];assert(action);
 const form=new FormData();form.set(action,'');form.set('email',user.email);form.set('password',password);
 const res=await fetch(base+'/masuk',{method:'POST',headers:{Origin:base},body:form,redirect:'manual'});
 assert.equal(res.status,303);const cookie=res.headers.get('set-cookie');assert(cookie?.includes('de_session='));assert(!/;\s*Secure/i.test(cookie));assert(/HttpOnly/i.test(cookie));assert(/SameSite=lax/i.test(cookie));
 const page=await fetch(base+'/akun',{headers:{Cookie:cookie.split(';')[0]},redirect:'manual'});assert.equal(page.status,200);
 const publicForm=new FormData();publicForm.set(action,'');publicForm.set('email',user.email);publicForm.set('password',password);
 const encoded=new Request(base+'/masuk',{method:'POST',body:publicForm});const body=Buffer.from(await encoded.arrayBuffer());
 const publicRes=await new Promise((resolve,reject)=>{const req=http.request(base+'/masuk',{method:'POST',headers:{Host:'website.example',Origin:'http://website.example','Content-Type':encoded.headers.get('content-type'),'Content-Length':body.length}},res=>{res.resume();res.on('end',()=>resolve({status:res.statusCode,cookies:res.headers['set-cookie']?.join(';') || ''}));});req.on('error',reject);req.end(body);});
 assert.equal(publicRes.status,303);assert(/;\s*Secure/i.test(publicRes.cookies),'Host publik tetap wajib cookie Secure');
 console.log('PASS: login LAN, cookie HttpOnly/SameSite, akun HTTP200, Host publik tetap Secure.');
}finally{if(userId)await db.user.delete({where:{id:userId}});await db.$disconnect();}
