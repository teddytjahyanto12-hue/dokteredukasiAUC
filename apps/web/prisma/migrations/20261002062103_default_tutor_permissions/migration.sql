-- Tutor yang sudah ada mendapat akses bawaan: Dashboard klien, Payroll, Pencapaian.
UPDATE "User" SET "permissions" = '["tutor.clients","tutor.payroll","tutor.achievements"]'
  WHERE "role" = 'TUTOR' AND "permissions" = '[]';
