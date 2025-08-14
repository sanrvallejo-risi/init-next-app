import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Hola mundo con Next.js</h1>
      <p>Esta es mi primera página usando React + Next.js</p>
      
      <nav>
        <Link href="/about">Ir a About</Link> |{" "}
        <Link href="/users">Ver Usuarios</Link> |{" "}
        <Link href="/add-user">Agregar usuario</Link>
      </nav>
    </main>
  )
}
