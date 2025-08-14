import Link from "next/link";

export default async function UserPage({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const res = await fetch(`http://localhost:3000/api/users/${id}`);

    if (!res.ok) {
        return (
            <h2>Resource not found: 404</h2>
        )
    }

    const user = await res.json();

    return (
        <main>
            <h1>Detalles del usuario</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <Link href="/users">Regresar</Link>
        </main>
    )
}