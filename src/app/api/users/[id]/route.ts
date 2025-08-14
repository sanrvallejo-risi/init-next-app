import prisma from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await prisma.user.findUnique({
        where: { id: Number(id) }
    });

    if (!user) {
        return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
            status: 404
        });
    }

    return Response.json(user);
}