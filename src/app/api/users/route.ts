import prisma from "@/lib/prisma";

//Metodo GET
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

//Metodo crear 
export async function POST(req: Request) {
  const body = await req.json();

  const newUser = await prisma.user.create({
    data:{
      name: body.name,
      email: body.email
    }
  })

  return Response.json(newUser);
}

//actualizar
export async function PUT(req: Request) {
  const data = await req.json();

  await prisma.user.update({
    where: { id: data.id },
    data: {
      name: data.name,
      email: data.email
    }
  })

  return Response.json({message: 'Usuario actualizado'})
}

//eliminar
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.user.delete({
    where: { id }
  })

  return Response.json({ message: 'Usuario eliminado'});
}