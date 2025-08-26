"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [appName, setAppName] = useState("")

  useEffect(() => {
    fetch("/api/config")
      .then(res => res.json())
      .then(data => setAppName(data.secretWord))
  }, [])

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
