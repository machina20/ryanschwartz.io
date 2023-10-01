'use server';

import { prisma_client } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function increment(slug: string) {

  const data = await prisma_client.blog_post.findUnique({
    where: {
      slug,
    }
  })

  const views = !data?.views ? 0 : data.views;

  await prisma_client.blog_post.update({
    where: {
      slug: slug,
    },
    data :{
      views: views + 1
    }
  })
 
  return
}

// export async function saveGuestbookEntry(formData: FormData) {
//   const session = await getSession();
//   const email = session.user?.email as string;
//   const created_by = session.user?.name as string;
//   const entry = formData.get('entry')?.toString() || '';
//   const body = entry.slice(0, 500);

//   await queryBuilder
//     .insertInto('guestbook')
//     .values({ email, body, created_by })
//     .execute();

//   revalidatePath('/guestbook');

//   const data = await fetch('https://api.resend.com/emails', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${process.env.RESEND_SECRET}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       from: 'guestbook@leerob.io',
//       to: 'me@leerob.io',
//       subject: 'New Guestbook Entry',
//       html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
//     }),
//   });

//   const response = await data.json();
//   console.log('Email sent', response);
// }