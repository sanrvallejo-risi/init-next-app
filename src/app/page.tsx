import Link from "next/link";

export default function HomePage() {
  const appName = process.env.NEXT_PUBLIC_SECRET_WORD;
  return (
    <main>
      <h1>Hola mundo {appName}</h1>
      <p>Esta es mi primera página usando React + Next.js</p>
      
      <nav>
        <Link href="/about">Ir a About</Link> |{" "}
        <Link href="/users">Ver Usuarios</Link> |{" "}
        <Link href="/add-user">Agregar usuario</Link>
      </nav>
      <h1>Adios mundo {appName}</h1>
    </main>
  )
}
