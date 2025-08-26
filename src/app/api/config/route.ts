// src/app/api/config/route.ts
export async function GET() {
  return new Response(JSON.stringify({
    secretWord: process.env.NEXT_PUBLIC_SECRET_WORD
  }), { status: 200 });
}
